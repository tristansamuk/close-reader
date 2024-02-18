import express, { Request, Response, NextFunction } from "express";
import OpenAI from "openai";
const router = express.Router();
import db from "../db";

const openai = new OpenAI();

// Types

interface analysisData {
  id: number;
  analysis: string | undefined;
  short_title: string;
  title_id: number;
  title: string;
}

interface poetTitleData {
  first_name: string;
  last_name: string;
  title: string;
  id: number;
}

// Middleware

const checkForAnalysis = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Query the database and send back analysis
  try {
    const poemTitle = req.params.poemTitle;
    const data: analysisData[] = await db("analyses")
      .join("titles", "titles.id", "analyses.title_id")
      .select("analyses.id", "analyses.analysis", "titles.short_title")
      .where("titles.short_title", poemTitle);

    // If no analysis in database, request new analysis from GPT

    if (!data[0]) {
      // Query the database and use params stored in `poemTitle` to get poet name, title of poem, and title id.

      const poetTitle: poetTitleData[] = await db("titles")
        .join("poets", "poets.id", "titles.poet_id")
        .select(
          "poets.first_name",
          "poets.last_name",
          "titles.title",
          "titles.id"
        )
        .where("titles.short_title", poemTitle);
      const poetName = `${poetTitle[0].first_name} ${poetTitle[0].last_name}`;
      const titleOfPoem = poetTitle[0].title;
      const titleId = poetTitle[0].id;

      // Makes POST request to GPT to generate new analysis

      const sendToGPT = async () => {
        const completion = await openai.chat.completions.create({
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content:
                "You are poetry expert. When you receive a poem title, please generate a short interpretive analysis that will help a reader understand what the poem is about, any interesting things to pay attention to, and situate the poem in its historical or biographical context.",
            },
            {
              role: "user",
              content: `${poetName} by ${titleOfPoem}`,
            },
          ],
          temperature: 0.7,
          max_tokens: 100,
        });
        const poemAnalysis = completion.choices[0].message.content;

        // Error handling for GPT post request

        if (!poemAnalysis) {
          res.status(500).send("Error generating new analysis");
        }

        // Posts the resulting analysis to the database

        await db("analyses").insert({
          title_id: `${titleId}`,
          analysis: `${poemAnalysis}`,
        });
        res.status(201).send(poemAnalysis);
      };
      // Calling the function
      sendToGPT();
    } else {
      res.status(200).json(data);
    }
  } catch (error) {
    res.status(500).send("Error getting analysis");
  }
  next();
};

// GET analysis of a poem from database

router.get("/:poemTitle", checkForAnalysis, async () => {
  // Response is handled by middleware after it performs a check of the database
});

export default router;

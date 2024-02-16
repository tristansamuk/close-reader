import express, { Request, Response, NextFunction } from "express";
import OpenAI from "openai";
const router = express.Router();
import db from "../db";

// Types

interface analysisData {
  id: number;
  analysis: string | undefined;
  short_title: string;
  title_id: number;
  title: string;
}

const openai = new OpenAI();
const poet = "John Donne";
const titleId = 10;

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
      console.log("If statement at line 39 ran");
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
              content: `${poemTitle} by ${poet}`,
            },
          ],
          temperature: 0.7,
          max_tokens: 100,
        });
        const poemAnalysis = completion.choices[0].message.content;

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
      console.log("Else statement at line 69 ran");
    }
  } catch (error) {
    res.status(500).send("Error getting analysis");
    console.log(error);
  }
  next();
};

// GET analysis of a poem from database

router.get(
  "/:poemTitle",
  checkForAnalysis,
  async (req: Request, res: Response) => {
    // console.log(req);
  }
);

export default router;

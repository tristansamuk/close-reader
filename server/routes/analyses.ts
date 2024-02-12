import express, { Request, Response } from "express";
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

// GET analysis of a poem from database

router.get("/:poemTitle", async (req: Request, res: Response) => {
  try {
    const poemTitle = req.params.poemTitle;
    const data = await db("analyses")
      .join("titles", "titles.id", "analyses.title_id")
      .select("analyses.id", "analyses.analysis", "titles.short_title")
      .where("titles.short_title", poemTitle);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).send("Error getting analysis");
    console.log(error);
  }
});

export default router;

// POST analysis request to chat gpt

const openai = new OpenAI();

const title = "The Canonization";
const poet = "John Donne";

router.post("/:poemTitle", async (req: Request, res: Response) => {
  // Takes url param and checks database for existing analysis
  try {
    const poemTitle = req.params.poemTitle;
    const data: analysisData[] = await db("analyses")
      .join("titles", "titles.id", "analyses.title_id")
      .select(
        "analyses.id",
        "analyses.title_id",
        "titles.title",
        "analyses.analysis",
        "titles.short_title"
      )
      .where("titles.short_title", poemTitle);
    // If analysis is falsey, makes request to ChatGPT for new analysis

    // Type error here, undefined?

    if (!data[0].analysis) {
      try {
        // Function that makes the post request to ChatGPT and posts result in the database

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
                content: `${title} by ${poet}`,
              },
            ],
            temperature: 0.7,
            max_tokens: 100,
          });
          const poemAnalysis = completion.choices[0].message.content;

          // Posts the resulting analysis to the database

          await db("analyses").insert({
            title_id: `${data[0].title_id}`,
            analysis: `${poemAnalysis}`,
          });
          res.status(201).send(poemAnalysis);
        };

        // Calling the function

        sendToGPT();
      } catch (error) {
        res.status(500).send("Error getting analysis");
        console.log(error);
      }
    }

    // What happens if "analysis" is truthy

    res.json(data);
    console.log(data[0].analysis);
  } catch (error) {
    res.status(500).send("Error checking database for analysis");
    console.log(error);
  }
});

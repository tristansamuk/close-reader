import express, { Request, Response } from "express";
import OpenAI from "openai";
const router = express.Router();
import db from "../db";

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
const titleID = 3;
const poet = "John Donne";

router.post("/", async (_req: Request, res: Response) => {
  try {
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
        max_tokens: 250,
      });
      const poemAnalysis = completion.choices[0].message.content;
      await db("analyses").insert({
        title_id: `${titleID}`,
        analysis: `${poemAnalysis}`,
      });
      res.status(201).send(poemAnalysis);
    };
    sendToGPT();
  } catch (error) {
    res.status(500).send("Error getting analysis");
    console.log(error);
  }
});

// router.post("/", async (req: Request, res: Response) => {
//   try {
//     const newAnalysis = await db("analyses").insert(req.body);
//     res.status(201).json(req.body);
//   } catch (error) {
//     res.status(500).send("Error adding analysis");
//     console.log(error);
//   }
// });

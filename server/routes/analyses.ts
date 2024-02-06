import express, { Request, Response } from "express";
const router = express.Router();
import db from "../db";

// GET analysis of a poem

router.get("/:poemTitle", async (req: Request, res: Response) => {
  try {
    const poemTitle = req.params.poemTitle;
    const data = await db("analyses")
      .join("titles", "titles.id", "analyses.title_id")
      .select("analyses.id", "analyses.analysis")
      .where("titles.short_title", poemTitle);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).send("Error getting analysis");
    console.log(error);
  }
});

export default router;

// POST analysis

router.post("/", async (req: Request, res: Response) => {
  try {
    const newAnalysis = await db("analyses").insert(req.body);
    res.status(201).json(req.body);
  } catch (error) {
    res.status(500).send("Error adding analysis");
    console.log(error);
  }
});

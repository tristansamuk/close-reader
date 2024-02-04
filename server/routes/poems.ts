import express, { Request, Response } from "express";
const router = express.Router();
import db from "../db";

// Titles of all poems

router.get("/all", async (req: Request, res: Response) => {
  try {
    const data = await db("titles");
    res.json(data);
  } catch {
    res.status(500).send("Error getting poems");
  }
});

// All lines of all poems

router.get("/all/lines", async (req: Request, res: Response) => {
  try {
    const data = await db("poems");
    res.json(data);
  } catch {
    res.status(500).send("Error getting poems");
  }
});

// List of poems by a single author

router.get("/:authorName", async (req: Request, res: Response) => {
  try {
    const authorName = req.params.authorName;
    const data = await db("titles")
      .join("authors", "authors.author_id", "titles.author_id")
      .select(
        "titles.title_id",
        "authors.first_name",
        "authors.last_name",
        "titles.title"
      )
      .where("authors.url_param", authorName);
    res.json(data);
  } catch (error) {
    res.status(500).send("Error getting poems");
    console.log(error);
  }
});

// Single Poem
router.get("/titles/:poemTitle", async (req: Request, res: Response) => {
  try {
    const poemTitle = req.params.poemTitle;
    const;

    const data = await db("poems")
      .join("titles", "poems.title_id", "titles.title_id")
      .select("poems.id", "poems.lns")
      .where("titles.short_title", poemTitle);

    res.json(data);
  } catch (error) {
    res.status(500).send("Error getting poems");
    console.log(error);
  }
});

export default router;

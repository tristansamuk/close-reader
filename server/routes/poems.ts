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

// List of poems by a single poet

router.get("/:authorName", async (req: Request, res: Response) => {
  try {
    const authorName = req.params.authorName;
    const data = await db("titles")
      .join("poets", "poets.id", "titles.poet_id")
      .select(
        "titles.id",
        "poets.first_name",
        "poets.last_name",
        "titles.title"
      )
      .where("poets.url_param", authorName);
    res.json(data);
  } catch (error) {
    res.status(500).send("Error getting poems");
    console.log(error);
  }
});

// Single Poem (data use to render lines of poem on SinglePoemPage)

router.get("/titles/:poemTitle", async (req: Request, res: Response) => {
  try {
    const poemTitle = req.params.poemTitle;
    const data = await db("poems")
      .join("titles", "poems.title_id", "titles.id")
      .select("poems.id", "poems.lns")
      .where("titles.short_title", poemTitle);

    res.json(data);
  } catch (error) {
    res.status(500).send("Error getting poems");
    console.log(error);
  }
});

// Poem information (data used for to render author, title, and publication date on poem page)

router.get("/info/:poemTitle", async (req: Request, res: Response) => {
  try {
    const poemTitle = req.params.poemTitle;
    const data = await db("titles")
      .join("poets", "titles.poet_id", "poets.id")
      .select(
        "poets.first_name",
        "poets.last_name",
        "titles.title",
        "titles.pub_year"
      )
      .where("titles.short_title", poemTitle);
    res.json(data);
  } catch (error) {
    res.status(500).send("Error getting poems");
    console.log(error);
  }
});

export default router;

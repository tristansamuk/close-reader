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

// Lines of poems for a single author

router.get("/:lastName", async (req: Request, res: Response) => {
  try {
    const lastName = req.params.lastName;
    const data = await db("poems")
      .join("authors", "authors.id", "poems.author_id")
      .select("poems.id", "authors.id", "poems.lns", "poems.title_id")
      .where("authors.last_name", lastName);
    res.json(data);
  } catch (error) {
    res.status(500).send("Error getting poems");
    console.log(error);
  }
});

export default router;

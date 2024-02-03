import express, { Request, Response } from "express";
const router = express.Router();
import db from "../db";

router.get("/", async (req: Request, res: Response) => {
  try {
    const data = await db.select("*").from("authors");
    res.json(data);
  } catch {
    res.status(500).send("Error getting authors");
  }
});

export default router;

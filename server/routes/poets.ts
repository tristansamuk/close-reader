import express, { Request, Response } from "express";
const router = express.Router();
import db from "../db";

router.get("/", async (_req: Request, res: Response) => {
  try {
    const data = await db("poets").select(
      "poets.id",
      "poets.first_name",
      "poets.last_name",
      "poets.birth_year",
      "poets.death_year",
      "poets.img"
    );
    res.status(200).json(data);
  } catch {
    res.status(500).send("Error getting poets");
  }
});

export default router;

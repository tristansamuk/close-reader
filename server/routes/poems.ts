import express, { Request, Response } from "express";
const router = express.Router();
import poemsData from "../data/poems.json";

router.get("/", (req: Request, res: Response) => {
  res.status(200).json(poemsData);
});

// router.get("/:title"())

export default router;

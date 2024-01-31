import express, { Request, Response } from "express";
const router = express.Router();
import collectionsData from "../data/collections.json";

router.get("/", (req: Request, res: Response) => {
  res.status(200).json(collectionsData);
});

router.get("/:title", (req, res) => {
  res.send("Slammin' Sonnets");
});

export default router;

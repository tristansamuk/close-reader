import express, { Request, Response } from "express";
const router = express.Router();
import authorsData from "../data/authors.json";

router.get("/", (req: Request, res: Response) => {
  res.status(200).json(authorsData);
});

export default router;

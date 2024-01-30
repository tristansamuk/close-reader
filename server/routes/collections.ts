import express from "express";
const router = express.Router();
import collectionsData from "../data/collections.json";

router.get("/", (req, res) => {
  res.status(200).json(collectionsData);
});

router.get("/:title", (req, res) => {
  res.send("Slammin' Sonnets");
});

export default router;

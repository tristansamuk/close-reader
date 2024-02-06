import express, { Request, Response } from "express";
import cors from "cors";
require("dotenv").config();
const app = express();
import OpenAI from "openai";

// Route Imports

// .env variables
const { PORT, CORS_ORIGIN, API_KEY } = process.env;

// Middleware

app.use(cors({ origin: CORS_ORIGIN }));
app.use(express.json());

// Home Route

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

// Routes

import collectionsRouter from "./routes/collections";
import poetsRouter from "./routes/poets";
import poemsRouter from "./routes/poems";

app.use("/collections", collectionsRouter);
app.use("/poets", poetsRouter);
app.use("/poems", poemsRouter);

// OpenAI

app.post("/completions", async (req, res): Promise<void> => {
  // POST Request Object

  const options = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: "What is poetry?" }],
      max_tokens: 250,
    }),
  };

  // Fetch Request

  try {
    const response = await fetch(
      "https://api.openai.com//v1/chat/completions",
      options
    );
    const data = await response.json();
    res.send(data);
  } catch (error) {
    console.error(error);
  }
});

// Port
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

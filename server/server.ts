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
import analysesRouter from "./routes/analyses";

app.use("/collections", collectionsRouter);
app.use("/poets", poetsRouter);
app.use("/poems", poemsRouter);
app.use("/analyses", analysesRouter);

// OpenAI

const openai = new OpenAI();

const main = async () => {
  const completion = await openai.chat.completions.create({
    messages: [{ role: "system", content: "You are a helpful assistant." }],
    model: "gpt-3.5-turbo",
  });

  console.log(completion.choices[0]);
};

main();

// Port
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

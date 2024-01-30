import express, { Request, Response } from "express";
import cors from "cors";
require("dotenv").config();
const app = express();

// Route Imports

// .env variables
const { PORT, CORS_ORIGIN } = process.env;

// Middleware

app.use(cors({ origin: CORS_ORIGIN }));
app.use(express.json());

// Home Route
app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

// Routes

import collectionsRouter from "./routes/collections";
app.use("/collections", collectionsRouter);

// Port
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

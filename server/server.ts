require("dotenv").config();
import express, { Request, Response } from "express";
import cors from "cors";
const app = express();
// const exampleRoutes = require("./routes/example.js");

// .env variables
const { PORT, CORS_ORIGIN } = process.env;

// Middleware

app.use(cors({ origin: CORS_ORIGIN }));
app.use(express.json());

// Routes
// app.use("/example", exampleRoutes);

// Home Route

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

// Port
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

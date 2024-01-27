require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");

// .env variables
const { PORT, CORS_ORIGIN } = process.env;

// Route imports

const examplesRoutes = require("./routes/example.js");

// Middleware

app.use(cors({ origin: CORS_ORIGIN }));
app.use(express.json());

// Requests

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Port
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

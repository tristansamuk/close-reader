const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();

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
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

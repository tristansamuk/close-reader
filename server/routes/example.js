const express = require("express");
const router = express.Router();

// Define a route (http://localhost:8080/example)

router.get("/", (req, res) => {
  res.send("this is example route");
});

module.exports = router;

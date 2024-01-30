"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const cors = require("cors");
// const exampleRoutes = require("./routes/example.js");
// .env variables
const { PORT, CORS_ORIGIN } = process.env;
// Middleware
app.use(cors({ origin: CORS_ORIGIN }));
app.use(express_1.default.json());
// Routes
// app.use("/example", exampleRoutes);
// Home Route
app.get("/", (req, res) => {
    res.send("Hello World!");
});
// Port
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

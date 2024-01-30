"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
// const exampleRoutes = require("./routes/example.js");
// .env variables
const { PORT, CORS_ORIGIN } = process.env;
// Middleware
app.use((0, cors_1.default)({ origin: CORS_ORIGIN }));
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

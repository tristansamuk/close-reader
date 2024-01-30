"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
require("dotenv").config();
const app = (0, express_1.default)();
// Route Imports
// .env variables
const { PORT, CORS_ORIGIN } = process.env;
// Middleware
app.use((0, cors_1.default)({ origin: CORS_ORIGIN }));
app.use(express_1.default.json());
// Home Route
app.get("/", (req, res) => {
    res.send("Hello World!");
});
// Routes
const collections_1 = __importDefault(require("./routes/collections"));
app.use("/collections", collections_1.default);
// Port
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

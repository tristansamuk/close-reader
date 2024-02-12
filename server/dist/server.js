"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
require("dotenv").config();
const app = (0, express_1.default)();
const openai_1 = __importDefault(require("openai"));
// Route Imports
// .env variables
const { PORT, CORS_ORIGIN, API_KEY } = process.env;
// Middleware
app.use((0, cors_1.default)({ origin: CORS_ORIGIN }));
app.use(express_1.default.json());
// Home Route
app.get("/", (req, res) => {
    res.send("Hello World!");
});
// Routes
const collections_1 = __importDefault(require("./routes/collections"));
const poets_1 = __importDefault(require("./routes/poets"));
const poems_1 = __importDefault(require("./routes/poems"));
const analyses_1 = __importDefault(require("./routes/analyses"));
app.use("/collections", collections_1.default);
app.use("/poets", poets_1.default);
app.use("/poems", poems_1.default);
app.use("/analyses", analyses_1.default);
// OpenAI
const openai = new openai_1.default();
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    const completion = yield openai.chat.completions.create({
        messages: [{ role: "system", content: "You are a helpful assistant." }],
        model: "gpt-3.5-turbo",
    });
    console.log(completion.choices[0]);
});
main();
// Port
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

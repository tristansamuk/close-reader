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
const openai_1 = __importDefault(require("openai"));
const router = express_1.default.Router();
const db_1 = __importDefault(require("../db"));
// GET analysis of a poem from database
router.get("/:poemTitle", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const poemTitle = req.params.poemTitle;
        const data = yield (0, db_1.default)("analyses")
            .join("titles", "titles.id", "analyses.title_id")
            .select("analyses.id", "analyses.analysis", "titles.short_title")
            .where("titles.short_title", poemTitle);
        res.status(200).json(data);
    }
    catch (error) {
        res.status(500).send("Error getting analysis");
        console.log(error);
    }
}));
exports.default = router;
// POST analysis request to chat gpt
const openai = new openai_1.default();
const title = "The Canonization";
const poet = "John Donne";
router.post("/:poemTitle", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Takes url param and checks database for existing analysis
    try {
        const poemTitle = req.params.poemTitle;
        const data = yield (0, db_1.default)("analyses")
            .join("titles", "titles.id", "analyses.title_id")
            .select("analyses.id", "analyses.title_id", "titles.title", "analyses.analysis", "titles.short_title")
            .where("titles.short_title", poemTitle);
        // If analysis is falsey, makes request to ChatGPT for new analysis
        // Type error here, undefined?
        if (!data[0].analysis) {
            try {
                // Function that makes the post request to ChatGPT and posts result in the database
                const sendToGPT = () => __awaiter(void 0, void 0, void 0, function* () {
                    const completion = yield openai.chat.completions.create({
                        model: "gpt-3.5-turbo",
                        messages: [
                            {
                                role: "system",
                                content: "You are poetry expert. When you receive a poem title, please generate a short interpretive analysis that will help a reader understand what the poem is about, any interesting things to pay attention to, and situate the poem in its historical or biographical context.",
                            },
                            {
                                role: "user",
                                content: `${title} by ${poet}`,
                            },
                        ],
                        temperature: 0.7,
                        max_tokens: 100,
                    });
                    const poemAnalysis = completion.choices[0].message.content;
                    // Posts the resulting analysis to the database
                    yield (0, db_1.default)("analyses").insert({
                        title_id: `${data[0].title_id}`,
                        analysis: `${poemAnalysis}`,
                    });
                    res.status(201).send(poemAnalysis);
                });
                // Calling the function
                sendToGPT();
            }
            catch (error) {
                res.status(500).send("Error getting analysis");
                console.log(error);
            }
        }
        // What happens if "analysis" is truthy
        res.json(data);
        console.log(data[0].analysis);
    }
    catch (error) {
        res.status(500).send("Error checking database for analysis");
        console.log(error);
    }
}));

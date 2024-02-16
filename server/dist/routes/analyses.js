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
const openai = new openai_1.default();
// const poet = "John Donne";
// const titleId = 10;
// Middleware
const checkForAnalysis = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // Query the database and send back analysis
    try {
        const poemTitle = req.params.poemTitle;
        const data = yield (0, db_1.default)("analyses")
            .join("titles", "titles.id", "analyses.title_id")
            .select("analyses.id", "analyses.analysis", "titles.short_title")
            .where("titles.short_title", poemTitle);
        // If no analysis in database, request new analysis from GPT
        if (!data[0]) {
            const poetTitle = yield (0, db_1.default)("titles")
                .join("poets", "poets.id", "titles.poet_id")
                .select("poets.first_name", "poets.last_name", "titles.title", "titles.id")
                .where("titles.short_title", poemTitle);
            const poetName = `${poetTitle[0].first_name} ${poetTitle[0].last_name}`;
            const titleOfPoem = poetTitle[0].title;
            const titleId = poetTitle[0].id;
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
                            content: `${poetName} by ${titleOfPoem}`,
                        },
                    ],
                    temperature: 0.7,
                    max_tokens: 100,
                });
                const poemAnalysis = completion.choices[0].message.content;
                // Error handling for GPT post request
                if (!poemAnalysis) {
                    res.status(500).send("Error generating new analysis");
                }
                // Posts the resulting analysis to the database
                yield (0, db_1.default)("analyses").insert({
                    title_id: `${titleId}`,
                    analysis: `${poemAnalysis}`,
                });
                res.status(201).send(poemAnalysis);
            });
            // Calling the function
            sendToGPT();
        }
        else {
            res.status(200).json(data);
        }
    }
    catch (error) {
        res.status(500).send("Error getting analysis");
    }
    next();
});
// GET analysis of a poem from database
router.get("/:poemTitle", checkForAnalysis, () => __awaiter(void 0, void 0, void 0, function* () {
    // Response is handled by middleware after it performs a check of the database
}));
exports.default = router;

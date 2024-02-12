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
router.post("/", (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
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
                max_tokens: 250,
            });
            const poemAnalysis = completion.choices[0].message.content;
            res.status(200).send(poemAnalysis);
        });
        sendToGPT();
    }
    catch (error) {
        res.status(500).send("Error getting analysis");
        console.log(error);
    }
}));
// router.post("/", async (req: Request, res: Response) => {
//   try {
//     const newAnalysis = await db("analyses").insert(req.body);
//     res.status(201).json(req.body);
//   } catch (error) {
//     res.status(500).send("Error adding analysis");
//     console.log(error);
//   }
// });

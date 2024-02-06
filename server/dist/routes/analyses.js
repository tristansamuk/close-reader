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
const router = express_1.default.Router();
const db_1 = __importDefault(require("../db"));
// GET analysis of a poem
router.get("/:poemTitle", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const poemTitle = req.params.poemTitle;
        const data = yield (0, db_1.default)("analyses")
            .join("titles", "titles.id", "analyses.title_id")
            .select("analyses.id", "analyses.analysis")
            .where("titles.short_title", poemTitle);
        res.status(200).json(data);
    }
    catch (error) {
        res.status(500).send("Error getting analysis");
        console.log(error);
    }
}));
exports.default = router;
// POST analysis
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newAnalysis = yield (0, db_1.default)("analyses").insert(req.body);
        res.status(201).json(req.body);
    }
    catch (error) {
        res.status(500).send("Error adding analysis");
        console.log(error);
    }
}));

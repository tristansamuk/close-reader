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
// Titles of all poems
router.get("/all", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield (0, db_1.default)("titles");
        res.json(data);
    }
    catch (_a) {
        res.status(500).send("Error getting poems");
    }
}));
// All lines of all poems
router.get("/all/lines", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield (0, db_1.default)("poems");
        res.json(data);
    }
    catch (_b) {
        res.status(500).send("Error getting poems");
    }
}));
// List of poems by a single author
router.get("/:authorName", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authorName = req.params.authorName;
        const data = yield (0, db_1.default)("titles")
            .join("authors", "authors.author_id", "titles.author_id")
            .select("titles.title_id", "authors.first_name", "authors.last_name", "titles.title")
            .where("authors.url_param", authorName);
        res.json(data);
    }
    catch (error) {
        res.status(500).send("Error getting poems");
        console.log(error);
    }
}));
// Single Poem
router.get("/titles/:poemTitle", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const poemTitle = req.params.poemTitle;
        const data = yield (0, db_1.default)("poems")
            .join("titles", "poems.title_id", "titles.title_id")
            .select("poems.id", "poems.lns")
            .where("titles.short_title", poemTitle);
        res.json(data);
    }
    catch (error) {
        res.status(500).send("Error getting poems");
        console.log(error);
    }
}));
exports.default = router;

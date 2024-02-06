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
// GET titles of all poems
router.get("/all", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield (0, db_1.default)("titles")
            .join("poets", "poets.id", "titles.poet_id")
            .select("titles.id", "titles.title", "titles.short_title", "poets.first_name", "poets.last_name", "titles.pub_year")
            .orderBy("titles.title");
        res.json(data);
    }
    catch (error) {
        res.status(500).send("Error getting poems");
        console.log(error);
    }
}));
// GET all lines of all poems
router.get("/all/lines", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield (0, db_1.default)("poems");
        res.status(200).json(data);
    }
    catch (_a) {
        res.status(500).send("Error getting poems");
    }
}));
// GET list of poems by a single poet
router.get("/:authorName", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authorName = req.params.authorName;
        const data = yield (0, db_1.default)("titles")
            .join("poets", "poets.id", "titles.poet_id")
            .select("titles.id", "poets.first_name", "poets.last_name", "titles.title")
            .where("poets.url_param", authorName);
        res.status(200).json(data);
    }
    catch (error) {
        res.status(500).send("Error getting poems");
        console.log(error);
    }
}));
// GET single Poem (data use to render lines of poem on SinglePoemPage)
router.get("/titles/:poemTitle", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const poemTitle = req.params.poemTitle;
        const data = yield (0, db_1.default)("poems")
            .join("titles", "poems.title_id", "titles.id")
            .select("poems.id", "poems.lns")
            .where("titles.short_title", poemTitle);
        res.status(200).json(data);
    }
    catch (error) {
        res.status(500).send("Error getting poems");
        console.log(error);
    }
}));
// GET poem information (data used for to render author, title, and publication date on poem page)
router.get("/info/:poemTitle", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const poemTitle = req.params.poemTitle;
        const data = yield (0, db_1.default)("titles")
            .join("poets", "titles.poet_id", "poets.id")
            .select("poets.first_name", "poets.last_name", "titles.title", "titles.pub_year")
            .where("titles.short_title", poemTitle);
        res.status(200).json(data);
    }
    catch (error) {
        res.status(500).send("Error getting poems");
        console.log(error);
    }
}));
// POST new poem line
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newPoem = yield (0, db_1.default)("poems").insert(req.body);
        res.status(201).json(req.body);
    }
    catch (error) {
        res.status(500).send("Error adding poem");
        console.log(error);
    }
}));
exports.default = router;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const authors_json_1 = __importDefault(require("../data/authors.json"));
router.get("/", (req, res) => {
    res.status(200).json(authors_json_1.default);
});
exports.default = router;

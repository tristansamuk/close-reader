"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const collections_json_1 = __importDefault(require("../data/collections.json"));
router.get("/", (req, res) => {
    res.status(200).json(collections_json_1.default);
});
router.get("/:title", (req, res) => {
    res.send("Slammin' Sonnets");
});
exports.default = router;

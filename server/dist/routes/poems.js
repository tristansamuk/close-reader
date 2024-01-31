"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const poems_json_1 = __importDefault(require("../data/poems.json"));
router.get("/", (req, res) => {
    res.status(200).json(poems_json_1.default);
});
// router.get("/:title"())
exports.default = router;

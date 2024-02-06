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
router.get("/", (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield (0, db_1.default)("poets")
            .select("poets.id", "poets.first_name", "poets.last_name", "poets.birth_year", "poets.death_year", "poets.img")
            .orderBy("last_name");
        res.status(200).json(data);
    }
    catch (_a) {
        res.status(500).send("Error getting poets");
    }
}));
exports.default = router;

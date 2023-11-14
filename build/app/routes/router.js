"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var multer_1 = __importDefault(require("../config/multer"));
var controller_1 = __importDefault(require("../controller/controller"));
var multer_2 = __importDefault(require("multer"));
var router = (0, express_1.Router)();
//POST adicionar problema
router.post("/gerarRelatorio/CSV", (0, multer_2.default)(multer_1.default).single('file'), controller_1.default.uploadCSV);
exports.default = router;

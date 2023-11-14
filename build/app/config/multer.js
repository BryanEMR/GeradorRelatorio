"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv"));
var multer_1 = __importDefault(require("multer"));
var path_1 = __importDefault(require("path"));
dotenv_1.default.config();
var MulterConfig;
(function (MulterConfig) {
    dest: path_1.default.resolve(__dirname, "..", "..", "tmp", "uploads");
    storage: multer_1.default.diskStorage({
        destination: function (req, file, cb) {
            cb(null, path_1.default.resolve(__dirname, "..", "..", "tmp", "uploads"));
        },
    });
})(MulterConfig || (MulterConfig = {}));
exports.default = MulterConfig;

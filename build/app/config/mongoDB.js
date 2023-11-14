"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
function connectMongoDB() {
    var dotenv = require('dotenv');
    dotenv.config();
    var _a = process.env, MONGO_USER = _a.MONGO_USER, MONGO_PASSWORD = _a.MONGO_PASSWORD, MONGO_HOST = _a.MONGO_HOST, MONGO_URL = _a.MONGO_URL;
    var MONGO_DB_URL = MONGO_URL
        ? MONGO_URL
        : "mongodb+srv://".concat(MONGO_USER, ":").concat(MONGO_PASSWORD, "@").concat(MONGO_HOST);
    console.log("mongoURL", MONGO_DB_URL);
    mongoose_1.default.connect(MONGO_DB_URL)
        .then(function () { return console.log("Banco conectado"); }).catch(function (err) {
        console.log("Deu Erro ao conectar ao banco", err);
    });
}
exports.default = connectMongoDB;

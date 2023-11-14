"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var routs = (0, express_1.Router)();
//Routes
routs.get("/", function (req, res) {
    res.send('Olá mundo, Bem-vindo ao Back!');
});
exports.default = routs;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("./app/config/index");
var dotenv = require('dotenv');
dotenv.config();
var PORT = process.env.PORT;
new index_1.App().server.listen(PORT || 3000);

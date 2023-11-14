"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
var express_1 = __importDefault(require("express"));
var index_1 = __importDefault(require("../routes/index"));
var mongoDB_1 = __importDefault(require("./mongoDB"));
var router_1 = __importDefault(require("../routes/router"));
var App = /** @class */ (function () {
    function App() {
        this.server = (0, express_1.default)();
        this.middleware();
        this.router();
    }
    App.prototype.middleware = function () {
        this.server.use(express_1.default.json());
        (0, mongoDB_1.default)();
    };
    /* --------------------------- Importação das rotas que será usados no sistema --------------------------- */
    App.prototype.router = function () {
        this.server.use(router_1.default);
        this.server.use(index_1.default);
    };
    return App;
}());
exports.App = App;

"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createOrcamentoPDF = void 0;
var path_1 = require("path");
var fs_1 = require("fs");
var variaveisHTML_1 = require("../jsonMokado/variaveisHTML");
var puppeteer_1 = __importDefault(require("puppeteer"));
var Handlebars = __importStar(require("handlebars"));
function createOrcamentoPDF(jsonCSV) {
    return __awaiter(this, void 0, void 0, function () {
        var hbsFile, variaveis, titlesNotDisplay, allTitlesNotDisplay, variablesNotDisplay, variables, readFile, template, html, browser, page, pathSavePdf, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    hbsFile = (0, path_1.resolve)(__dirname, "..", "html", "relatorio.hbs");
                    console.log(hbsFile);
                    variaveis = variaveisHTML_1.variablesHTMLForPDF.filter(function (variable) { return !variable.display; });
                    variaveis = variaveis.map(function (variable) {
                        switch (true) {
                            case variable.variablesNames === "initialPage":
                                var img = (0, path_1.resolve)(__dirname, "..", "html", "img", "initialPage.jpg");
                                var file = (0, fs_1.readFileSync)(img, { encoding: "base64" });
                                return __assign(__assign({}, variable), { content: "<img style=\"width: 100%; height: 100%\" src=\"data:image/png;base64,".concat(file, "\" />") });
                            case variable.variablesNames === "tabela":
                                var html_1 = '';
                                jsonCSV.forEach(function (infos) {
                                    console.log("infos ", infos);
                                    html_1 += "\n          <tr style=\"background-color: #EEE;\">\n            <td style=\" border-right: 2px solid white; border-collapse: collapse; padding-left:15px ;\">".concat(infos.Nome, " </td>\n            <td style=\" border-right: 2px solid white; border-collapse: collapse; padding-left:15px ;\">").concat(infos.Sobrenome, "</td>\n            <td style=\" border-right: 2px solid white; border-collapse: collapse; padding-left:15px ;\">").concat(infos.Cidade, "</td>\n            <td style=\" border-collapse: collapse; padding-left:15px ;\">").concat(infos.Sexo, "</td>\n          </tr>\n          ");
                                });
                                return __assign(__assign({}, variable), { content: html_1 });
                            default:
                                return variable;
                        }
                    });
                    titlesNotDisplay = variaveis.map(function (object) { return object.variablesNames; });
                    allTitlesNotDisplay = titlesNotDisplay.map(function (title, index) {
                        return Object.fromEntries([["".concat(title), variaveis[index].content]]);
                    });
                    variablesNotDisplay = Object.assign.apply(Object, __spreadArray([{}], allTitlesNotDisplay, false));
                    variables = __assign({}, variablesNotDisplay);
                    readFile = (0, fs_1.readFileSync)(hbsFile).toString("utf-8");
                    template = Handlebars.compile(readFile);
                    html = template(variables);
                    return [4 /*yield*/, puppeteer_1.default.launch({
                            headless: "new",
                        })];
                case 1:
                    browser = _c.sent();
                    return [4 /*yield*/, browser.newPage()];
                case 2:
                    page = _c.sent();
                    return [4 /*yield*/, page.setUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36")];
                case 3:
                    _c.sent();
                    return [4 /*yield*/, page.setContent(html)];
                case 4:
                    _c.sent();
                    pathSavePdf = (0, path_1.resolve)(__dirname, "..", "teste", "relatorio.pdf");
                    _a = fs_1.writeFileSync;
                    _b = [pathSavePdf];
                    return [4 /*yield*/, page.pdf()];
                case 5:
                    _a.apply(void 0, _b.concat([_c.sent()]));
                    return [2 /*return*/, pathSavePdf
                        // const fileBlob = await page.pdf({});
                        // return fileBlob ;
                    ];
            }
        });
    });
}
exports.createOrcamentoPDF = createOrcamentoPDF;

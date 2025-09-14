#!/usr/bin/env node
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
const colors_1 = __importDefault(require("colors"));
const options_1 = require("./config/options.js");
const config_1 = __importDefault(require("./config/config.js"));
// import { SendBodyFile } from "./utils/index";
console.log(colors_1.default.yellow(`
- GitHub: https://www.github.com/a1vinho    
`));
(() => __awaiter(void 0, void 0, void 0, function* () {
    const { body, method, url, output, header } = yield (0, config_1.default)();
    if (!url) {
        throw new Error('ERRO:Url is not present');
    }
    ;
    try {
        const Url = new URL(url);
        switch (method) {
            case 'GET':
                {
                    (0, options_1.OptionMethodGet)({
                        method,
                        outputFile: typeof output !== 'boolean' ? output : false,
                        header: header ? header : '',
                        url: Url
                    });
                    break;
                }
                ;
            case 'POST':
            case 'DELETE':
            case 'PUT':
                {
                    (0, options_1.SendDataServer)({
                        data: body ? body : '',
                        method,
                        outputFile: typeof output !== 'boolean' ? output : '',
                        url: Url,
                        header: header
                    });
                    break;
                }
                ;
        }
    }
    catch (e) {
        const err = e;
        if (err.code === 'ERR_INVALID_URL') {
            console.log(colors_1.default.red(`
 ERRO:INVALID URL
 Try using protocol before domain: ${colors_1.default.green(`https://${err.input}`)}
            `));
        }
    }
    ;
}))();

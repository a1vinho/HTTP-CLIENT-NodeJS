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
const yargs_1 = __importDefault(require("yargs"));
const helpers_1 = require("yargs/helpers");
const methods = ["GET", 'POST', 'DELETE', 'PUT'];
function ConfigYarg() {
    return __awaiter(this, void 0, void 0, function* () {
        const argv = yield (0, yargs_1.default)((0, helpers_1.hideBin)(process.argv)).options({
            method: {
                type: 'string',
                default: 'GET',
                alias: 'm',
                describe: "Método http a ser utilizando para a requisição",
                choices: methods
            },
            body: {
                type: 'string',
                alias: 'b',
                describe: "Essa opção é responsável por envia um corpo personalizado na requisição."
            },
            url: {
                type: "string",
                alias: 'u',
                describe: "Definir uma url especifica para a solicitação."
            },
            output: {
                default: false,
                alias: 'o',
                type: "string",
                // choices: ['file', 'terminal', 'json'],
                describe: 'Essa opção é responsável por salva a resposta da requisição em algum lugar especifico'
            },
            header: {
                type: 'string',
                alias: 'h',
                describe: "Essa opção permite envia cabeçalhos personalizados para a requisição"
            }
            // "bodyFile": {
            //     default: false,
            //     type: 'string',
            //     describe: "Essa opção permite você envia um arquivo para o corpo da requisição (limite de 1200 caracteres)"
            // }
        }).help('help').version('1.2.0').parse();
        return argv;
    });
}
exports.default = ConfigYarg;

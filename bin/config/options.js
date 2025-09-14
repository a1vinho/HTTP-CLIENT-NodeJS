#!/usr/bin/env node

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SendDataServer = exports.OptionMethodGet = void 0;
const https_1 = __importDefault(require("https"));
const http_1 = __importDefault(require("http"));
const colors_1 = __importDefault(require("colors"));
const index_1 = require("../utils/index");
function Request(protocol, options) {
    const request = protocol === 'http:' ? http_1.default.request(options) : https_1.default.request(options);
    return request;
}
;
function OptionMethodGet(ObjectData) {
    let { url, method, outputFile, header } = ObjectData;
    const headersConfig = (0, index_1.FormatHeaders)(header);
    // console.log(outputFile)
    // console.log(url.host + url.pathname)
    // console.log(url)
    const request = Request(url.protocol, {
        hostname: url.hostname,
        port: url.protocol === 'https:' ? 443 : 80,
        method,
        path: url.pathname + url.search,
        headers: Object.assign({}, headersConfig)
    });
    request.on('response', response => {
        let res = '';
        response.on('data', data => {
            res += data;
        });
        response.on('end', function () {
            (0, index_1.SaveOutputFile)(typeof outputFile === 'string' ? outputFile : false, {
                data: Buffer.from(res),
                headers: response.headers
            });
            if (!response.statusCode) {
                return;
            }
            const ObjectResponseData = {
                "Response Data": res,
                "Headers Response": response.headers,
                "Status Code": response.statusCode
            };
            console.log(ObjectResponseData);
            (0, index_1.DefineStatusResponse)(ObjectResponseData);
        });
    });
    request.end();
}
exports.OptionMethodGet = OptionMethodGet;
;
function SendDataServer(ObjectData) {
    let { url, method, outputFile, data, header } = ObjectData;
    const headersConfig = (0, index_1.FormatHeaders)(header);
    const request = Request(url.protocol, {
        hostname: url.hostname,
        method,
        path: url.pathname + url.search,
        headers: Object.assign({ "content-length": Buffer.byteLength(data) }, headersConfig)
    });
    request.on('response', function (response) {
        let res = '';
        response.on('data', d => {
            res += d;
        });
        response.on('error', function (err) {
            if (err) {
                console.log(colors_1.default.red(`ERRO:${err}`));
                process.exit();
            }
            ;
        });
        response.on('end', function () {
            // console.log(outputFile);
            console.log(res);
            (0, index_1.SaveOutputFile)(typeof outputFile === 'string' ? outputFile : false, {
                data: Buffer.from(res),
                headers: response.headers
            });
            if (!response.statusCode) {
                return;
            }
            const ObjectResponseData = {
                "Response Data": res,
                "Headers Response": response.headers,
                "Status Code": response.statusCode
            };
            (0, index_1.DefineStatusResponse)(ObjectResponseData);
        });
    });
    // console.log(data.toString())
    request.write(data);
    request.end();
}
exports.SendDataServer = SendDataServer;
;

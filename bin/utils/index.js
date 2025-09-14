#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefineStatusResponse = exports.FormatHeaders = exports.SaveOutputFile = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const colors_1 = __importDefault(require("colors"));
function SaveOutputFile(file, response) {
    if (!file || typeof file === 'boolean') {
        console.log(response);
        return;
    }
    const extername = path_1.default.extname(file);
    const write = fs_1.default.createWriteStream(file);
    const ObjectData = {
        Response_Data: response.data,
        headers: response.headers
    };
    if (extername === '.json') {
        write.write(JSON.stringify(ObjectData, null, 2));
    }
    else {
        write.write(Buffer.from(JSON.stringify(ObjectData, null, 2)));
    }
    ;
    write.on('error', function (err) {
        if (err) {
            console.log(colors_1.default.red(`ERRO:${err}`));
            process.exit();
        }
        ;
        console.log(colors_1.default.yellow(`Resposta salva com sucesso.`));
    });
}
exports.SaveOutputFile = SaveOutputFile;
;
function FormatHeaders(header) {
    const headersConfig = {
        "user-agent": "node.js"
    };
    if (!header) {
        return headersConfig;
    }
    let key = '';
    let value = '';
    if (Array.isArray(header)) {
        header.forEach((item) => {
            item = item.split('=').join(':');
            key = item.split(':')[0];
            value = item.split(':')[1];
            headersConfig[key] = value;
        });
        return headersConfig;
    }
    ;
    header = header.split('=').join(':');
    key = header.split(':')[0];
    value = header.split(':')[1];
    headersConfig[key] = value;
    // console.log(headersConfig)
    return headersConfig;
}
exports.FormatHeaders = FormatHeaders;
// export function SendBodyFile(fileSend: string) {
//     const extername = path.extname(fileSend);
//     const read = fs.createReadStream(fileSend);
//     read.on('error', function (err) {
//         if (err) {
//             console.log(colors.red(`ERRO: ${err}`));
//             process.exit();
//         };
//         console.log(colors.yellow(`Leitura finalizada com sucesso.`));
//     });
//     return read;
// };
function DefineStatusResponse(ObjectResponseData) {
    console.log(ObjectResponseData);
    const StringObjectResponseData = JSON.stringify(ObjectResponseData, null, 2);
    switch (ObjectResponseData["Status Code"]) {
        case 200:
        case 201:
            {
                console.log(colors_1.default.green(StringObjectResponseData));
                break;
            }
            ;
        case 400:
        case 401:
        case 429:
        case 403:
            {
                console.log(colors_1.default.red(StringObjectResponseData));
                break;
            }
            ;
        case 500:
        case 501:
            {
                console.log(colors_1.default.red(StringObjectResponseData));
                break;
            }
            ;
    }
}
exports.DefineStatusResponse = DefineStatusResponse;

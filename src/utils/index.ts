import fs from "fs";
import path from "path";
import colors from "colors";
import http from "http";

export function SaveOutputFile(file: string | boolean, response: {
    data: string | Buffer;
    headers: object
}) {
    if (!file || typeof file === 'boolean') {
        console.log(response)
        return;
    }
    const extername = path.extname(file);
    const write = fs.createWriteStream(file);
    const ObjectData = {
        Response_Data: response.data,
        headers: response.headers
    };
    if (extername === '.json') {
        write.write(JSON.stringify(ObjectData, null, 2));
    }
    else {
        write.write(Buffer.from(JSON.stringify(ObjectData, null, 2)));
    };
    write.on('error', function (err) {

        if (err) {
            console.log(colors.red(`ERRO:${err}`));
            process.exit();
        };
        console.log(colors.yellow(`Resposta salva com sucesso.`));
    });
};

export function FormatHeaders(header: string | Array<string>) {
    const headersConfig: any = {
        "user-agent": "node.js"
    };
    if (!header) {
        return headersConfig;
    }
    let key = '';
    let value = '';
    if (Array.isArray(header)) {
        header.forEach((item: string) => {
            item = item.split('=').join(':');

            key = item.split(':')[0];
            value = item.split(':')[1];
            headersConfig[key] = value;
        });
        return headersConfig;
    };
    header = header.split('=').join(':');
    key = header.split(':')[0];
    value = header.split(':')[1];

    headersConfig[key] = value;

    // console.log(headersConfig)
    return headersConfig;
}

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

export function DefineStatusResponse(ObjectResponseData: {
    "Response Data": string;
    "Headers Response": http.IncomingHttpHeaders;
    "Status Code": number
}) {

    console.log(ObjectResponseData)
    const StringObjectResponseData = JSON.stringify(ObjectResponseData, null, 2);
    switch (ObjectResponseData["Status Code"]) {
        case 200:
        case 201: {
            console.log(colors.green(StringObjectResponseData));
            break
        };
        case 400:
        case 401:
        case 429:
        case 403: {
            console.log(colors.red(StringObjectResponseData));
            break;
        };
        case 500:
        case 501: {
            console.log(colors.red(StringObjectResponseData));
            break;
        };
    }
}
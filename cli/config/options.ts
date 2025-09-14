import https from "https";
import http from "http";
import colors from "colors";

import { SaveOutputFile, SendBodyFile } from "../utils/index";


function Request(protocol: string, options: http.RequestOptions): http.ClientRequest {
    const request = protocol === 'http:' ? http.request(options) : https.request(options);
    return request;
};

export function OptionMethodGet(url: URL, method: string, outputFile: string): void {
    // console.log(url.host + url.pathname)
    // console.log(url)
    const request = Request(url.protocol, {
        hostname: url.hostname,
        port: url.protocol === 'https:' ? 443 : 80,
        method,
        path: url.pathname + url.search
    });
    request.on('response', response => {
        let body = '';
        response.on('data', data => {
            body += data;
        });

        response.on('end', function () {
            SaveOutputFile(outputFile as string, {
                data: body,
                headers: response.headers
            });
            console.log(colors.yellow(JSON.stringify({
                "Response Data": body,
                "Headers Response": response.headers
            }, null, 2)));
        })
    })
    request.end();
};
export function SendDataServer(ObjectData: {
    url: URL;
    method: string;
    outputFile: string;
    data: string | Buffer;
    bodyFile: string;
}): void {
    let { url, method, outputFile, data, bodyFile } = ObjectData;

    const headers: { 'content-type': string, "content-length"?: string | number } = {
        "content-type": 'application/json',
    };
    // let resBodyFile = '';
    // if (bodyFile && !data) {
    //     const read = SendBodyFile(bodyFile);
    //     read.on('data', function (d) {
    //         resBodyFile += d;
    //     });
    //     // data = res;
    // };
    const request = Request(url.protocol, {
        hostname: url.hostname,
        method,
        path: url.pathname + url.search,
        headers: {
            "content-type": 'application/json',
            "content-length": Buffer.byteLength(data)
        }
    });
    request.on('response', function (response) {
        let res = '';
        response.on('data', d => {
            res += d;
        });
        response.on('error', function (err) {
            if (err) {
                console.log(colors.red(`ERRO:${err}`));
                process.exit();
            };
        });
        response.on('end', function () {
            SaveOutputFile(outputFile, {
                data: Buffer.from(res),
                headers: response.headers
            });

            console.log(colors.green(JSON.stringify({
                "Response Data": res,
                "Headers Response": response.headers
            }, null, 2)));
        })
    });
    console.log(data.toString())
    request.write(data);
    request.end();
};
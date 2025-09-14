import https from "https";
import http from "http";
import colors from "colors";

import { DefineStatusResponse, FormatHeaders,SaveOutputFile } from "../utils/index";

function Request(protocol: string, options: http.RequestOptions): http.ClientRequest {
    const request = protocol === 'http:' ? http.request(options) : https.request(options);
    return request;
};

export function OptionMethodGet(ObjectData: {
    url: URL;
    method: string;
    outputFile: string | boolean;
    header: string;
}): void {
    let { url, method, outputFile, header } = ObjectData;
    const headersConfig = FormatHeaders(header);

    // console.log(outputFile)
    // console.log(url.host + url.pathname)
    // console.log(url)
    const request = Request(url.protocol, {
        hostname: url.hostname,
        port: url.protocol === 'https:' ? 443 : 80,
        method,
        path: url.pathname + url.search,
        headers: {
            ...headersConfig
        }
    });
    request.on('response', response => {
        let res = '';
        response.on('data', data => {
            res += data;
        });

        response.on('end', function () {

            SaveOutputFile(typeof outputFile === 'string' ? outputFile : false, {
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
            console.log(ObjectResponseData)
            DefineStatusResponse(ObjectResponseData);
        })
    })
    request.end();
};
export function SendDataServer(ObjectData: {
    url: URL;
    method: string;
    outputFile: string | boolean;
    data: string | Buffer;
    header: string;
}): void {
    let { url, method, outputFile, data, header } = ObjectData;

    const headersConfig = FormatHeaders(header);
    const request = Request(url.protocol, {
        hostname: url.hostname,
        method,
        path: url.pathname + url.search,
        headers: {
            "content-length": Buffer.byteLength(data),
            ...headersConfig
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

            // console.log(outputFile);
            console.log(res)
            SaveOutputFile(typeof outputFile === 'string' ? outputFile : false, {
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
            DefineStatusResponse(ObjectResponseData);
        })
    });
    // console.log(data.toString())
    request.write(data);
    request.end();
};
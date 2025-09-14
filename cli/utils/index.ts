import fs from "fs";
import path from "path";
import colors from "colors";
import http from "http";

export function SaveOutputFile(file: string, response: {
    data: string | Buffer;
    headers: object
}) {
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
export function SendBodyFile(fileSend:string) {
    const extername = path.extname(fileSend);
    const read = fs.createReadStream(fileSend);
    read.on('error',function(err) {
        if (err) {
            console.log(colors.red(`ERRO: ${err}`));
            process.exit();
        };
        console.log(colors.yellow(`Leitura finalizada com sucesso.`));
    });

    return read;
};
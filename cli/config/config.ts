import yargs, { alias, describe } from "yargs";
import { hideBin } from "yargs/helpers";

const methods = ["GET", 'POST', 'DELETE', 'PUT'];
export default async function ConfigYarg() {
    const argv = await yargs(hideBin(process.argv)).options({
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
}
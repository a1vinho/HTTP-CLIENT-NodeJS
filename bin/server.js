"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.get('/json', function (request, response) {
    console.log(request.headers);
    return response.status(200).json({
        message: "Server Acess",
        ok: true
    });
});
app.post('/data', function (request, response) {
    console.log(request.body);
    return response.status(200).json(request.body);
});
app.listen(8080, function (err) {
    if (err) {
        console.log('Erro ao executa o servidor', err);
        process.exit();
    }
    ;
    console.log('Servidor rodando em ' + 8080);
});

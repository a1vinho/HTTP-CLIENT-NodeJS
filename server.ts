import express,{Response} from "express";

const app = express();

app.use(express.json());
app.get('/json',function(request,response):Response {
    console.log(request.headers);
    return response.status(200).json({
        message: "Server Acess",
        ok:true
    });
});
app.post('/data',function(request,response) {
    console.log(request.body);
    return response.status(200).json(request.body);
})
app.listen(8080,function(err) {
    if (err) {
        console.log('Erro ao executa o servidor',err);
        process.exit();
    };
    console.log('Servidor rodando em ' + 8080);
});
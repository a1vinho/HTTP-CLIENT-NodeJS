# AL-HTTP-CLIENT

Bem vindo (a),nesse repositória estamos trazendo uma **inteface de linha de comando (CLI)** que funciona como um client http,onde você poderá enviar requisições e cabeçalhos para servidores ou sites. 🚀 🚀

Esse projeto foi desenvolvido com as tecnologias ditadas abaixo.
1. NodeJS
2. Typescript
3. Yargs (biblioteca para a crianção de clis)

## instalação do modulo
```
npm i -g http-client-al 
```

Você pode visitar a lib no site da **NPM**: https://www.npmjs.com/package/http-al-client

## Parametrôs utilizados 
Os parametôs são uma maneria de personalizar ainda mais sua requisição.
| parametrô | alias | tipo | valor padrão |
|-----------|-------|------| -------------|
| --method  | -m    | string| GET         |
| --url     | -u    | string| null        |
| --body    | -b    | string| null        |
| --output  | -o    | string| false       |
| --header  | -h    | string| null        |
-------------------------------------------

## Explicando cada parametrô
Cada parametrô mostrando acima tem uma funcionalidade especifica,vamos começa pelo mais simples
### --url (-u)
Esse parametrô é responsável por definir a url da sua requisição,como vimos anteriomente esse parametrô é definido como null.
**OBS**: Você precisa especificar o protocolo (http / https) antés da url 
```
alhttp --url https://www.youtube.com
```
### --method(-m)
Com o parametrô --method,podemos especificar o método utilizando na requisição,por padrão essa lib aceita apenas os 4 métodos https principais **GET,DELETE,PUT,POST**

```
alhttp --url http://localhost:8080/send-data --method POST --body '{"username":"teste","password":"hash-example"}' --header Content-Type=application/json
```

### --body (-b)
Não a grande diferença entre a utilização desse parametrô com outra ferramentas clis,como o curl por exemplo.No exemplo anterior vimos a sua utilização,isso já facilita bastante o nosso entedimento sobre --body

```
alhttp --url http://localhost:8080/send-data --method POST --body '{"username":"teste","password":"hash-example"}' --header Content-Type=application/json
```

### --output (-o)
Esse parametrô é responsável por armazena a resposta do servidor em algum arquivo de sua preferencia.
**OBS**: Arquivos .json não serão salvo em buffers,mas qualquer arquivo especificado que não seja .json será transformado em Buffer,para facilitar a conversão dos dados.
```
alhttp --url https://jsonplaceholder.typicode.com/posts -m GET --output response.json
```
### --header (-h)

Com esse parametrô você consegue envia cabeçalhos http personalizados na sua requisição

```
alhttp --url http://localhost:8080/auth/profile --header "Authorization=example-jwt"
```

# END 
Obrigado a todos pela a atenção,fiquem a vontade para criar suas proprias versões e aprimoramento do repositório.Agradeço


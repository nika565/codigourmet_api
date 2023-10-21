// Configurações iniciais
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

// Inicializando o express
const app = express();

// Habilitando o cors para requisição de todas as origens
app.use(cors());

// BodyParser para lidar com as requisições
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Conexão com o banco de dados
const conn = require('./database/conn');
conn();

const port = process.env.PORT || 3333;

// Usando o roteador da aplicação
const roteador = require('./router/routes');
app.use(roteador);

// Iniciando a aplicação
app.listen(port, () => {
    console.log(`SERVIDOR RODANDO!`);
    console.log(`Acesse http://localhost:9001 ou http://localhost:3333`);
});


// export default app;
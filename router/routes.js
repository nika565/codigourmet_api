// Aqui será o roteador principal da aplicação
const roteador = require('express').Router();

// Testando as rotas
roteador.route('/').get((req, res) => res.send(JSON.stringify({id: '0809', teste: "Olá mundo!!!"})));

module.exports = roteador;
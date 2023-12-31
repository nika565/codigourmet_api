// Aqui será o roteador principal da aplicação
const roteador = require('express').Router();

// importando as rotas da aplicação
const roteadorReceitas = require('./receitasRouter');
const roteadorFavoritos = require('./receitasFavoritas');
const roteadorApagar = require('./apagarTodasReceitas');
const roteadorUsuarios = require('./usuarioRouter');
const roteadorLogin = require('./loginRouter');
const roteadorMinhasReceitas = require('./minhasReceitas');
const roteadorSenha = require('./recuperarSenha');

// Testando a rota raiz
roteador.route('/').get((req, res) => res.send(JSON.stringify({id: '0809', teste: "Olá mundo!!!"})));

// usando as rotas da aplicação

// Rota de Usuario
roteador.use('/', roteadorUsuarios);
roteador.use('/usuarios', roteadorLogin);

// Rota de receitas
roteador.use('/', roteadorReceitas);
roteador.use('/receitas', roteadorFavoritos);
roteador.use('/receitas', roteadorApagar);
roteador.use('/receitas', roteadorMinhasReceitas);

// Rota de recuperar senha
roteador.use('/', roteadorSenha);

module.exports = roteador;
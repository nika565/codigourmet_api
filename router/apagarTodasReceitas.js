// Autenticação
const autenticacao = require('../middlewares/autenticacao');

// Roteador para pagra todas as receitas
const roteadorApagar = require('express').Router();

// Usando o controller de recitas para realizar a operação
const ReceitasController = require('../controllers/ReceitasController');
const receitas = new ReceitasController();

// Rota para apagar todas as receitas
roteadorApagar.route('/apagartudo/:id').delete(autenticacao, (req, res) => receitas.apagarTodasReceitas(req, res));

module.exports = roteadorApagar;
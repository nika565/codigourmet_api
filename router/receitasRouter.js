// Autenticação
const autenticacao = require('../middlewares/autenticacao');

// Roteador de receitas para realizar o CRUD de receitas.
const roteadorReceitas = require('express').Router();

// Usando o controller de receitas para fazer as operações
const ReceitasController = require('../controllers/ReceitasController');
const receitas = new ReceitasController();

// Rota para criar receita
roteadorReceitas.route('/receitas').post(autenticacao, (req, res) => receitas.criar(req, res));

// Rota para buscar as últimas receitas públicadas
roteadorReceitas.route('/receitas').get(autenticacao, (req, res) => receitas.receitas(req, res));

// Rota para buscar uma receita
roteadorReceitas.route('/receitas/:id').get(autenticacao, (req, res) => receitas.buscarReceita(req, res));

// Rota para editar uma receita
roteadorReceitas.route('/receitas/:id').put(autenticacao, (req, res) => receitas.editarReceita(req, res));

// Rota para excluir uma receita
roteadorReceitas.route('/receitas/:id').delete(autenticacao, (req, res) => receitas.apagarReceita(req, res));

module.exports = roteadorReceitas;
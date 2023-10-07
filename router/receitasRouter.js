// Roteador de receitas para realizar o CRUD de receitas.
const roteadorReceitas = require('express').Router();

// Usando o controller de receitas para fazer as operações
const ReceitasController = require('../controllers/ReceitasController');
const receitas = new ReceitasController();

// Rota para criar receita
roteadorReceitas.route('/receitas').post((req, res) => receitas.criar(req, res));

// Rota para buscar as últimas receitas públicadas
roteadorReceitas.route('/receitas').get((req, res) => receitas.receitas(req, res));

// Rota para buscar uma receitas
roteadorReceitas.route('/receitas/:id').get((req, res) => receitas.buscarReceita(req, res));

// Rota para editar uma receita
roteadorReceitas.route('/receitas/:id').put((req, res) => receitas.editarReceita(req, res));

// Rota para excluir uma receita
roteadorReceitas.route('/receitas/:id').delete((req, res) => receitas.apagarReceita(req, res));

module.exports = roteadorReceitas;
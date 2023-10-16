// Autenticação
const autenticacao = require('../middlewares/autenticacao');

// Roteador específico para receitas
const roteadorMinhasReceitas = require('express').Router();

// Controller
const UsuarioController = require('../controllers/UsuarioController');
const usuario = new UsuarioController();

// Rota para retornar as receitas criadas pelo usuário.
roteadorMinhasReceitas.route('/minhasreceitas/:id').get(autenticacao, (req, res) => usuario.minhasReceitas(req, res));

module.exports = roteadorMinhasReceitas;
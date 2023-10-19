// Craindo o roteador
const roteadorSenha = require('express').Router();

// Controller
const UsuarioController = require('../controllers/UsuarioController');
const usuario = new UsuarioController();

// Rota para enviar o email de recuperação
roteadorSenha.route('/recuperarsenha').post((req, res) => usuario.emailRecuperar(req, res));

// Rota para mudar a senha de fato
roteadorSenha.route('/recuperarsenha/:id').patch((req, res) => usuario.recuperarSenha(req, res));

module.exports = roteadorSenha;
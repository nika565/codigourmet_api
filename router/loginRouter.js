// Roteador de login
const roteadorLogin = require('express').Router();

// Importando o Controller de usuários
const UsuarioController = require('../controllers/UsuarioController');
const usuario = new UsuarioController();

// Definindo a rota de login
roteadorLogin.route('/login').post((req, res) => usuario.login(req, res));

module.exports = roteadorLogin;
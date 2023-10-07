// Usando o roteador do express para configurar as rotas do usuário para CRUD
const roteadorUsuarios = require('express').Router();

// Importando a classe de usuário controller para realizar as operações
const UsuarioController = require('../controllers/UsuarioController');
const usuario = new UsuarioController();

// Rota para criar usuários
roteadorUsuarios.route('/usuarios').post((req, res) => usuario.criar(req, res));

// Rota para buscar dados do usuário
roteadorUsuarios.route('/usuarios/:id').get((req, res) => usuario.buscarUsuario(req, res));

// Rota para editar usuário
roteadorUsuarios.route('/usuarios/:id').put((req, res) => usuario.editar(req, res));

// Rota para excluir usuário
roteadorUsuarios.route('/usuarios/:id').delete((req, res) => usuario.apagar(req, res));


module.exports = roteadorUsuarios;
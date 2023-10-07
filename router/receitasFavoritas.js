// Rotas de receitas favoritas
const roteadorFavoritos = require('express').Router();

// Controller do usuário pra realizar essas operações
const UsuarioController = require('../controllers/UsuarioController');
const usuario = new UsuarioController();

// Rota para buscar receitas favoritas
roteadorFavoritos.route('/receitasfavoritas/:id').get((req, res) => usuario.buscarReceitasFavoritas(req, res));

// Rota para favoritar uma receita
roteadorFavoritos.route('/receitasfavoritas/:id').post((req, res) => usuario.favoritarReceitas(req, res));

// Rota para remover uma receita da lista de favoritos
roteadorFavoritos.route('/receitasfavoritas/:id').put((req, res) => usuario.desfavoritarReceitas(req, res));

module.exports = roteadorFavoritos;
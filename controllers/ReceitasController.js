// Usando o model de receitas para realizar as operações no banco de dados
const ReceitasModel = require('../models/Receitas');

const ReceitasController = {

    // Criar receitas
    criar: async (req, res) => {

        try {
            
        } catch (error) {
            console.log(error);
            return res.status(500).json({ msg: `Algo deu errado...`, status: `error` })
        }

    },

    // Buscar as últimas receitas publicadas 
    Receitas: async (req, res) => {

        try {
            
        } catch (error) {
            console.log(error);
            return res.status(500).json({ msg: `Algo deu errado...`, status: `error` })
        }

    },

    // Buscar uma receita específica pelo ID
    buscarReceita: async (req, res) => {

        try {
            
        } catch (error) {
            console.log(error);
            return res.status(500).json({ msg: `Algo deu errado...`, status: `error` })
        }

    },

    // Editar uma receita
    editarReceita: async (req, res) => {

        try {
            
        } catch (error) {
            console.log(error);
            return res.status(500).json({ msg: `Algo deu errado...`, status: `error` })
        }

    },

    // Apagar uma receita específica do usuário
    apagarReceita: async (req, res) => {

        try {
            
        } catch (error) {
            console.log(error);
            return res.status(500).json({ msg: `Algo deu errado...`, status: `error` })
        }

    },

    // Apagar todas as receitas do usuário
    apagarTodasReceitas: async (req, res) => {

        try {
            
        } catch (error) {
            console.log(error);
            return res.status(500).json({ msg: `Algo deu errado...`, status: `error` })
        }
        
    }
    

}

module.exports = ReceitasController;
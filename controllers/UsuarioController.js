// Model para realizar os processos no banco de dados
const UsuarioModel = require('../models/Usuario');

// Importando minha classe de criptografia
const Criptografia = require('./validators/criptografia');

const criptografia = new Criptografia();

// Objeto do usuário que contém os métodos pra realizar as operações no banco de dados
const UsuarioController = {

    // Método para criar novo Usuário
    criar: async (req, res) => {

        try {

            // Objeto com os dados do usuário
            const usuario = {
                nome: req.body.nome,
                sobrenome: req.body.sobrenome,
                email: req.body.email,
                senha: req.body.senha
            }

            // Criando o usuário:
            const criar = await UsuarioModel.create(usuario);

            // Verificando a resposta
            if (criar) {

                // Dados a serem devolvidos para o cliente
                const dados = {
                    id: criar._id,
                    nome: criar.nome,
                    sobrenome: criar.sobrenome,
                    email: criar.email,
                    receitasFavoritas: criar.receitasFavoritas
                }

                // Resposta enviada ao front-end
                res.status(201).json({ msg: `Usuário cadastrado com sucesso!`, status: `success`, dados: dados });

            } else {
                res.status(400).json({ msg: `Não foi possível cadastrar o usuário`, status: `error` })
            }

            return;

        } catch (error) {
            console.log(error);
            return res.status(500).json({ msg: `Algo deu errado...`, status: `error` })
        }

    },

    // Método para Buscar os dados do usuário;
    buscarUsuario: async (req, res) => {

        try {

            // Pegando o id do usuário
            const id = req.params.id

            const buscar = await UsuarioModel.findOne({_id: id}, '-senha').exec();

            if (!buscar || buscar.length < 1) return res.status(404).json({msg: `O Usuário não foi encontrado.`, status: `error`});

            return res.status(200).json({msg: `OK`, status: `success`, dados: buscar})

        } catch (error) {
            console.log(error);
            return res.status(500).json({ msg: `Algo deu errado...`, status: `error` })
        }

    },

    // Método para realizar o login
    login: async (req, res) => {

        try {

            const email = req.body.email;

            // Verificando a existência do email
            const verificacao = await UsuarioModel.findOne({email: email}).exec();

            if (verificacao) {

                const senha = await criptografia.verificarSenha(req.body.senha, verificacao.senha);

                if (senha) {

                    // Dados para voltar no front-end
                    const dados = {
                        id: verificacao._id,
                        nome: verificacao.nome,
                        sobrenome: verificacao.sobrenome,
                        email: verificacao.email,
                        receitasFavoritas: verificacao.receitasFavoritas
                    }

                    res.status(200).json({msg: `Bem-vindo(a) ${dados.nome}`, status: `success`, dados: dados})

                } else {
                    res.status(404).json({msg: `Usuário não encontrado.`, status: `error`});
                }

            } else {
                res.status(400).json({msg: `Email ou senha inválidos.`, status: `error`});
            }

        } catch (error) {
            console.log(error);
            return res.status(500).json({ msg: `Algo deu errado...`, status: `error` })
        }

    },

    // Método para editar Usuário
    editar: async (req, res) => {

        try {
            
        } catch (error) {
            console.log(error);
            return res.status(500).json({ msg: `Algo deu errado...`, status: `error` })
        }

    },

    // Método para excluir usuário.
    apagar: async (req, res) => {

        try {
            
        } catch (error) {
            console.log(error);
            return res.status(500).json({ msg: `Algo deu errado...`, status: `error` })
        }

    },

    // Processo para favoritar receitas salvando o ID delas em um array
    receitasFavoritas: async (req, res) => {

        try {
            
        } catch (error) {
            console.log(error);
            return res.status(500).json({ msg: `Algo deu errado...`, status: `error` })
        }

    }

}

module.exports = UsuarioController;
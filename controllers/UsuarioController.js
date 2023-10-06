// Model para realizar os processos no banco de dados
const UsuarioModel = require('../models/Usuario');

// Importando minha classe de criptografia
const Criptografia = require('./validators/criptografia');

const criptografia = new Criptografia();

// Objeto do usuário que contém os métodos pra realizar as operações no banco de dados
class UsuarioController {

    // Método para criar novo Usuário
    async criar(req, res) {

        try {

            // Criptografando a senha
            const senha = await criptografia.senhaCriptografada(req.body.senha);

            // Objeto com os dados do usuário
            const usuario = {
                nome: req.body.nome,
                sobrenome: req.body.sobrenome,
                email: req.body.email,
                senha: senha
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

    }

    // Método para Buscar os dados do usuário;
    async buscarUsuario(req, res) {

        try {

            // Pegando o id do usuário
            const id = req.params.id

            const buscar = await UsuarioModel.findOne({ _id: id }, '-senha').exec();

            if (!buscar || buscar.length < 1) return res.status(404).json({ msg: `O Usuário não foi encontrado.`, status: `error` });

            // Extraindo somente os dados do usuário
            const dados = {
                id: buscar._id,
                nome: buscar.nome,
                sobrenome: buscar.sobrenome,
                email: buscar.email
            }

            return res.status(200).json({ msg: `OK`, status: `success`, dados: dados })

        } catch (error) {
            console.log(error);
            return res.status(500).json({ msg: `Algo deu errado...`, status: `error` })
        }

    }

    // Método para realizar o login
    async login(req, res) {

        try {

            const email = req.body.email;

            // Verificando a existência do email
            const verificacao = await UsuarioModel.findOne({ email: email }).exec();

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

                    res.status(200).json({ msg: `Bem-vindo(a) ${dados.nome}`, status: `success`, dados: dados })

                } else {
                    res.status(404).json({ msg: `Usuário não encontrado.`, status: `error` });
                }

            } else {
                res.status(400).json({ msg: `Email ou senha inválidos.`, status: `error` });
            }

        } catch (error) {
            console.log(error);
            return res.status(500).json({ msg: `Algo deu errado...`, status: `error` })
        }

    }

    // Método para editar Usuário
    async editar(req, res) {

        try {

            // Pegando o id do usuário pela url
            const id = req.params.id;

            // dados a serem alterados
            const usuario = {
                nome: req.body.nome,
                sobrenome: req.body.sobrenome,
                email: req.body.email
            }

            const edicao = await UsuarioModel.findByIdAndUpdate(id, usuario);

            if (edicao) {
                return res.status(200).json({ msg: `Usuário editado com sucesso!`, status: `success`, dados: edicao });
            }

            return res.status(400).json({ msg: `Não foi possível editar dados do usuário.`, status: `error` });

        } catch (error) {
            console.log(error);
            return res.status(500).json({ msg: `Algo deu errado...`, status: `error` })
        }

    }

    // Método para excluir usuário.
    async apagar(req, res) {

        try {

            // Resgantanod o id do usuário para deletar ele
            const id = req.params.id;

            const deletar = await UsuarioModel.findByIdAndDelete(id);

            if (deletar) {
                return res.status(200).json({ msg: `Usuário deletado com sucesso`, status: `success` });
            }

            return res.status(400).json({ msg: `Não foi possível deletar o usuário.`, status: `error` });

        } catch (error) {
            console.log(error);
            return res.status(500).json({ msg: `Algo deu errado...`, status: `error` })
        }

    }

    // Processo para buscar receitas favoritas do usuário
    async buscarReceitasFavoritas(req, res) {

        try {

            const id = req.params.id;

            const receitas = await UsuarioModel.find({ _id: id }, 'receitasFavoritas');

            if (receitas.length === 0) {
                return res.status(404).json({ msg: `Nenhuma receita encontrada.`, status: `error` })
            }

            return res.status(200).json({ msg: `OK`, status: `success`, dados: receitas });

        } catch (error) {
            console.log(error);
            return res.status(500).json({ msg: `Algo deu errado...`, status: `error` })
        }

    }

    // Processo de favoritar receitas
    async favoritarReceitas(req, res) {

        try {

            const id = req.params.id;

            const resultado = await UsuarioModel.findOneAndUpdate(
                { _id: id },
                { $push: { receitasFavoritas: novoValor } },
                { new: true } // Isso retorna o documento atualizado
              );
            

            if (!resultado) {
                return res.status(404).json({ msg: `Não foi possível favoritar a receita.`, status: `error` })
            }

            return res.status(200).json({ msg: `OK`, status: `success`, dados: resultado.receitasFavoritas });

        } catch (error) {
            console.log(error);
            return res.status(500).json({ msg: `Algo deu errado...`, status: `error` })
        }

    }

}

module.exports = UsuarioController;
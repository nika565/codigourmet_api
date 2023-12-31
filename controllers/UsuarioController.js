// Importanddo o JWT para gerar o token do login
const jwt = require('jsonwebtoken');
require('dotenv').config();
const nodemailer = require('nodemailer');

// Model para realizar os processos no banco de dados
const UsuarioModel = require('../models/Usuario');
const ReceitasModel = require('../models/Receitas');

// Importando validações
const Criptografia = require('../validators/criptografia');
const ValidacaoEmail = require('../validators/validacaoEmail');
const validarSenha = require('../validators/validacaoSenha');
const validarNome = require('../validators/validacaoNome');

// Instânciando validações
const validarEmail = new ValidacaoEmail();
const criptografia = new Criptografia();

// Objeto do usuário que contém os métodos pra realizar as operações no banco de dados
class UsuarioController {

    // Método para criar novo Usuário
    async criar(req, res) {

        try {

            // Validando campos vázios
            if (!req.body.nome) return res.status(400).json({ msg: `Campo de nome não pode estar vázio.`, status: `error` });
            if (!req.body.sobrenome) return res.status(400).json({ msg: `Campo de sobrenome não pode estar vázio.`, status: `error` });
            if (!req.body.email) return res.status(400).json({ msg: `Campo de email não pode estar vázio.`, status: `error` });
            if (!req.body.senha) return res.status(400).json({ msg: `Campo de senha não pode estar vázio.`, status: `error` });

            // Validações de nome e sobrenome
            if (!validarNome(req.body.nome)) return res.status(400).json({ msg: `Campo de nome inválido.`, status: `error` })
            if (!validarNome(req.body.sobrenome)) return res.status(400).json({ msg: `Campo de sobrenome inválido.`, status: `error` })

            // Validação de email
            if (validarEmail.tamanho(req.body.email)) return res.status(400).json({ msg: `O e-mail digitado ultrapassou o limite de 300 caracteres.`, status: `error` });
            if (!validarEmail.validacao(req.body.email)) return res.status(400).json({ msg: `E-mail inválido.`, status: `error` });
            if (await validarEmail.duplicado(req.body.email)) return res.status(400).json({ msg: `O email já existente, por favor digite outro email.`, status: 'error' });

            // Validação de senha
            if (!validarSenha(req.body.senha)) return res.status(400).json({ msg: `A senha está no formato incorreto. A senha deve ter entre 6 e 14 caracteres, deve possuir uma letra maiúscula, deve possuir uma letra minúscula, um número e um símbolo.`, status: 'error' });

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
                // Resposta enviada ao front-end
                res.status(201).json({ msg: `Usuário cadastrado com sucesso!`, status: `success` });

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
                email: buscar.email,
                receitasFavoritas: buscar.receitasFavoritas
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

            // Validações
            if (!req.body.email) {
                return res.status(400).json({ msg: `O email é obrigatório.` })
            }

            if (!req.body.senha) {
                return res.status(400).json({ msg: `O senha é obrigatório.` })
            }

            const email = req.body.email;

            // Verificando a existência do email
            const verificacao = await UsuarioModel.findOne({ email: email }).exec();

            if (verificacao) {

                const senha = await criptografia.verificarSenha(req.body.senha, verificacao.senha);

                if (senha) {

                    // Gerando o token do login
                    try {

                        const secret = process.env.SECRET;

                        const token = jwt.sign({
                            id: verificacao._id
                        }, secret);

                        // Dados para voltar no front-end
                        const dados = {
                            id: verificacao._id,
                            nome: verificacao.nome,
                            sobrenome: verificacao.sobrenome,
                            email: verificacao.email,
                            receitasFavoritas: verificacao.receitasFavoritas
                        }

                        return res.status(200).json({ msg: `Bem-vindo(a) ${dados.nome}`, status: `success`, dados: dados, token })


                    } catch (error) {
                        console.log(error);
                        res.status(500).json({ msg: `Aconteceu algum erro no servidor.`, status: `error` })
                    }


                } else {
                    res.status(400).json({ msg: `Email ou senha inválidos.`, status: `error` });
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

            // Validando campos vázios
            if (!req.body.nome) return res.status(400).json({ msg: `Campo de nome não pode estar vázio.`, status: `error` });
            if (!req.body.sobrenome) return res.status(400).json({ msg: `Campo de sobrenome não pode estar vázio.`, status: `error` });

            // Validações de nome e sobrenome
            if (!validarNome(req.body.nome)) res.status(400).json({ msg: `Campo de nome inválido.`, status: `error` })
            if (!validarNome(req.body.sobrenome)) res.status(400).json({ msg: `Campo de sobrenome inválido.`, status: `error` })


            // dados a serem alterados
            const usuario = {
                nome: req.body.nome,
                sobrenome: req.body.sobrenome,
            }

            const edicao = await UsuarioModel.findByIdAndUpdate(id, usuario);

            if (edicao) {
                return res.status(200).json({ msg: `Usuário editado com sucesso!`, status: `success` });
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

            const dados = await UsuarioModel.findOne({ _id: id }, 'receitasFavoritas');

            if (dados.length === 0) {
                return res.status(404).json({ msg: `Nenhuma receita encontrada.`, status: `error` })
            }

            const receitasFavoritas = await consultaReceitasFavoritas(dados.receitasFavoritas);

            return res.status(200).json({ msg: `OK`, status: `success`, receitasFavoritas });

        } catch (error) {
            console.log(error);
            return res.status(500).json({ msg: `Algo deu errado...`, status: `error` })
        }

    }

    // Processo de favoritar receitas
    async favoritarReceitas(req, res) {

        try {

            const id = req.params.id;

            const receita = req.body.receita;

            // Verificando se a receita já está favoritada

            // inserindo a receita na lista de favoritas
            const resultado = await UsuarioModel.findOneAndUpdate(
                { _id: id },
                { $push: { receitasFavoritas: receita } },
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

    // Processo de romever uma receita de "Favoritos"
    async desfavoritarReceitas(req, res) {
        try {
            const id = req.params.id;
            const receitaId = req.body.receitaId;

            const resultado = await UsuarioModel.findOneAndUpdate(
                { _id: id },
                { $pull: { receitasFavoritas: receitaId } }, // Usando $pull para remover a receita favorita
                { new: true } // Isso retorna o documento atualizado
            );

            if (!resultado) {
                return res.status(404).json({ msg: `Não foi possível desfavoritar a receita.`, status: `error` });
            }

            return res.status(200).json({ msg: `OK`, status: `success`, dados: resultado.receitasFavoritas });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ msg: `Algo deu errado...`, status: `error` });
        }
    }

    // Buscar as minhas receitas
    async minhasReceitas(req, res) {

        try {

            // Buscando as receitas criadas pelo usuário, é nescessário o ID do mesmo.
            const id = req.params.id;

            const dados = await ReceitasModel.find({ idCriador: id });

            if (!dados) return res.status(404).json({ msg: `Nenhuma receita encontrada.`, status: `error` });

            return res.status(200).json({ msg: `Sucesso!`, status: `success`, dados: dados })

        } catch (error) {
            console.log(error);
            return res.status(500).json({ msg: `Erro no servidor! Tente novamente mais tarde.`, status: `error` })
        }

    }

    // Envio de email para recuperar a senha
    async emailRecuperar(req, res) {

        try {

            // Pegando o email mandado na url
            const email = req.body.email

            const dados = await UsuarioModel.findOne({email: email});

            if (!dados) {
                return res.status(404).json({msg: `Usuário não encontrado!`, status: `error`});
            } 
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    type: 'OAuth2',
                    user: process.env.MAIL_USERNAME,
                    pass: process.env.MAIL_PASSWORD,
                    clientId: process.env.OAUTH_CLIENTID,
                    clientSecret: process.env.OAUTH_CLIENT_SECRET,
                    refreshToken: process.env.OAUTH_REFRESH_TOKEN
                }
            });

            let mailOptions = {
                from: 'tomerpacific@gmail.com',
                to: `${email}`,
                subject: 'Recuperação de senha.',
                text: `Olá ${dados.nome}, aqui está o seu código para recuperar a senha: ${dados._id}`
            };

            try {
                const info = await transporter.sendMail(mailOptions);
                console.log('E-mail enviado com sucesso!', info.response);
                return res.status(200).json({ msg: `E-mail enviado! confira sua caixa de emails.`, status: `success` });
            } catch (error) {
                console.error('Erro ao enviar o e-mail:', error);
                return res.status(500).json({ msg: `Erro ao enviar o e-mail.`, status: `error` });
            }

        } catch (error) {
            console.log(error);
            return res.status(500).json({ msg: `Algo deu errado no servidor! Tente novamente mais tarde.`, status: `error` });
        }

    }

    async recuperarSenha(req, res) {
        try {

            const id = req.params.id;

            // Validação de senha
            if (!validarSenha(req.body.senha)) return res.status(400).json({ msg: `A senha está no formato incorreto. A senha deve ter entre 6 e 14 caracteres, deve possuir uma letra maiúscula, deve possuir uma letra minúscula, um número e um símbolo.`, status: 'error' });

            // Criptografando a senha
            const senha = await criptografia.senhaCriptografada(req.body.senha);

            const usuario = {
                senha: senha
            }

            const alterarSenha = await UsuarioModel.findByIdAndUpdate(id, usuario);

            if (!alterarSenha) {
                return res.status(400).json({msg: `Não foi possível alterar a senha.`, status: `error`});
            } else {
                return res.status(200).json({msg: `Senha alterada com sucesso`, status: `success`})
            }


        } catch (error) {
            console.log(error);
            return res.status(500).json({ msg: `Algo deu errado, tente novamente mais tarde!`, status: `error` })
        }
    }


}

// Funçção para buscar a lista de receitas favoritas
async function consultaReceitasFavoritas(array) {

    try {

        const arrayReceitas = [];

        for (let id of array) {

            let receita = await ReceitasModel.findById(id);

            arrayReceitas.push(receita);

        }

        console.log(arrayReceitas);

        return arrayReceitas;

    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: `Algo deu errado...`, status: `error` })
    }

}

module.exports = UsuarioController;
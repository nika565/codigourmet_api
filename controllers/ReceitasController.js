// Usando o model de receitas para realizar as operações no banco de dados
const ReceitasModel = require('../models/Receitas');

// Classe para manipular as receitas
class ReceitasController {

    // Criar receitas
    async criar(req, res) {

        // Data para a criação da receita
        const dataAtual = new Date();

        const data = `${dataAtual.getDate()}-${dataAtual.getMonth() + 1}-${dataAtual.getFullYear()}`

        try {

            // Objeto para inserir dados
            const receita = {
                nome: req.body.nome,
                idCriador: req.body.idCriador,
                ingredientes: req.body.ingredientes,
                modoPreparo: req.body.modoPreparo,
                tempo: req.body.tempo,
                data: data
            }

            if (!receita.nome) return res.status(400).json({msg: `Campo de nome não preenchido.`, status: `error`});
            if (!receita.idCriador) return res.status(400).json({msg: `É preciso inserir o ID da pessoa que criou a receita`, status: `error`});
            if (!receita.ingredientes) return res.status(400).json({msg: `Campo de ingredientes não preenchido.`, status: `error`});
            if (!receita.modoPreparo) return res.status(400).json({msg: `Campo de modo de preparo não preenchido.`, status: `error`});
            if (!receita.tempo) return res.status(400).json({msg: `Campo de tempo de preparo não preenchido.`, status: `error`});

            // Inserindo no banco de dados
            const criarReceita = await ReceitasModel.create(receita);

            if (criarReceita) {
                return res.status(201).json({ msg: `Receita criada com sucesso.`, status: `success`, dados: criarReceita })
            }

            return res.status(400).json({ msg: `Não foi possível salvar a receita.`, status: `error` });

        } catch (error) {
            console.log(error);
            return res.status(500).json({ msg: `Algo deu errado...`, status: `error` })
        }

    }

    // Buscar as últimas receitas publicadas 
    async receitas(req, res) {

        try {

            // Buscando até 10 das ultimas rceeitas inseridas
            const receitas = await ReceitasModel.find().sort({ createdAt: -1 }).limit(5).exec();

            if (receitas) {
                return res.status(200).json({ msg: `OK`, status: `success`, dados: receitas });
            }

            return res.status(404).json({ msg: `Nenhuma receita encontrada.`, status: 'error' });

        } catch (error) {
            console.log(error);
            return res.status(500).json({ msg: `Algo deu errado...`, status: `error` })
        }

    }

    // Buscar uma receita específica pelo ID
    async buscarReceita(req, res) {

        try {

            const idReceita = req.params.id;

            console.log(`teste: ${idReceita}`)

            const receita = await ReceitasModel.findById(idReceita);

            if (receita) {
                return res.status(200).json({ msg: `OK`, status: `success`, dados: receita });
            }

            return res.status(404).json({ msg: `Nenhuma receita foi encontrada.`, status: `error` });

        } catch (error) {
            console.log(error);
            return res.status(500).json({ msg: `Algo deu errado...`, status: `error` })
        }

    }

    // Editar uma receita
    async editarReceita(req, res) {

        try {

            const idReceita = req.params.id

            // Objeto com os dados para editar
            const receita = {
                nome: req.body.nome,
                idCriador: req.body.idCriador,
                ingredientes: req.body.ingredientes,
                modoPreparo: req.body.modoPreparo,
                tempo: req.body.tempo,
            }

            if (!receita.nome) return res.status(400).json({msg: `Campo de nome não preenchido.`, status: `error`});
            if (!receita.idCriador) return res.status(400).json({msg: `É preciso inserir o ID da pessoa que criou a receita`, status: `error`});
            if (!receita.ingredientes) return res.status(400).json({msg: `Campo de ingredientes não preenchido.`, status: `error`});
            if (!receita.modoPreparo) return res.status(400).json({msg: `Campo de modo de preparo não preenchido.`, status: `error`});
            if (!receita.tempo) return res.status(400).json({msg: `Campo de tempo de preparo não preenchido.`, status: `error`});

            const edicao = await ReceitasModel.findByIdAndUpdate(idReceita, receita);

            if (edicao) {
                return res.status(200).json({ msg: `receita editada com sucesso`, status: `success`, dados: edicao });
            }

            return res.status(400).json({ msg: `Não foi possível editar a receita`, status: `error` })

        } catch (error) {
            console.log(error);
            return res.status(500).json({ msg: `Algo deu errado...`, status: `error` })
        }

    }

    // Apagar uma receita específica do usuário
    async apagarReceita(req, res) {

        try {

            const idReceita = req.params.id

            const apagar = await ReceitasModel.findByIdAndDelete(idReceita);

            if (apagar) {

                return res.status(200).json({ msg: `Receita excluída com sucesso.`, status: `success` });

            }

            return res.status(400).json({ msg: `Não foi possível apagar a receita.`, status: `error` });

        } catch (error) {
            console.log(error);
            return res.status(500).json({ msg: `Algo deu errado...`, status: `error` })
        }

    }

    // Apagar todas as receitas do usuário
    async apagarTodasReceitas(req, res) {

        try {

            const id = req.params.id;

            const apagarTudo = await ReceitasModel.deleteMany({ idCriador: id });

            if (apagarTudo.deletedCount > 0) {
                return res.status(200).json({ msg: `Todas as receitas do usuário foram deletadas com sucesso.`, status: 'success' });
            }

            return res.status(404).json({ msg: `Nenhuma receita encontrada para deletar para o usuário especificado.`, status: 'error' });


        } catch (error) {
            console.log(error);
            return res.status(500).json({ msg: `Algo deu errado...`, status: `error` })
        }

    }


}

module.exports = ReceitasController;
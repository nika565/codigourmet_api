const mongoose = require('mongoose');

const { Schema } = mongoose;

// Craindo o model do banco de dados
const receitasSchema = new Schema({

    nome: {
        type: String,
        required: true
    },

    idCriador: {
        type: String,
        required: true
    },

    ingredientes: {
        type: String
    },

    modoPreparo: {
        type: String,
        required: true
    },

    tempo: {
        type: Number,
        required: true
    },

    data: {
        type: String,
        required: true
    }

});

const Receitas = mongoose.model('Receitas', receitasSchema);

module.exports = Receitas;
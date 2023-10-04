// Model para usuários
const mongoose = require('mongoose');

// Para criar a model é nescessário usar o Schema presente no mongoose
const { Schema } = mongoose;

const usuarioSchema = new Schema({

    nome: {
        type: String,
        required: true
    },

    sobrenome: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    senha: {
        type: String,
        required: true,
    }

});

const Usuario = mongoose.model('Usuarios', usuarioSchema);

module.exports = Usuario;
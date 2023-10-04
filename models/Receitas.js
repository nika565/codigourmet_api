const mongoose = require('mongoose');

const { Schema } = mongoose;

// Craindo o model do banco de dados
const receitasSchema = new Schema({

});

const Receitas = mongoose.model('Receitas', receitasSchema);

module.exports = Receitas;
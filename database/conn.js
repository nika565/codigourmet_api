// Usando o dotenv para pegar minha string de conexão
require('dotenv').config();
const stringConn = process.env.stringConn;

// Mongoose para se conectar e realizar as oprações no banco
const mongoose = require('mongoose');

// Função para fazer a conexão com o banco de dados
async function conn() {

    try {

        mongoose.set('strictQuery', true);

        await mongoose.connect(stringConn);

        console.log(`Conectado ao banco de dados`);
        
    } catch (error) {
        console.log(`Erro ao conectar no banco: ${error}`);
    }

}

module.exports = conn;
const bcrypt = require('bcrypt');

// Classe com os métodos de criptografia
class Criptografia {

    // Método para gerar hash da senha
    async senhaCriptografada (senha) {

        try {

            const hash = await bcrypt.hash(senha, 10);

            return hash;
            
        } catch (error) {
            
            console.log(error);
            return false;

        }

    }

    async verificarSenha (senha, hash) {

        try {

            const verificacao = await bcrypt.compare(senha, hash);

            return verificacao;
            
        } catch (error) {
            console.log(error);
            return false
        }

    }

}

module.exports = Criptografia;
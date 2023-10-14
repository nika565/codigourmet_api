const bcrypt = require('bcrypt');

// Classe com os métodos de criptografia
class Criptografia {

    // Método para gerar hash da senha
    async senhaCriptografada (senha) {

        try {

            const salt = await bcrypt.genSalt(12);

            const hash = await bcrypt.hash(senha, salt);

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
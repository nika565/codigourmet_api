// Model para realizar operações no banco.
const UsuarioModel = require('../models/Usuario');

// Classe para validar email
class ValidacaoEmail {

    tamanho(email) {

        if (email.length > 300) return true;

        return false

    }

    validacao(email) {
        // Expressão regular para validar endereços de e-mail
        var regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        // Use o método test() para verificar se o email corresponde à expressão regular
        return regex.test(email);
    }

    async duplicado(email) {

        // Verificando se o email que está sendo cadastrado ja pertence a outra pessoa.
        const emailDuplicado = await UsuarioModel.findOne({email: email});
        
        if (emailDuplicado) return true

        return false

    }

}

module.exports = ValidacaoEmail;
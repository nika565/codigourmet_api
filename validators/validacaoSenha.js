function validarSenha(senha) {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!]).{6,14}$/;
    return regex.test(senha);
}

module.exports = validarSenha;

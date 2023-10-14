function validarNome(nome) {
    const regex = /^[A-Za-z ]+$/;
    return regex.test(nome);
}

module.exports = validarNome;
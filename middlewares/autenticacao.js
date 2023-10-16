const jwt = require('jsonwebtoken');
require('dotenv').config();

function autenticacao(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({ msg: `Acesso negado.`, status: `error` });
    }

    try {
        const secret = process.env.SECRET;

        jwt.verify(token, secret, (err, decoded) => {
            if (err) {
                console.error(err);
                return res.status(401).json({ msg: `Autenticação inválida`, status: `error` });
            } else {
                next();
            }
        });
    } catch (error) {
        console.error(error);
        return res.status(400).json({ msg: `Erro na autenticação`, status: `error` });
    }
}

module.exports = autenticacao;

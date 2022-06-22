const jwt = require('jsonwebtoken');
require('dotenv').config()

function IdUsuarioLogado (req) {
    return new Promise((resolve, rejects) => {
        const token = req.headers.token;

        jwt.verify(token, process.env.SECRET, (erro, decoded)=>{
            if(erro) rejects (erro);
            else resolve (decoded.iduser);
            
        })
    })
}

module.exports = IdUsuarioLogado;
const jwt = require('jsonwebtoken');
require('dotenv').config()
const cookieParser = require('cookie-parser');

function auth(req, res, next){
    const token = req.headers.token;
    if (!token) return res.status(401).json();
    
    jwt.verify(token, process.env.SECRET, (err, decoded) => {
      if (err) return res.status(500).json({ auth: false, mensagem: 'Falha ao tentar autentica o token' });
      
      const iduser = decoded.iduser;
      next();
    });
}

module.exports = auth;
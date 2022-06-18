const bodyParser = require('body-parser');
const usuario = require('./usuarioRoute');
const animal = require('./animalRoute');
const tipoanimal = require('./tipoAnimalRoute');
const tipostatus = require('./tipoStatusRoute');
const tipofinalidade = require('./tipoFinalidadeRoute');
const tipopagamento = require('./tipoPagamentoRoute')
const pagamento = require('./pagamentoRoute')
const cookieParser = require('cookie-parser');
const cors = require("cors");

module.exports = app => {
    app.use(bodyParser.json());
    app.use(cookieParser());
    app.use(cors());
    app.use(usuario);
    app.use(animal);
    app.use(tipoanimal);
    app.use(tipostatus);
    app.use(tipofinalidade);
    app.use(tipopagamento);
    app.use(pagamento);
}
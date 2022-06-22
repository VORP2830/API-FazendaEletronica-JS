const bodyParser = require('body-parser');
const usuario = require('./Usuario/usuarioRoute');
const animal = require('./Animal/animalRoute');
const tipoanimal = require('./Animal/tipoAnimalRoute');
const tipostatus = require('./Status/tipoStatusRoute');
const tipofinalidade = require('./Animal/tipoFinalidadeRoute');
const tipopagamento = require('./Pagamento/tipoPagamentoRoute')
const pagamento = require('./Pagamento/pagamentoRoute')
const cookieParser = require('cookie-parser');
const cors = require("cors");

module.exports = app => {
    app.use(bodyParser.json(),
            cookieParser(),
            cors(),
            usuario,
            animal,
            tipoanimal,
            tipostatus,
            tipofinalidade,
            tipopagamento,
            pagamento);
};
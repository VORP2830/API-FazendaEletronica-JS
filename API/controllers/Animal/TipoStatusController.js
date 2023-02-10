const db = require('../../config/database')

class TipoStatusController {

    static ListarTipoStatus = (req, res) => {
        db.query(`SELECT * FROM TB_Status`, (erro, result) => {
            if (erro) console.log(erro)
            else res.status(200).json(result)
        })
    }
}

module.exports = TipoStatusController;
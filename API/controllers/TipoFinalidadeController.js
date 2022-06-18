const db = require('../config/database')

class TipoFinalidadeController {

    static ListarTipoFinalidade = (req, res) => {
        db.query(`SELECT * FROM TB_Finalidade`, (erro, result) => {
            if (erro) console.log(erro)
            else res.status(200).json(result)
        })
    }
}

module.exports = TipoFinalidadeController;
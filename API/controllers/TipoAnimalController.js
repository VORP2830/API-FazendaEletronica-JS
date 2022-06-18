const db = require('../config/database')

class TipoAnimalController {

    static ListarTipoAnimal = (req, res) => {
        db.query(`SELECT * FROM TB_Tipo_Animal`, (erro, result) => {
            if (erro) console.log(erro)
            else res.status(200).json(result)
        })
    }
}

module.exports = TipoAnimalController;
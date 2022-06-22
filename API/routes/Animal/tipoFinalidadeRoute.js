const { Router } = require('express');
const TipoFinalidadeController = require('../../controllers/TipoFinalidadeController');

const router = Router();

router.get('/tipo/finalidade', TipoFinalidadeController.ListarTipoFinalidade);

module.exports = router;
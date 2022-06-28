const { Router } = require('express');
const TipoFinalidadeController = require('../../controllers/Animal/TipoFinalidadeController');

const router = Router();

router.get('/tipo/finalidade', TipoFinalidadeController.ListarTipoFinalidade);

module.exports = router;
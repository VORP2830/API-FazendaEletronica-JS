const { Router } = require('express');
const TipoStatusController = require('../../controllers/Animal/TipoStatusController');

const router = Router();

router.get('/tipo/status', TipoStatusController.ListarTipoStatus);

module.exports = router;
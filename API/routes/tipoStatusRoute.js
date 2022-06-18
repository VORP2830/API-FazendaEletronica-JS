const { Router } = require('express');
const TipoStatusController = require('../controllers/TipoStatusController');

const router = Router();

router.get('/tipo/status', TipoStatusController.ListarTipoStatus);

module.exports = router;
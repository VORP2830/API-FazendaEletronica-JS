const { Router } = require('express');
const TipoAnimalController = require('../controllers/TipoAnimalController');

const router = Router();

router.get('/tipo/animal', TipoAnimalController.ListarTipoAnimal);

module.exports = router;
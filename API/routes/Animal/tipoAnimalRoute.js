const { Router } = require('express');
const TipoAnimalController = require('../../controllers/Animal/TipoAnimalController');

const router = Router();

router.get('/tipo/animal', TipoAnimalController.ListarTipoAnimal);

module.exports = router;
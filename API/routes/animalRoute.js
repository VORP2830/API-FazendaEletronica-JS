const { Router } = require('express');
const auth = require('../auth/auth');
const AnimalController = require('../controllers/AnimalController');

const router = Router();

router.post('/animal', auth, AnimalController.Adiciona);
router.put('/animal', auth, AnimalController.Atualiza);
router.get('/animal/campo', auth, AnimalController.ListaCampoUsuario);
router.get('/animal/vendido', auth, AnimalController.ListaVendidoUsuario);
router.get('/animal/morto', auth, AnimalController.ListaMortoUsuario);
router.get('/animal/telaprincipal', auth, AnimalController.TelaPrincipal);
router.get('/animal/:id', auth, AnimalController.PegaAnimalId);

module.exports = router;
const { Router } = require('express');
const auth = require('../../auth/auth');
const AnimalController = require('../../controllers/AnimalController');

const router = Router();

router.get('/animal/campo', auth, AnimalController.ListaCampoUsuario);
router.get('/animal/vendido', auth, AnimalController.ListaVendidoUsuario);
router.get('/animal/morto', auth, AnimalController.ListaMortoUsuario);
router.get('/animal/telaprincipal', auth, AnimalController.TelaPrincipal);
router.get('/animal/pai', auth, AnimalController.PegaPai);
router.get('/animal/:id', auth, AnimalController.BuscarId);
router.post('/animal', auth, AnimalController.Adicionar);
router.put('/animal', auth, AnimalController.Atualiza);
router.delete('/animal/:id', auth, AnimalController.DeletaAnimalId);


router.get('/opa/:id', auth, AnimalController.BuscarId);

module.exports = router;
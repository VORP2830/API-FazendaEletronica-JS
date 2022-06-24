const { Router } = require('express');
const auth = require('../../auth/auth');
const { removeListener } = require('../../config/database');
const AnimalController = require('../../controllers/AnimalController');

const router = Router();

router.get('/animal/telaprincipal', auth, AnimalController.TelaPrincipal);
router.get('/animal/campo', auth, AnimalController.ListarCampo);
router.get('/animal/vendido', auth, AnimalController.ListarVendido);
router.get('/animal/morto', auth, AnimalController.ListarMorto);
router.get('/animal/pai', auth, AnimalController.ListarPai);
router.get('/animal/:id', auth, AnimalController.Buscar);
router.post('/animal', auth, AnimalController.Adicionar);
router.put('/animal', auth, AnimalController.Atualizar);
router.delete('/animal/:id', auth, AnimalController.Deletar);

module.exports = router;
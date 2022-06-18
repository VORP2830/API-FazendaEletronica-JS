const { Router } = require('express');
const UsuarioController = require('../controllers/UsuarioController');

const router = Router();

router.post('/usuario/register', UsuarioController.Adiciona);
router.post('/usuario/gerarsenha', UsuarioController.GerarSenha)
router.post('/usuario/login', UsuarioController.Login)

module.exports = router;
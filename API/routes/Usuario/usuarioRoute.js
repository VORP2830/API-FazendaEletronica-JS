const { Router } = require('express');
const UsuarioController = require('../../controllers/Usuario/UsuarioController')
const auth = require('../../auth/auth')

const router = Router();

router.post('/usuario/register', UsuarioController.Adicionar);
router.post('/usuario/login', UsuarioController.Login)
router.post('/usuario/alterarsenha', auth, UsuarioController.AlterSenhaInterno)
router.post('/:token', UsuarioController.AlterarSenhaExterno)
router.post('/usuario/esqueceusenha', UsuarioController.AlterarSenhaEmail)

module.exports = router;
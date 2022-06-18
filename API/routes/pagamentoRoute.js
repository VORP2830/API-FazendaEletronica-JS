const { Router } = require('express');
const PagamentoController = require('../controllers/PagamentoController');
const auth = require('../auth/auth')

const router = Router();

router.get('/pagamento', auth, PagamentoController.PegaPagamento);
router.get('/pagamento/:id', auth, PagamentoController.PegaPagamentoId);
router.get('/pagamento/total/tela', auth, PagamentoController.TelaPagamento);
router.post('/pagamento', auth, PagamentoController.Adiciona);

module.exports = router;
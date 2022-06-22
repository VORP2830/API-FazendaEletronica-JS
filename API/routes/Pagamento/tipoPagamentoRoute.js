const { Router } = require('express');
const auth = require('../../auth/auth');
const TipoPagamentoController = require('../../controllers/TipoPagamentoController');

const router = Router();

router.get('/tipo/pagamento', auth, TipoPagamentoController.PegaTipoPagamento)
router.post('/tipo/pagamento', auth, TipoPagamentoController.Adiciona);
router.put('/tipo/pagamento', auth, TipoPagamentoController.Atualizar)

module.exports = router;
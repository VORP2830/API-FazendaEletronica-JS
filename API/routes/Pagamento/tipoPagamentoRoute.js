const { Router } = require('express');
const auth = require('../../auth/auth');
const TipoPagamentoController = require('../../controllers/TipoPagamento/TipoPagamentoController');

const router = Router();

router.get('/tipo/pagamento', auth, TipoPagamentoController.Listar)
router.get('/tipo/pagamento/:id', auth, TipoPagamentoController.Buscar)
router.post('/tipo/pagamento', auth, TipoPagamentoController.Adicionar);
router.put('/tipo/pagamento/', auth, TipoPagamentoController.Atualizar)
router.delete('/tipo/pagamento/:id', auth, TipoPagamentoController.Deletar)

module.exports = router;
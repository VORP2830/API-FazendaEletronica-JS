const { Router } = require('express');
const PagamentoController = require('../../controllers/Pagamento/PagamentoController');
const auth = require('../../auth/auth')

const router = Router();

router.get('/pagamento', auth, PagamentoController.Listar);
router.get('/pagamento/:id', auth, PagamentoController.Buscar);
router.get('/pagamento/total/tela', auth, PagamentoController.TotalPagamentos);
router.post('/pagamento', auth, PagamentoController.Adicionar);
router.delete('/pagamento/:id', auth, PagamentoController.Deletar);

module.exports = router;
const TipoPagamento = require('../../service/TipoPagamento/ModelTipoPagamento')
const IdUsuarioLogado = require('../../utils/usuarioLogado');

class TipoPagamentoController {

    static async Adicionar (req, res) {
        const { id, nome, descricao } = req.body;
        const tipopagamento = new TipoPagamento({
            id,
            nome,
            descricao,
            id_criador: await IdUsuarioLogado(req),
            ativo

        })
        const result = await TipoPagamento.Adicionar(tipopagamento)
        res.status(result.code).json(result.result)
    }
//Atualizar não esta funcionando
    static async Atualizar (req, res) {
        const { id, nome, descricao, ativo } = req.body;
        const tipopagamento = new TipoPagamento({
            id,
            nome,
            descricao,
            id_criador: await IdUsuarioLogado(req),
            ativo

        })
        const result = await TipoPagamento.Atualizar(tipopagamento)
        res.status(result.code).json(result.result)
    }

    static async Deletar (req, res) {
        const result = await TipoPagamento.Deletar(await IdUsuarioLogado(req), req.params.id) 
        res.status(result.code).json(result.result)
    }

    static async Buscar (req, res) {
        const result = await TipoPagamento.Buscar(await IdUsuarioLogado(req), req.params.id)
        res.status(result.code).json(result.result)
    }

    static async Listar (req, res) {
        const result = await TipoPagamento.Listar(await IdUsuarioLogado(req))
        res.status(result.code).json(result.result)
    }
};

module.exports = TipoPagamentoController;
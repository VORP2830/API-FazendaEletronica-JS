const Pagamento = require('../../service/Pagamento/ModelPagamento')
const IdUsuarioLogado = require('../../utils/usuarioLogado');

class PagamentoController {

    static async Adicionar (req, res) {
        const { id, id_tipo, char_tipo, descricao, data_pagamento, valor_pagamento} = req.body;
        const pagamento = new Pagamento({
            id,
            id_criador: await IdUsuarioLogado(req),
            id_tipo,
            char_tipo,
            descricao,
            data_pagamento,
            valor_pagamento
        })
        const result = await Pagamento.Adicionar(pagamento)
        res.status(result.code).json(result.result)
    }

    static async Atualizar (req, res) {
        const { id, id_tipo, char_tipo, descricao, data_pagamento, valor_pagamento} = req.body;
        const pagamento = new Pagamento({
            id,
            id_criador: await IdUsuarioLogado(req),
            id_tipo,
            char_tipo,
            descricao,
            data_pagamento,
            valor_pagamento
        })
        const result = await Pagamento.Atualizar(await IdUsuarioLogado(req), pagamento)
        res.status(result.code).json(result.result)
    }

    static async Buscar (req, res) {
        const result = await Pagamento.Buscar(await IdUsuarioLogado(req), req.params.id)
        res.status(result.code).json(result.result)
    }

    static async Deletar (req, res) {
        const result = await Pagamento.Deletar(await IdUsuarioLogado(req), req.params.id)
        res.status(result.code).json(result.result)
    }

    static async Listar (req, res) {
        const result = await Pagamento.Listar(await IdUsuarioLogado(req))
        res.status(result.code).json(result.result)
    }

    static async TotalPagamentos (req, res) {
        const result = await Pagamento.TotalPagamentos(await IdUsuarioLogado(req))
        res.status(result.code).json(result.result)
    }
};

module.exports = PagamentoController;
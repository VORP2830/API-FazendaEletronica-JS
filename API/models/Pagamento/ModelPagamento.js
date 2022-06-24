const PagamentoDb = require('./Pagamento-db');

class Pagamento {
    constructor(pagamento) {
        this.id = pagamento.id;
        this.id_criador = pagamento.id_criador,
        this.id_tipo = pagamento.id_tipo,
        this.char_tipo = pagamento.char_tipo,
        this.descricao = pagamento.descricao,
        this.data_pagamento = pagamento.data_pagamento,
        this.valor_pagamento = pagamento.valor_pagamento
    };

    static async Adicionar (pagamento) {
        return await PagamentoDb.Adicionar(pagamento)
    }

    static async Buscar (IdUsuarioLogado, Id) {
        if (await PagamentoDb.TemPermissao(IdUsuarioLogado, Id)){
            return await PagamentoDb.Buscar(Id)
        } else {
            return {code: 401, result: `Você não tem permissão para realizar essa operação`}
        }
    }

    static async Atualizar (IdUsuarioLogado, pagamento) {
        if (await PagamentoDb.TemPermissao(IdUsuarioLogado, pagamento.id)){
            return await PagamentoDb.Atualizar(pagamento)
        } else {
            return {code: 401, result: `Você não tem permissão para realizar essa operação`}
        }
    }

    static async Deletar (IdUsuarioLogado, Id) {
        if (await PagamentoDb.TemPermissao(IdUsuarioLogado, Id)){
            return await PagamentoDb.Deletar(Id)
        } else {
            return {code: 401, result: `Você não tem permissão para realizar essa operação`}
        }
    }

    static async Listar (IdUsuarioLogado) {
        return await PagamentoDb.Listar(IdUsuarioLogado)
    }

    static async TotalPagamentos (IdUsuarioLogado) {
        return await PagamentoDb.TotalPagamentos(IdUsuarioLogado)
    }
}

module.exports = Pagamento;
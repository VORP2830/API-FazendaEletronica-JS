const TipoPagamentoDb = require("./TipoPagamento-db");

class TipoPagamento {
    constructor(tipoPagamento) {
        this.id = tipoPagamento.id,
        this.nome = tipoPagamento.nome,
        this.descricao = tipoPagamento.descricao,
        this.id_criador = tipoPagamento.id_criador,
        this.ativo = tipoPagamento.ativo
    }

    static async Adicionar (tipoPagamento) {
        return await TipoPagamentoDb.Adicionar(tipoPagamento)
    }

    static async Atualizar (IdUsuarioLogado, tipoPagamento) {
        if (await TipoPagamentoDb.TemPermissao(IdUsuarioLogado, tipoPagamento.id)){
            return await AnimalDb.Atualizar(tipoPagamento)
        } else {
            return {code: 401, result: `Você não tem permissão para realizar essa operação`}
        }
    }

    static async Deletar (IdUsuarioLogado, Id) {
        if (await TipoPagamentoDb.TemPermissao(IdUsuarioLogado, Id)){
            return await TipoPagamentoDb.Deletar(Id)
        } else {
            return {code: 401, result: `Você não tem permissão para realizar essa operação`}
        }
    }

    static async Buscar (IdUsuarioLogado, Id) {
        if (await TipoPagamentoDb.TemPermissao(IdUsuarioLogado, Id)){
            return await TipoPagamentoDb.Buscar(Id)
        } else {
           return {code: 401, result: `Você não tem permissão para realizar essa operação`}
        }
    }

    static async Listar (IdUsuarioLogado) {
        return await TipoPagamentoDb.Listar(IdUsuarioLogado)
    }
}

module.exports = TipoPagamento;
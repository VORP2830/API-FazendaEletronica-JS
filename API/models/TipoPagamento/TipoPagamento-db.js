const { rejects } = require('assert');
const { resolveObjectURL } = require('buffer');
const { resolve } = require('path');
const { promise, resume } = require('../../config/database');
const db = require('../../config/database');


 module.exports = {

    Adicionar: TipoPagamento => {
        return new Promise((resolve, rejects) => {
            db.query(`INSERT INTO TB_Tipo_Pagamento (TXT_NOME, TXT_DESCRICAO, ID_INT_USUARIO_CRIADOR, BIT_ATIVO) VALUES (?,?,?,1)`, 
            [TipoPagamento.nome, TipoPagamento.descricao, TipoPagamento.id_criador],
            erro => {
                if (erro) rejects({code: 500, result: `Erro ao adicionar tipo de pagamento`})
                else resolve ({code: 201 ,mensagem: `Tipo de pagamento adicionado`})
            })
        })
    },

    Atualizar: TipoPagamento => {
        return new Promise((resolve, rejects) => {
            db.query(`UPDATE TB_Tipo_Pagamento SET TXT_NOME = ?, TXT_DESCRICAO = ?, BIT_ATIVO = ? WHERE ID_INT_TIPO_PAGAMENTO = ?`,
                [TipoPagamento.nome, TipoPagamento.descricao, TipoPagamento.ativo, TipoPagamento.id], erro => {
                    if (erro) rejects({code: 500, result: `Erro ao atualizar tipo de pagamento`})
                    else resolve({code: 500, result: `Adicionar tipo de pagamento`})
                })
        })
    },

    Buscar: id => {
        return new Promise((resolve, rejects) => {
            db.query(`SELECT * FROM TB_Tipo_Pagamento WHERE ID_INT_TIPO_PAGAMENTO = ?`, 
            [id], (erro, result) => {
                if (erro) rejects({code: 500, result: `Tipo de pagamento inexistente`});
                else resolve({code: 200, result: result});
            })
        })
    },

    Deletar: id => {
        return new Promise((resolve, rejects) => {
            db.query(`UPDATE TB_Tipo_Pagamento SET BIT_ATIVO = 0 WHERE ID_INT_TIPO_PAGAMENTO = ?`,
                [id], erro => {
                    if (erro) rejects({code: 500, result: `Erro ao deletar tipo de pagamento`})
                    else resolve({code: 200, result: `Tipo de pagamento deletado`})
                })
        })
    },

    Listar: IdUsuarioLogado => {
        return new Promise((resolve, rejects) => {
            db.query(`SELECT * FROM TB_Tipo_Pagamento WHERE ID_INT_USUARIO_CRIADOR = ? AND BIT_ATIVO = 1`, 
            [IdUsuarioLogado], (erro, result) => {
                if (erro) rejects({code: 500, result: `Não existem pagameentos a serem listados`});
                else resolve({code: 200, result: result});
            })
        })
    },

    TemPermissao: (IdUsuarioLogado, TipoPagamentoId) => {
        return new Promise((resolve, rejects) => {
            db.query(`SELECT ID_INT_USUARIO_CRIADOR FROM TB_Tipo_Pagamento WHERE ID_INT_TIPO_PAGAMENTO = ?`, [TipoPagamentoId], 
            (erro, result) => {
                if (erro) rejects (erro)
                else{
                    if(result.length == 1){
                        if (result[0].ID_INT_USUARIO_CRIADOR == IdUsuarioLogado){
                            resolve (true);
                        }else {
                            resolve (false);
                        }
                    }else{
                        resolve (false);
                    }
                }
            })
        })
    }
 }


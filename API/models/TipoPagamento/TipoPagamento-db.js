const { rejects } = require('assert');
const { resolve } = require('path');
const { promise, resume } = require('../../config/database');
const db = require('../../config/database');


 module.exports = {

    Insert: TipoPagamento => {
        return new Promise((resolve, rejects) => {
            db.query(`INSERT INTO TB_Tipo_Pagamento (TXT_NOME, TXT_DESCRICAO, ID_INT_USUARIO_CRIADOR) VALUES (?,?,?)`, 
            [TipoPagamento.nome, TipoPagamento.descricao, TipoPagamento.id_criador],
            erro => {
                if (erro) console.log(erro)
                else return {code: 201 ,mensagem: `Tipo de pagamento adicionado`}
            })
        })
    },

    Update: TipoPagamento => {
        return new Promise((resolve, rejects) => {
            db.query(`UPDATE TB_Tipo_Pagamento SET TXT_NOME = ?, TXT_DESCRICAO = ? WHERE ID_INT_TIPO_PAGAMENTO = ?`,
                [TipoPagamento.nome, TipoPagamento.descricao, TipoPagamento.id], erro => {
                    if (erro) console.log(erro)
                    else return `Tipo de pagamento alterado`
                })
        })
    },

    BuscaId: id => {
        return new Promise((resolve, rejects) => {
            db.query(`SELECT * FROM TB_Tipo_Pagamento WHERE ID_INT_TIPO_PAGAMENTO = ?`, 
            [id], (erro, result) => {
                if (erro) rejects("Tipo de pagamento inexistente");
                else resolve(result);
            })
        })
    }
 }


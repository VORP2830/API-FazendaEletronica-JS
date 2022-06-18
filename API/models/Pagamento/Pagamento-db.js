const { rejects } = require('assert');
const { resolve } = require('path');
const { promise, resume } = require('../../config/database');
const db = require('../../config/database');


 module.exports = {

    Insert: Pagamento => {
        return new Promise((resolve, rejects) => {
            db.query(`INSERT INTO TB_Pagamento
            (ID_INT_USUARIO_CRIADOR, ID_INT_TIPO_PAGAMENTO ,CHAR_TIPO_ENTRADA_SAIDA,TXT_DESCRICAO,DAT_PAGAMENTO,VLR_PAGAMENTO)
            VALUES(?,?,?,?,?,?)`, 
            [Pagamento.id_criador, Pagamento.id_tipo, Pagamento.char_tipo, Pagamento.descricao, Pagamento.data_pagamento,Pagamento.valor_pagamento],
            erro => {
                if (erro) console.log(erro)
                else return `Pagamento adicionado`
            })
        })
    },

    Update: Pagamento => {
        return new Promise((resolve, rejects) => {
            db.query(`UPDATE TB_Pagamento
                SET ID_INT_TIPO_PAGAMENTO = ?, CHAR_TIPO_ENTRADA_SAIDA = ?, 
                TXT_DESCRICAO = ?, DAT_PAGAMENTO = ?, VLR_PAGAMENTO = ?
                WHERE ID_INT_PAGAMENTO = ?`,
                [Pagamento.id_tipo, Pagamento.char_tipo, Pagamento.descricao, Pagamento.data_pagamento, 
                Pagamento.valor_pagamento, Pagamento.id], erro => {
                    if (erro) console.log(erro)
                    else return `Pagamento alterado`
                })
        })
    },

    BuscaId: id => {
        return new Promise((resolve, rejects) => {
            db.query(`SELECT * FROM TB_Pagamento WHERE ID_INT_PAGAMENTO = ?`, 
            [id], (erro, result) => {
                if (erro) rejects("Pagamento inexistente");
                else resolve(result);
            })
        })
    }
 }


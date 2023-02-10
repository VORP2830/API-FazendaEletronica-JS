const db = require('../../config/database');


 module.exports = {

    Adicionar: Pagamento => {
        return new Promise((resolve, rejects) => {
            db.query(`INSERT INTO TB_Pagamento
            (ID_INT_USUARIO_CRIADOR, ID_INT_TIPO_PAGAMENTO ,CHAR_TIPO_ENTRADA_SAIDA,TXT_DESCRICAO,DAT_PAGAMENTO,VLR_PAGAMENTO)
            VALUES(?,?,?,?,?,?)`, 
            [Pagamento.id_criador, Pagamento.id_tipo, Pagamento.char_tipo, Pagamento.descricao, Pagamento.data_pagamento,Pagamento.valor_pagamento],
            erro => {
                if (erro) rejects({code: 500, error: `Erro ao inserir pagamento`})
                else resolve({code: 201, result: `Pagamento adicionado`})
            })
        })
    },

    Atualizar: Pagamento => {
        return new Promise((resolve, rejects) => {
            db.query(`UPDATE TB_Pagamento
                SET ID_INT_TIPO_PAGAMENTO = ?, CHAR_TIPO_ENTRADA_SAIDA = ?, 
                TXT_DESCRICAO = ?, DAT_PAGAMENTO = ?, VLR_PAGAMENTO = ?
                WHERE ID_INT_PAGAMENTO = ?`,
                [Pagamento.id_tipo, Pagamento.char_tipo, Pagamento.descricao, Pagamento.data_pagamento, 
                Pagamento.valor_pagamento, Pagamento.id], erro => {
                    if (erro) rejects({code: 500, error: `Erro ao atualizar pagamento`})
                    else resolve ({code: 200, result: `Pagamento alterado`})
                })
        })
    },

    Buscar: id => {
        return new Promise((resolve, rejects) => {
            db.query(`SELECT * FROM TB_Pagamento WHERE ID_INT_PAGAMENTO = ?`, 
            [id], (erro, result) => {
                if (erro) rejects({code: 500, error: "Pagamento inexistente"});
                else resolve({code: 200, result: result});
            })
        })
    },

    Deletar: id => {
        return new Promise((resolve, rejects) => {
            db.query(`DELETE FROM TB_Pagamento WHERE ID_INT_PAGAMENTO = ?`,[id], (erro) => {
                if (erro) rejects({code: 500, error: "Erro ao excluir pagamento"});
                else resolve({code: 200, result: "Pagamento excluido"})
            })
        })
    },

    Listar: IdUsuarioLogado => {
        return new Promise((resolve, rejects) => {
            db.query(`SELECT * FROM TB_Pagamento WHERE ID_INT_USUARIO_CRIADOR = ?`, 
            [IdUsuarioLogado], (erro, result) => {
                if (erro) rejects({code: 500, error: "Não existem pagamentos cadastrados"});
                else resolve ({code: 200, result: result});
            })
        })
    },

    TotalPagamentos: IdUsuarioLogado => {
        return new Promise((resolve, rejects) => {
            db.query(`SELECT CHAR_TIPO_ENTRADA_SAIDA, SUM(VLR_PAGAMENTO) AS TOTAL_CALCULADO
                        FROM FazendaEletronica.TB_Pagamento 
                        WHERE ID_INT_USUARIO_CRIADOR = ? AND 
                        YEAR(DAT_PAGAMENTO ) = YEAR(NOW()) AND MONTH(DAT_PAGAMENTO) = MONTH(NOW())
                        GROUP BY CHAR_TIPO_ENTRADA_SAIDA`, [IdUsuarioLogado], (erro, result) => {
                if (erro) rejects({code: 500, error: `Erro ao pegar pagamentos`})
                else resolve({code: 200, result: result})
            })
        })
    },

    TemPermissao: (IdUsuarioLogado, PagamentoId) => {
        return new Promise((resolve, rejects) => {
            db.query(`SELECT ID_INT_USUARIO_CRIADOR FROM TB_Pagamento WHERE ID_INT_PAGAMENTO = ?`, [PagamentoId], 
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


const Pagamento = require('../models/Pagamento/ModelPagamento')
const db = require('../config/database')
const jwt = require('jsonwebtoken')

class PagamentoController {

    static async Adiciona (req, res) {
        const tokenn = req.headers.token;
        jwt.verify(tokenn, process.env.SECRET, (erro, decoded)=>{
           var iduser = decoded.iduser

        const { id, id_tipo, char_tipo, descricao, data_pagamento, valor_pagamento} = req.body;
            const pagamento = new Pagamento({
                id,
                id_criador: iduser,
                id_tipo,
                char_tipo,
                descricao,
                data_pagamento,
                valor_pagamento
            })
            db.query(`INSERT INTO TB_Pagamento
            (ID_INT_USUARIO_CRIADOR, ID_INT_TIPO_PAGAMENTO ,CHAR_TIPO_ENTRADA_SAIDA,TXT_DESCRICAO,DAT_PAGAMENTO,VLR_PAGAMENTO)
            VALUES(?,?,?,?,?,?)`, 
            [pagamento.id_criador, pagamento.id_tipo, pagamento.char_tipo, pagamento.descricao, pagamento.data_pagamento,pagamento.valor_pagamento],
            erro => {
                if (erro) res.status(500).json(erro)
                else res.status(201).json({mensagem: `Pagamento adicionado`})
            })
        })
    }

    static async PegaPagamento (req, res) {
        const tokenn = req.headers.token;
        jwt.verify(tokenn, process.env.SECRET, (erro, decoded)=>{
           var iduser = decoded.iduser

            db.query(`SELECT P.ID_INT_PAGAMENTO, TP.TXT_NOME, P.CHAR_TIPO_ENTRADA_SAIDA, P.TXT_DESCRICAO, 
            P.VLR_PAGAMENTO, P.DAT_PAGAMENTO FROM TB_Pagamento P
            JOIN TB_Tipo_Pagamento TP ON P.ID_INT_PAGAMENTO = TP.ID_INT_TIPO_PAGAMENTO WHERE P.ID_INT_USUARIO_CRIADOR = ?`,[iduser], 
            (erro, result) => { 
                if(erro) res.status(500).json(erro);
                else res.status(200).json(result);
            })
        })
    }

    static async TelaPagamento (req, res) {
        const tokenn = req.headers.token;
        jwt.verify(tokenn, process.env.SECRET, (erro, decoded)=>{
           var iduser = decoded.iduser

            db.query(`SELECT CHAR_TIPO_ENTRADA_SAIDA, SUM(VLR_PAGAMENTO) AS TOTAL_CALCULADO
            FROM FazendaEletronica.TB_Pagamento WHERE ID_INT_USUARIO_CRIADOR = ?
            GROUP BY CHAR_TIPO_ENTRADA_SAIDA`,[iduser], 
            (erro, result) => { 
                if(erro) res.status(500).json(erro);
                else res.status(200).json(result);
            })
        })
    }

    static async PegaPagamentoId (req, res) {
        const id = req.params.id
        const tokenn = req.headers.token;
        jwt.verify(tokenn, process.env.SECRET, (erro, decoded)=>{
           var iduser = decoded.iduser
                db.query(`SELECT P.ID_INT_PAGAMENTO, P.ID_INT_USUARIO_CRIADOR, TP.TXT_NOME, P.CHAR_TIPO_ENTRADA_SAIDA, P.TXT_DESCRICAO, 
                P.VLR_PAGAMENTO, P.DAT_PAGAMENTO FROM TB_Pagamento P
                JOIN TB_Tipo_Pagamento TP ON P.ID_INT_PAGAMENTO = TP.ID_INT_TIPO_PAGAMENTO WHERE P.ID_INT_PAGAMENTO = ?`,[id], 
                (erro, result) => { 
                    if(erro) res.status(500).json(erro);
                    else{
                        if(result.length>0){
                            if(result[0].ID_INT_USUARIO_CRIADOR == iduser){
                            res.status(200).json(result)
                        }else{
                            res.status(401).json({mensagem: "Você não tem autorização para realizar essa ação"})
                        }
                    }
                }
            })
        })
    }

    static async DeletaPagamentoId (req, res) {
        const id = req.params.id
        const tokenn = req.headers.token;
        jwt.verify(tokenn, process.env.SECRET, (erro, decoded)=>{
           var iduser = decoded.iduser
                db.query(`SELECT * FROM TB_Pagamento WHERE ID_INT_PAGAMENTO = ?`,[id], 
                (erro, result) => { 
                    if(erro) res.status(500).json(erro);
                    else{
                        if(result.length>0){
                            if(result[0].ID_INT_USUARIO_CRIADOR == iduser){
                            db.query(`DELETE FROM TB_Pagamento WHERE ID_INT_PAGAMENTO = ?`,[id], (erro) => {
                                if(erro) res.status(500).json({mensagem: erro})
                                else res.status(200).json({mensagem: "Pagamento deletado com sucesso"})
                            })
                        }else{
                            res.status(401).json({mensagem: "Você não tem autorização para realizar essa ação"})
                        }
                    }
                }
            })
        })
    }
};

module.exports = PagamentoController;
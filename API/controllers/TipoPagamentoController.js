const TipoPagamento = require('../models/ModelTipoPagamento')
const db = require('../config/database');
const jwt = require('jsonwebtoken');

class TipoPagamentoController {

    static async Adiciona (req, res) {
        const tokenn = req.headers.token;
        jwt.verify(tokenn, process.env.SECRET, (erro, decoded)=>{
           var iduser = decoded.iduser

        const { id, nome, descricao } = req.body;
            const tipopagamento = new TipoPagamento({
                id,
                nome,
                descricao,
                id_criador: iduser

            })
            db.query(`INSERT INTO TB_Tipo_Pagamento (TXT_NOME, TXT_DESCRICAO, ID_INT_USUARIO_CRIADOR) VALUES (?,?,?)`, 
            [tipopagamento.nome, tipopagamento.descricao, tipopagamento.id_criador], (erro) => {
                if(erro) res.status(500).json(erro)
                else res.status(201).json({mensagem: "Tipo de pagamento adicionado"})
            })
        })

    };

    static async PegaTipoPagamento (req, res) {
        const tokenn = req.headers.token;
        jwt.verify(tokenn, process.env.SECRET, (erro, decoded)=>{
           var iduser = decoded.iduser

           db.query(`SELECT * FROM TB_Tipo_Pagamento WHERE ID_INT_USUARIO_CRIADOR = ?`, [iduser], (erro, result) => {
            if(erro) res.status(500).json(erro);
            else res.status(200).json(result);
           })
        })
    }

    static async Atualizar (req, res) {
        const tokenn = req.headers.token;
        jwt.verify(tokenn, process.env.SECRET, (erro, decoded)=>{
           var iduser = decoded.iduser

        const { id, nome, descricao } = req.body;
            const tipopagamento = new TipoPagamento({
                id,
                nome,
                descricao,
                id_criador: iduser

            })

            db.query(`SELECT * FROM TB_Tipo_Pagamento WHERE ID_INT_TIPO_PAGAMENTO = ?`, [id], (erro, result) => {
                if(erro) res.status(500).json(erro)
                else if (result.length == 1){
                    var SelectCriador = result[0].ID_INT_USUARIO_CRIADOR;
                    if(SelectCriador == iduser){
                        db.query(`UPDATE TB_Tipo_Pagamento SET TXT_NOME = ?, TXT_DESCRICAO = ? WHERE ID_INT_TIPO_PAGAMENTO = ?`, 
                        [tipopagamento.nome, tipopagamento.descricao, tipopagamento.id], (erro) => {
                            if(erro) res.status(500).json(erro)
                            else res.status(201).json({mensagem: "Tipo de pagamento atualizado"})
                        })
                    }else{
                        res.status(401).json({mensagem: "Você não tem autorizaçao para realizar essa operação"})
                    }
                }else{
                    res.status(500).json({mensagem: "Algo de errado aconteceu"})
                }
            })
        })
    }
};

module.exports = TipoPagamentoController;
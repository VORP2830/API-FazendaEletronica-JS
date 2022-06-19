const Animal = require('../models/ModelAnimal')
const db = require('../config/database')
const jwt = require('jsonwebtoken');

class animalController {

    static async Adiciona (req, res) {
        const { numero, id_pai, cha_sexo, id_finalidade, apelido, nascimento, status, tipo_animal } = req.body;

        const tokenn = req.headers.token;
        jwt.verify(tokenn, process.env.SECRET, (erro, decoded)=>{
           var iduser = decoded.iduser

            const animal = new Animal({
                id_criador: iduser,
                numero,
                id_pai,
                cha_sexo,
                id_finalidade,
                apelido,
                nascimento,
                status,
                tipo_animal
            })

            db.query(`INSERT INTO TB_Animal (ID_INT_USUARIO_CRIADOR, INT_NUMERO_ANIMAL, ID_INT_PAI, 
            CHA_SEXO, ID_INT_FINALIDADE, TXT_APELIDO, DAT_NASCIMENTO, ID_INT_STATUS, ID_INT_TIPO_ANIMAL, DAT_MODIFICACAO)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())`,
            [animal.id_criador, animal.numero, animal.id_pai, animal.cha_sexo, animal.id_finalidade, 
            animal.apelido, animal.nascimento, animal.status, animal.tipo_animal], erro => {
            if (erro) res.status(500).json(erro);
            else res.status(200).json({mansagem: "Animal cadastrado com sucesso"});
            })
        })

    };

    static async ListaCampoUsuario (req, res) {
        const tokenn = req.headers.token;
        jwt.verify(tokenn, process.env.SECRET, (erro, decoded)=>{
           var iduser = decoded.iduser

        db.query(`SELECT A.ID_INT_ANIMAL, A.INT_NUMERO_ANIMAL, A.ID_INT_PAI, A.CHA_SEXO, 
        F.TXT_NOME, A.TXT_APELIDO, A.DAT_NASCIMENTO, S.TXT_STATUS, TA.TXT_NOME FROM TB_Animal A
        JOIN TB_Finalidade F on A.ID_INT_FINALIDADE = F.ID_INT_FINALIDADE
        JOIN TB_Status S ON S.ID_INT_STATUS = A.ID_INT_STATUS
        JOIN TB_Tipo_Animal TA ON TA.ID_INT_TIPO_ANIMAL = A.ID_INT_TIPO_ANIMAL
        WHERE A.ID_INT_USUARIO_CRIADOR = ? AND A.ID_INT_STATUS = 2`,[iduser], (erro, result) => {
            if(erro) res.status(500).json(erro);
            else res.status(200).json(result);
        })
    })
    }

    static async ListaVendidoUsuario (req, res) {
        const tokenn = req.headers.token;
        jwt.verify(tokenn, process.env.SECRET, (erro, decoded)=>{
           var iduser = decoded.iduser

        db.query(`SELECT A.ID_INT_ANIMAL, A.INT_NUMERO_ANIMAL, A.ID_INT_PAI, A.CHA_SEXO, 
        F.TXT_NOME, A.TXT_APELIDO, A.DAT_NASCIMENTO, S.TXT_STATUS, TA.TXT_NOME FROM TB_Animal A
        JOIN TB_Finalidade F on A.ID_INT_FINALIDADE = F.ID_INT_FINALIDADE
        JOIN TB_Status S ON S.ID_INT_STATUS = A.ID_INT_STATUS
        JOIN TB_Tipo_Animal TA ON TA.ID_INT_TIPO_ANIMAL = A.ID_INT_TIPO_ANIMAL
        WHERE A.ID_INT_USUARIO_CRIADOR = ? AND A.ID_INT_STATUS = 1`,[iduser], (erro, result) => {
            if(erro) res.status(500).json(erro);
            else res.status(200).json(result);
        })
    })
    }

    static async ListaMortoUsuario (req, res) {
        const tokenn = req.headers.token;
        jwt.verify(tokenn, process.env.SECRET, (erro, decoded)=>{
           var iduser = decoded.iduser

        db.query(`SELECT A.ID_INT_ANIMAL, A.INT_NUMERO_ANIMAL, A.ID_INT_PAI, A.CHA_SEXO, 
        F.TXT_NOME, A.TXT_APELIDO, A.DAT_NASCIMENTO, S.TXT_STATUS, TA.TXT_NOME FROM TB_Animal A
        JOIN TB_Finalidade F on A.ID_INT_FINALIDADE = F.ID_INT_FINALIDADE
        JOIN TB_Status S ON S.ID_INT_STATUS = A.ID_INT_STATUS
        JOIN TB_Tipo_Animal TA ON TA.ID_INT_TIPO_ANIMAL = A.ID_INT_TIPO_ANIMAL
        WHERE A.ID_INT_USUARIO_CRIADOR = ? AND A.ID_INT_STATUS = 3`,[iduser], (erro, result) => {
            if(erro) res.status(500).json(erro);
            else res.status(200).json(result);
        })
    })
    }

    static async TelaPrincipal (req, res) {
        const tokenn = req.headers.token;
        jwt.verify(tokenn, process.env.SECRET, (erro, decoded)=>{
           var iduser = decoded.iduser

        db.query(`SELECT S.TXT_STATUS, COUNT(*) AS TOTAL FROM TB_Animal A
        JOIN TB_Finalidade F on A.ID_INT_FINALIDADE = F.ID_INT_FINALIDADE
        JOIN TB_Status S ON S.ID_INT_STATUS = A.ID_INT_STATUS
        JOIN TB_Tipo_Animal TA ON TA.ID_INT_TIPO_ANIMAL = A.ID_INT_TIPO_ANIMAL
        WHERE A.ID_INT_USUARIO_CRIADOR = ?
        GROUP BY S.ID_INT_STATUS`,[iduser], (erro, result) => {
            if(erro) res.status(500).json(erro);
            else res.status(200).json(result);
        })
    })
    }

    static async Atualiza (req, res) {
        const { id_animal, numero, id_pai, cha_sexo, id_finalidade, apelido, nascimento, status, tipo_animal } = req.body;

        const tokenn = req.headers.token;
        jwt.verify(tokenn, process.env.SECRET, (erro, decoded)=>{
           var iduser = decoded.iduser

            const animal = new Animal({
                id_animal,
                numero,
                id_pai,
                cha_sexo,
                id_finalidade,
                apelido,
                nascimento,
                status,
                tipo_animal
            })
        db.query(`SELECT * FROM TB_Animal WHERE ID_INT_ANIMAL = ?`, [id_animal], (erro, result) => {
            if(erro) res.status(500).json(erro)
            else if(result.length == 0){
                res.status(303).json({mensagem: "Animal inexistente"})
            }else{
                if(iduser == result[0].ID_INT_USUARIO_CRIADOR){
                    db.query(`UPDATE TB_Animal SET INT_NUMERO_ANIMAL = ?, ID_INT_PAI = ?, CHA_SEXO = ?,
                    ID_INT_FINALIDADE = ?, TXT_APELIDO = ?, DAT_NASCIMENTO = ?,
                    ID_INT_STATUS = ?, ID_INT_TIPO_ANIMAL = ?, DAT_MODIFICACAO = NOW()
                    WHERE ID_INT_ANIMAL = ?`[animal.numero, animal.id_pai, animal.cha_sexo, animal.id_finalidade, animal.apelido, animal.nascimento,
                    animal.status, animal.tipo_animal,id_animal], (erro) => {
                        if(erro) res.status(500).json({erro})
                        else res.status(200).json({mensagem: "Animal alterado"})
                    })
                }
            }
        })

        })
    }

    static async PegaAnimalId (req, res) {
        const tokenn = req.headers.token;
        jwt.verify(tokenn, process.env.SECRET, (erro, decoded)=>{
           var iduser = decoded.iduser
            db.query(`SELECT * FROM TB_Animal WHERE ID_INT_ANIMAL = ?`, [req.params.id], (erro, result) => {
                if (erro) res.status(500).json(erro)
                else{
                    if(iduser == result[0].ID_INT_USUARIO_CRIADOR){
                        res.status(200).json(result)
                    }else{
                        res.status(401).json({mansagem: "Você não possui acesso"})
                    }
                }
            })
        })
    }

    static async PegaPai (req, res) {
        const tokenn = req.headers.token;
        jwt.verify(tokenn, process.env.SECRET, (erro, decoded)=>{
           var iduser = decoded.iduser
            db.query(`SELECT ID_INT_ANIMAL, INT_NUMERO_ANIMAL FROM TB_Animal WHERE ID_INT_USUARIO_CRIADOR = ? AND CHA_SEXO = "F" `, [iduser], (erro, result) => {
                if (erro) res.status(500).json(erro)
                else res.status(200).json(result)
                })
        })
    }
};

module.exports = animalController;
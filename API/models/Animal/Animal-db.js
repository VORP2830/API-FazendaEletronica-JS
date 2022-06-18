const { rejects } = require('assert');
const { resolve } = require('path');
const { promise, resume } = require('../../config/database');
const db = require('../../config/database');


 module.exports = {

    Insert: Animal => {
        return new Promise((resolve, rejects) => {
            db.query(`
            INSERT INTO TB_Animal
            (ID_INT_USUARIO_CRIADOR, INT_NUMERO_ANIMAL, ID_INT_PAI, CHA_SEXO, ID_INT_FINALIDADE, TXT_APELIDO, DAT_NASICMENTO, ID_INT_STATUS, ID_INT_TIPO_ANIMAL)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [Animal.id_criador, Animal.numero, Animal.id_pai, Animal.cha_sexo, Animal.id_finalidade, Animal.apelido, Animal.nascimento, Animal.status, Animal.tipo_animal], erro => {
                if (erro) return erro;
                else return {code: 201, mensagem: "Animal cadastrado com sucesso"};
            })
        })
    },

    BuscaId: id => {
        return new Promise((resolve, rejects) => {
            db.query(`SELECT * FROM TB_Animal WHERE ID_INT_ANIMAL = ?`, 
            [id], (erro, result) => {
                if (erro) rejects("Animal inexistente");
                else return {code: 200, result: result};
            })
        })
    }
 }


const { rejects } = require('assert');
const { resolve } = require('path');
const { promise, resume } = require('../../config/database');
const db = require('../../config/database');


 module.exports = {

    Insert: Usuario => {
        return new Promise((resolve, rejects) => {
            db.query(`INSERT INTO TB_Usuario (TXT_LOGIN, TXT_PASSWORD, TXT_NOME, TXT_EMAIL) VALUES (?, ?, ?, ?)`,
            [Usuario.login, Usuario.password, Usuario.nome, Usuario.email], erro => {
                if (erro) console.log(erro);
                else return resolve("Usuario adicionado com sucesso");
            })
        })
    },
    
    UpdateSenha: Usuario => {
        return new Promise((resolve, rejects) => {
            db.query(`UPDATE TB_Usuario SET TXT_PASSWORD = ? WHERE ID_INT_USUARIO = ?`, 
            [Usuario.password, Usuario.id], (erro) => {
                if (erro) rejects("Erro ao alterar senha");
                else return resolve("Senha alterada com sucesso");
            })
        })
    },

    BuscaId: id => {
        return new Promise((resolve, rejects) => {
            db.query(`SELECT * FROM TB_Usuario WHERE ID_INT_USUARIO = ?`, 
            [id], (erro, result) => {
                if (erro) rejects("Usuario inexistente");
                else resolve(result);
            })
        })
    },

    BuscarEmail: email => {
        return new Promise((resolve, rejects) => {
            db.query(`SELECT * FROM TB_Usuario WHERE TXT_EMAIL = ?`,
            [email], (erro, result) => {
                if (erro) rejects("Usuario inexistente");
                else resolve(result);
            })
        })
    },

    BuscarLogin: login => {
        return new Promise((resolve, rejects) => {
            db.query(`SELECT * FROM TB_Usuario WHERE TXT_LOGIN = ?`,
            [login], (erro, result) => {
                if (erro) rejects("Usuario inexistente");
                else resolve(result);
            })
        })
    }
 }


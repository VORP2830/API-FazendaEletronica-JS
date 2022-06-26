const { rejects } = require('assert');
const { userInfo } = require('os');
const { resolve } = require('path');
const { promise, resume } = require('../../config/database');
const db = require('../../config/database');


 module.exports = {

    Adicionar: Usuario => {
        console.log(Usuario.login)
        console.log(Usuario.email)
        return new Promise((resolve, rejects) => {
            db.query(`INSERT INTO TB_Usuario (TXT_LOGIN, TXT_PASSWORD, TXT_NOME, TXT_EMAIL) VALUES (?, ?, ?, ?)`,
            [Usuario.login, Usuario.password, Usuario.nome, Usuario.email], erro => {
                if (erro) rejects({code: 500, result: result});
                else return resolve({code: 200, result: "Usuario adicionado com sucesso"});
            })
        })
    },
    
    AlterarSenha: Usuario => {
        return new Promise((resolve, rejects) => {
            db.query(`UPDATE TB_Usuario SET TXT_PASSWORD = ? WHERE ID_INT_USUARIO = ?`, 
            [Usuario.password, Usuario.id], (erro) => {
                if (erro) rejects({code: 500, result: "Erro ao alterar senha"});
                else return resolve({code: 200, result: "Senha alterada com sucesso"});
            })
        })
    },

    Buscar: id => {
        return new Promise((resolve, rejects) => {
            db.query(`SELECT * FROM TB_Usuario WHERE ID_INT_USUARIO = ?`, 
            [id], (erro, result) => {
                if (erro) rejects({code: 500, result: "Erro ao buscar usuario"})
                else resolve({code: 200, result: result});
            })
        })
    },

    BuscarEmail: email => {
        return new Promise((resolve, rejects) => {
            db.query(`SELECT * FROM TB_Usuario WHERE TXT_EMAIL = ?`,
            [email], (erro, result) => {
                if (erro) rejects({code: 500, result: "Erro ao buscar email"});
                else resolve({code: 200, result: result});
            })
        })
    },

    BuscarLogin: login => {
        return new Promise((resolve, rejects) => {
            db.query(`SELECT * FROM TB_Usuario WHERE TXT_LOGIN = ?`,
            [login], (erro, result) => {
                if (erro) rejects({code: 500, result: "Erro ao buscar login"});
                else resolve({code: 200, result: result});
            })
        })
    }
 }


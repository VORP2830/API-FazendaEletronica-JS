const Usuario = require('../models/ModelUsuario')
const EnviarEmail = require('../config/email')
const { hash, compare } = require('bcrypt');
require('dotenv').config()
const db = require('../config/database');
const jwt = require('jsonwebtoken');

class UsuarioController {

    static async Adiciona (req, res) {
        const { login, password, nome, email } = req.body;

            const hashPassword = await hash(password, 10);
            const usuario = new Usuario({
                login,
                password: hashPassword,
                nome,
                email
            })
            db.query(`SELECT * FROM TB_Usuario WHERE TXT_LOGIN = '${usuario.login}'`, (erro, result) => {
                if(erro) console.log(erro);
                else{
                    if(result.length>0){
                        res.status(303).json({mensagem: "Login já está em uso"});
                    }else{
                        db.query(`SELECT * FROM TB_Usuario WHERE TXT_EMAIL = '${usuario.email}'`, (erro, result) => {
                            if(result.length>0){
                                res.status(303).json({mensagem: "Email já está em uso"});
                            }else if (result.length == 0){
                                db.query(`INSERT INTO TB_Usuario (TXT_LOGIN, TXT_PASSWORD, TXT_NOME, TXT_EMAIL) VALUES (?, ?, ?, ?)`,
                                [usuario.login, usuario.password, usuario.nome, usuario.email], erro => {
                                    if (erro) console.log(erro);
                                    else res.status(201).json({mensagem: "Usuario adicionado com sucesso"});
                                })
                            }else{
                                res.status(500).json({mensagem: "Algo deu errado"})
                            }
                        })
                    }
                }
            })
    };

    static async Login (req, res) {
        const { login, password } = req.body;

        if(login || password){
            db.query(`SELECT * FROM TB_Usuario WHERE TXT_LOGIN = ?`, [login], (erro, result) => {
                if(erro) res.status(500).json(erro)
                else if(result.length == 0){
                    res.status(303).json({mensagem: "Login ou senha incorreto"})
                }else{
                    var SelectPassword = result[0].TXT_PASSWORD;
                    var iduser = result[0].ID_INT_USUARIO;
                    var nome = result[0].TXT_NOME;

                    if(result.length>0){
                        compare(password, SelectPassword, (erro, result) => {
                            if(erro) res.status(500).json(erro)
                            else if(result){
                                var token = jwt.sign({ iduser, nome }, process.env.SECRET, { expiresIn: 7200})
                                res.status(200).json({ token: token})
                            }else{
                                res.status(400).json({mensagem: "Login ou senha incorreto"})
                            }
                        })
                    }
                }
            })
        }
    }

    static async GerarSenha (req, res) {
        const { login } = req.body

        db.query(`SELECT * FROM TB_Usuario WHERE TXT_LOGIN = ?`, [login], (erro, result) => {
            if(erro) res.status(500).json(erro)
            else if(result.length == 0) res.status(404).json({mensagem: "Usuário não cadastrado"})
            else {
                var SelectNome = result[0].TXT_NOME;
                var SelectEmail = result[0].TXT_EMAIL;
                var SelectEmail = `${SelectNome} ${SelectEmail}`
                var password = Math.random().toString(36).substring(2,150)
                hash(password, 10, (erro, hashPassword) => {
                    db.query(`UPDATE TB_Usuario SET TXT_PASSWORD = ? WHERE TXT_LOGIN = ?`, [hashPassword, login], (erro) => {
                        if(erro) res.status(500).json(erro)
                        else{
                            var DescricaoEmail = `<p style="text-align: center;"><img class="n3VNCb KAlRDb" src="https://static.vecteezy.com/ti/vetor-gratis/t2/1592203-farm-landscape-with-field-and-red-barn-in-summer-season-gr%C3%A1tis-vetor.jpg" alt="Fazenda Eletrônica" width="351" height="118" data-noaft="1" /></p>
                            <p style="text-align: center;">Olá <strong>${SelectNome}!</strong></p>
                            <p style="text-align: center;">Essa é a sua nova senha de acesso à nossa plataforma.</p>
                            <p style="text-align: center;">Senha: <strong>${password}</strong></p>
                            <p style="text-align: center;">Abraços da equipe da Fazenda Eletrônica.</p>
                            <p style="text-align: center;"> </p>
                            <p style="text-align: center;"><a title="Clique aqui" href="http://fazendaeletronica.herokuapp.com" target="_blank" rel="noopener">Clique aqui</a> para acessar nosso site.</p>`

                            EnviarEmail(SelectEmail, `Nova senha de acesso`, DescricaoEmail);
                            res.status(200).json({mensagem: "Nova senha enviada por email"})
                        }
                    })
                })
            }
        })
    }
};

module.exports = UsuarioController;
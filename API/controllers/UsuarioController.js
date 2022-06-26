const Usuario = require('../models/Usuario/ModelUsuario')
const EnviarEmail = require('../utils/email')
const { hash } = require('bcrypt');
require('dotenv').config()
const db = require('../config/database');
const jwt = require('jsonwebtoken');
const IdUsuarioLogado = require('../utils/usuarioLogado');

class UsuarioController {

    static async Adicionar (req, res) {
        const { login, password, nome, email } = req.body;

        const hashPassword = await hash(password, 10);
        const usuario = new Usuario({
            login: login.toLowerCase().trim(),
            password: hashPassword,
            nome,
            email: email.toLowerCase().trim()
        })
        const result = await Usuario.Adicionar(usuario) 
        res.status(result.code).json(result.result)
    }

    static async Login (req, res) {
        const { login, password } = req.body;
        const usuario = new Usuario({
            login: login.toLowerCase().trim(),
            password,
        })
        const result = await Usuario.Login(usuario)
        res.status(result.code).json(result.result)
    }

    static async AlterarSenhaExterno (req, res) {
        const { password } = req.body
        const hashPassword = await hash(password, 10)

        jwt.verify(req.params.token, process.env.SECRET, (erro, decoded)=>{
            const IdUsuario = decoded.IdUsuario
            const HoraExpiracao = decoded.HoraExpiracao

            const Hora = new Date
            const HoraAtual = Hora.getHours() + ":" + Hora.getMinutes()
            if (HoraAtual < HoraExpiracao) {
                const usuario = {
                    id: IdUsuario,
                    password: hashPassword
                }
                Usuario.AlterarSenha(usuario);
                res.status(200).json({mensagem: "Senha alterada com sucesso"})
            } else {
                res.status(200).json({erro: `Link expirado`})
            }
    })
    }

    static async AlterarSenhaEmail (req, res) {
        const { login } = req.body;
        const usuario = new Usuario({
            login: login.toLowerCase().trim()
        })
        const result = await Usuario.AlterarSenhaEmail(usuario)  
        res.status(result.code).json(result.result)
    }

    static async AlterSenhaInterno (req, res) {
        const { password } = req.body
        const hashPassword = await hash(password, 10)
        const usuario = new Usuario({
            id: await IdUsuarioLogado(req),
            password: hashPassword
        })
        const result = await Usuario.AlterarSenha(usuario)
        res.status(result.code).json(result.result)
    }
};

module.exports = UsuarioController;
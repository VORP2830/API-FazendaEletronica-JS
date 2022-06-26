const UsuarioDb = require("./Usuario-db");
const { compare } = require('bcrypt');
const jwt = require('jsonwebtoken');
const EnviarEmail = require("../../utils/email");
require(`dotenv`).config()
const URL = process.env.HOST_URL

class Usuario {
    constructor(Usuario) {
        this.id = Usuario.id;
        this.login = Usuario.login;
        this.password = Usuario.password;
        this.nome = Usuario.nome;
        this.email = Usuario.email;
    }

    static async AlterarSenha (Usuario) {
        return UsuarioDb.AlterarSenha(Usuario)
    }

    static async Adicionar (Usuario) {
       const BuscarEmail = await UsuarioDb.BuscarEmail(Usuario.email)
       const BuscarLogin = await UsuarioDb.BuscarLogin(Usuario.login)
       if(BuscarEmail.result.length > 0) {
        return {code: 200, result: {erro: `Login ja em uso`}}
       } else if(BuscarLogin.result.length > 0) {
        return {code: 200, result: {erro: `Login ja em uso`}}
       } else if (BuscarEmail.result.length == 0 && BuscarLogin.result.length == 0){
        return await UsuarioDb.Adicionar(Usuario)
       } else {
        return {code: 500, result: {erro: `Algo de errado não está certo`}}
       }
    }

    static async Login (Usuario) {
        const BuscarLogin = await UsuarioDb.BuscarLogin(Usuario.login)
        if(BuscarLogin.result.length == 0) {
            return {code: 200, result: {erro: `Login ou senha invalidos`}}
        } else if(BuscarLogin.result.length == 1) {
            const SenhaCorreta = await compare(Usuario.password, BuscarLogin.result[0].TXT_PASSWORD)
            if (SenhaCorreta) {
                const Token = jwt.sign({ IdUsuario: BuscarLogin.result[0].ID_INT_USUARIO }, process.env.SECRET, { expiresIn: 7200})
                return {code: 200, result: {Token: Token}}
            } else {
                return {code: 200, result: {erro: `Login ou senha invalidos`}}
            }
        }
    }

    static async AlterarSenhaEmail (Usuario) {
        const Hora = new Date
        const usuario = await UsuarioDb.BuscarLogin(Usuario.login)
        const Token = jwt.sign({ 
            IdUsuario: usuario.result[0].ID_INT_USUARIO, 
            HoraExpiracao: Hora.getHours()+1 + ":" + Hora.getMinutes()
        }, process.env.SECRET, {expiresIn: 1200 /*Expira em 1 hora*/})
        const link = `${URL}${Token}`
        const TextoEmail = `<p style="text-align: center;"><img class="n3VNCb KAlRDb" src="https://static.vecteezy.com/ti/vetor-gratis/t2/1592203-farm-landscape-with-field-and-red-barn-in-summer-season-gr%C3%A1tis-vetor.jpg" alt="Fazenda Eletr&ocirc;nica" width="351" height="118" data-noaft="1"></p>
<p style="text-align: center;">Ol&aacute; <strong>${usuario.result[0].TXT_NOME}!</strong></p>
<p style="text-align: center;">Essa&nbsp;email &eacute;&nbsp;referente ao seu pedido de&nbsp;altera&ccedil;&atilde;o de&nbsp;senha.</p>
<p style="text-align: center;">Entre no link abaixo para efetuar&nbsp;a altera&ccedil;&atilde;o, lembrando que&nbsp;ele&nbsp;se&nbsp;expira&nbsp;1 hora ap&oacute;s enviado.</p>
<p style="text-align: center;">&nbsp;</p>
<p style="text-align: center;">Link: <strong>${link}</strong></p>
<p style="text-align: center;">&nbsp;</p>
<p style="text-align: center;">Se n&atilde;o foi voc&ecirc; quem pediu&nbsp;a alter&ccedil;&atilde;o&nbsp;pode&nbsp;ignorar esse email.</p>
<p style="text-align: center;">Abra&ccedil;os da equipe da Fazenda Eletr&ocirc;nica.</p>
<p style="text-align: center;">&nbsp;</p>
<p style="text-align: center;"><a title="Clique aqui" href="http://fazendaeletronica.herokuapp.com" target="_blank" rel="noopener">Clique aqui</a>&nbsp;para acessar nosso site.</p>`
        EnviarEmail(usuario.result[0].TXT_EMAIL, `Precisa alterar sua senha?`, TextoEmail)
        return {code: 200, result: `Email enviado com link de alterção de senha`}
    }

}

module.exports = Usuario;
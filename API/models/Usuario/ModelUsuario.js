const UsuarioDb = require("./Usuario-db");
const { compare } = require('bcrypt');
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

}

module.exports = Usuario;
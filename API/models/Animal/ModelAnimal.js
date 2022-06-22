const AnimalDb = require('./Animal-db');

class Animal {
    constructor(animal) {
        this.id = animal.id;
        this.id_criador = animal.id_criador;
        this.numero = animal.numero;
        this.id_pai = animal.id_pai;
        this.cha_sexo = animal.cha_sexo;
        this.id_finalidade = animal.id_finalidade;
        this.apelido = animal.apelido;
        this.nascimento = animal.nascimento;
        this.status = animal.status;
        this.tipo_animal = animal.tipo_animal;
    };

    static async Adicionar (animal) {
        return await AnimalDb.Insert(animal);
    };

    static async BuscarId (IdUser, id) {
        if (await AnimalDb.TemPermissao(IdUser, id)) {
            return await AnimalDb.BuscaId(id);
        } else {
            return `Você não tem permissão para realizar essa operação`;
        };
    };

    static async Deletar (IdUser, id) {
        if(await AnimalDb.TemPermissao(IdUser, id)) {
            return await AnimalDb.DeleteId(id);
        } else {
            return `Você não tem permissão para realizar essa operação`;
        };
    };

    static async Alterar (IdUser, id, animal) {
        if (await AnimalDb.TemPermissao(IdUser, id)) {
            return await AnimalDb.Update(animal);
        } else {
            return `Você não tem permissão para realizar essa operação`;
        }
    };

    static async TelaPrincipal (IdUsuarioLogado) {
        return await AnimalDb.TelaPrincipal(IdUsuarioLogado);
    };

    static async ListarCampo (IdUsuarioLogado) {
        return await AnimalDb.ListarCampo(IdUsuarioLogado);
    };

    static async ListarVendido (IdUsuarioLogado) {
        return await AnimalDb.ListarVendido(IdUsuarioLogado);
    };

    static async ListarMorto (IdUsuarioLogado) {
        return await AnimalDb.ListarMorto(IdUsuarioLogado);
    };

    static async ListarPai (IdUsuarioLogado) {
        return await AnimalDb.ListarPai(IdUsuarioLogado);
    };

}
module.exports = Animal;
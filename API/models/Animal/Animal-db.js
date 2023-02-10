const db = require('../../config/database');


 module.exports = {

    Adicionar: Animal => {
        return new Promise((resolve, rejects) => {
            db.query(`
            INSERT INTO TB_Animal
            (ID_INT_USUARIO_CRIADOR, INT_NUMERO_ANIMAL, ID_INT_PAI, CHA_SEXO, ID_INT_FINALIDADE, TXT_APELIDO, DAT_NASCIMENTO, ID_INT_STATUS, ID_INT_TIPO_ANIMAL)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [Animal.id_criador, Animal.numero, Animal.id_pai, Animal.cha_sexo, Animal.id_finalidade, Animal.apelido, Animal.nascimento, Animal.status, Animal.tipo_animal], erro => {
                if (erro) rejects({code: 500, error: erro});
                else resolve ({code: 201, result: "Animal cadastrado com sucesso"});
            })
        })
    },

    Buscar: id => {
        return new Promise((resolve, rejects) => {
            db.query(`SELECT * FROM TB_Animal WHERE ID_INT_ANIMAL = ?`, 
            [id], (erro, result) => {
                if (erro) rejects({code: 500, error: "Animal inexistente"});
                else resolve ({code: 200, result: result});
            })
        })
    },

    Deletar: id => {
        return new Promise((resolve, rejects) => {
            db.query(`DELETE FROM TB_Animal WHERE ID_INT_ANIMAL = ?`, 
            [id], (erro) => {
                if (erro) rejects({code: 500, error: erro});
                else resolve ({code: 200, result: "Animal deletado"})
            })
        })
    },

    Atualizar: Animal => {
        return new Promise((resolve, rejects) => {
            db.query(`
            UPDATE FROM TB_Animal SET
            INT_NUMERO_ANIMAL = ?, ID_INT_PAI = ?, CHA_SEXO = ?, ID_INT_FINALIDADE = ?, TXT_APELIDO = ?, DAT_NASICMENTO = ?, ID_INT_STATUS = ?, ID_INT_TIPO_ANIMAL = ?
            WHERE ID_INT_ANIMAL = ?`,
            [Animal.numero, Animal.id_pai, Animal.cha_sexo, Animal.id_finalidade, Animal.apelido, Animal.nascimento, Animal.status, Animal.tipo_animal, Animal.id], erro => {
                if (erro) rejects({code: 500, error: erro});
                else resolve ({code: 200, result: "Animal alterado com sucesso"});
            })
        })
    },

    BuscarPorCriador: IdUsuarioLogado => {
        return new Promise((resolve, rejects) => {
            db.query(`SELECT * FROM TB_Animal WHERE ID_INT_USUARIO_CRIADOR = ?`, 
            [IdUsuarioLogado], (erro, result) => {
                if (erro) rejects({code: 500, error: "Não existem animais cadastrados"});
                else resolve ({code: 200, result: result});
            })
        })
    },

    TemPermissao: (IdUsuarioLogado, AnimalId) => {
        return new Promise((resolve, rejects) => {
            db.query(`SELECT ID_INT_USUARIO_CRIADOR FROM TB_Animal WHERE ID_INT_ANIMAL = ?`, [AnimalId], 
            (erro, result) => {
                if (erro) rejects (erro)
                else{
                    if(result.length == 1){
                        if (result[0].ID_INT_USUARIO_CRIADOR == IdUsuarioLogado){
                            resolve (true);
                        }else {
                            resolve (false);
                        }
                    }else{
                        resolve (false);
                    }
                }
            })
        })
    },

    ListarCampo: (IdUsuarioLogado) => {
        return new Promise((resolve, rejects) => {
            db.query(`SELECT A.ID_INT_ANIMAL, A.INT_NUMERO_ANIMAL, A.ID_INT_PAI, A.CHA_SEXO, 
            F.TXT_NOME, A.TXT_APELIDO, A.DAT_NASCIMENTO, S.TXT_STATUS, TA.TXT_NOME FROM TB_Animal A
            JOIN TB_Finalidade F on A.ID_INT_FINALIDADE = F.ID_INT_FINALIDADE
            JOIN TB_Status S ON S.ID_INT_STATUS = A.ID_INT_STATUS
            JOIN TB_Tipo_Animal TA ON TA.ID_INT_TIPO_ANIMAL = A.ID_INT_TIPO_ANIMAL
            WHERE A.ID_INT_USUARIO_CRIADOR = ? AND A.ID_INT_STATUS IN
            (SELECT ID_INT_STATUS FROM TB_Status WHERE TXT_STATUS LIKE 'Em Campo')`, 
            [IdUsuarioLogado], (erro, result) => {
                if (erro) rejects({code: 500, error: erro});
                else resolve({code: 200, result: result});
            })
        })
    },

    ListarVendido: (IdUsuarioLogado) => {
        return new Promise((resolve, rejects) => {
            db.query(`SELECT A.ID_INT_ANIMAL, A.INT_NUMERO_ANIMAL, A.ID_INT_PAI, A.CHA_SEXO, 
            F.TXT_NOME, A.TXT_APELIDO, A.DAT_NASCIMENTO, S.TXT_STATUS, TA.TXT_NOME FROM TB_Animal A
            JOIN TB_Finalidade F on A.ID_INT_FINALIDADE = F.ID_INT_FINALIDADE
            JOIN TB_Status S ON S.ID_INT_STATUS = A.ID_INT_STATUS
            JOIN TB_Tipo_Animal TA ON TA.ID_INT_TIPO_ANIMAL = A.ID_INT_TIPO_ANIMAL
            WHERE A.ID_INT_USUARIO_CRIADOR = ? AND A.ID_INT_STATUS IN 
            (SELECT ID_INT_STATUS FROM TB_Status WHERE TXT_STATUS LIKE 'Vendido')`, 
            [IdUsuarioLogado], (erro, result) => {
                if (erro) rejects({code: 500, error: erro});
                else resolve({code: 200, result: result});
            })
        })
    },

    ListarMorto: (IdUsuarioLogado) => {
        return new Promise((resolve, rejects) => {
            db.query(`SELECT A.ID_INT_ANIMAL, A.INT_NUMERO_ANIMAL, A.ID_INT_PAI, A.CHA_SEXO, 
            F.TXT_NOME, A.TXT_APELIDO, A.DAT_NASCIMENTO, S.TXT_STATUS, TA.TXT_NOME FROM TB_Animal A
            JOIN TB_Finalidade F on A.ID_INT_FINALIDADE = F.ID_INT_FINALIDADE
            JOIN TB_Status S ON S.ID_INT_STATUS = A.ID_INT_STATUS
            JOIN TB_Tipo_Animal TA ON TA.ID_INT_TIPO_ANIMAL = A.ID_INT_TIPO_ANIMAL
            WHERE A.ID_INT_USUARIO_CRIADOR = ? AND A.ID_INT_STATUS IN 
            (SELECT ID_INT_STATUS FROM TB_Status WHERE TXT_STATUS LIKE 'Morto')`, 
            [IdUsuarioLogado], (erro, result) => {
                if (erro) rejects({code: 500, error: erro});
                else resolve({code: 200, result: result});
            })
        })
    },

    TelaPrincipal: (IdUsuarioLogado) => {
        return new Promise((resolve, rejects) => {
            db.query(`
            SET @IdUser = ?;
            SELECT S.TXT_STATUS, COUNT(*) AS TOTAL FROM TB_Animal A
                        JOIN TB_Status S ON S.ID_INT_STATUS = A.ID_INT_STATUS
                        JOIN TB_Tipo_Animal TA ON TA.ID_INT_TIPO_ANIMAL = A.ID_INT_TIPO_ANIMAL
                        WHERE A.ID_INT_USUARIO_CRIADOR = @IdUser AND A.ID_INT_STATUS IN
                        (SELECT ID_INT_STATUS FROM TB_Status WHERE TXT_STATUS LIKE 'Em Campo')
                        GROUP BY S.ID_INT_STATUS
            UNION
            SELECT S.TXT_STATUS, COUNT(*) AS TOTAL FROM TB_Animal A
                        JOIN TB_Status S ON S.ID_INT_STATUS = A.ID_INT_STATUS
                        JOIN TB_Tipo_Animal TA ON TA.ID_INT_TIPO_ANIMAL = A.ID_INT_TIPO_ANIMAL
                        WHERE A.ID_INT_USUARIO_CRIADOR = @IdUser AND A.ID_INT_STATUS IN
                        (SELECT ID_INT_STATUS FROM TB_Status WHERE TXT_STATUS <> 'Em Campo')
                        AND YEAR(A.DAT_MODIFICACAO) = YEAR(NOW()) AND MONTH(A.DAT_MODIFICACAO) = MONTH(NOW())
                        GROUP BY S.ID_INT_STATUS
            
            `,[IdUsuarioLogado], (erro, result) => {
                if (erro) rejects({code: 500, error: erro});
                else resolve({code: 200, result: result});
            })
        })
    },

    ListarPai: (IdUsuarioLogado) => {
        return new Promise((resolve, rejects) => {
            db.query(`SELECT ID_INT_ANIMAL, INT_NUMERO_ANIMAL FROM TB_Animal 
            WHERE ID_INT_USUARIO_CRIADOR = ? AND CHA_SEXO = "F" `,
             [IdUsuarioLogado], (erro, result) => {
                if (erro) rejects({code: 500, error: erro});
                else resolve({code: 200, result: result});
                })
        })
    }
 }


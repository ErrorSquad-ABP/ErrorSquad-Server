const userQuery = require('../migrations/userQuery');
const bcrypt = require("bcrypt");
const generateToken = require('../../utils/generateToken');
const hash = require('../../utils/generateHash');
const hashVerify = require('../../utils/verifyPassword');


class user {
  constructor(id, nome, email, senha) {
    this.id = id;
    this.nome = nome;
    this.email = email;
    this.senha = senha;
  }

  static async validateLogin(email, senha) {
    try {
      const userInfos = await userQuery.login(email);

      console.log(userInfos)
      if (!userInfos) {
        return { status: 401, message: 'Credenciais incorretas.' };
      }

      // Comparar a senha fornecida com o hash armazenado
      if (userInfos) {
        const tokenInfos = ({ id: userInfos.id, nome: userInfos.nome })
        const isPasswordValid = await bcrypt.compare(senha, userInfos.hashed_password);

        if (isPasswordValid) {
          //Geração de token jwt
          const token = generateToken(tokenInfos);

          return {
            status: 200,
            message: 'Login realizado com sucesso!',
            data: {
              id: userInfos.id,
              nome: userInfos.nome,
              token,
            },
          };
        } else {
          return { status: 401, message: 'Credenciais incorretas.' };
        }
      }
    } catch (error) {
      console.error('Erro ao processar login:', error);
      return { status: 500, message: 'Erro interno. Tente novamente mais tarde.' };
    }
  }

  static async getUserById(id) {
  
    return await userQuery.searchUserById(id);
  
  }

  async updateName(newNameUser) {

    const id = newNameUser.id;

    const nome = newNameUser.nome;

    const userExists = await userQuery.userExistsOrNotById(id);

    if (!userExists) {
      return { status: 404, message: "Usuário não encontrado" };
    }

    if (userExists) {

      if (!nome || nome.trim() === "") {
        throw new Error("Novo nome de Usuário é obrigatório para atualização.");
      }

      return await userQuery.updateNameExistingUser(id, nome)
    }
  }

  async updatePassword( newPasswordUser, senhaAtual) {

    const id = newPasswordUser.id;

    const novaSenha = newPasswordUser.senha;

    const userExists = await userQuery.userExistsOrNotById(id);

    if (!userExists) {
      return { status: 404, message: "Usuário não encontrado" };
    }

    const userPasswordHashed = await userQuery.getPasswordHashed(id);

    const isPasswordValid = await hashVerify.verifyPassword(String(senhaAtual), String(userPasswordHashed));

     if (!isPasswordValid) {
      return { status: 401, message: "Credenciais incorretas" };
    }

    if (userExists && isPasswordValid) {

      if (!novaSenha || novaSenha.trim() === "") {
        throw new Error("Nova senha de Usuário é obrigatório para atualização.");
      }

      const novaSenhaHashed = await hash.encryptPassword(novaSenha)

      return await userQuery.updatePasswordExistingUser(id, novaSenhaHashed)
    }
  }
}

module.exports = user;

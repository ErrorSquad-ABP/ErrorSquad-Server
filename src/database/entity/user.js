const userQuery = require('../migrations/userQuery');
const bcrypt = require("bcrypt");
const generateToken = require('../../utils/generateToken');


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


      if (!userInfos) {
        return { status: 404, message: 'Credenciais incorretas.' };
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
          return { status: 404, message: 'Credenciais incorretas.' };
        }
      }
    } catch (error) {
      console.error('Erro ao processar login:', error);
      return { status: 500, message: 'Erro interno. Tente novamente mais tarde.' };
    }
  }
}

module.exports = user;

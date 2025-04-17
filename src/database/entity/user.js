const userQuery = require('../migrations/userQuery');
const bcrypt = require("bcrypt");

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
        return { status: 404, message: 'Email incorreto.' };
      }

      // Comparar a senha fornecida com o hash armazenado
      const isPasswordValid = await bcrypt.compare(senha, userInfos.hashed_password);

      if (isPasswordValid) {
        return {
          status: 200,
          message: 'Login realizado com sucesso!',
          data: {
            id: userInfos.id,
            nome: userInfos.nome,
          },
        };
      } else {
        return { status: 400, message: 'Senha incorreta.' };
      }
    } catch (error) {
      console.error('Erro ao processar login:', error);
      return { status: 500, message: 'Erro interno. Tente novamente mais tarde.' };
    }
  }
}

module.exports = user;

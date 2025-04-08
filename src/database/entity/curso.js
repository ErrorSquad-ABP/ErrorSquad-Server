const cursoQuery = require('../migrations/cursoQuery');

class curso {

  constructor(id, nome) {

    this.id = id;
    this.nome = nome;

  }
  getId() {
    return this.id;
  }

  setId(id) {
    this.id = id;
  }

  getNome() {
    return this.nome;
  }

  setNome(nome) {
    this.nome = nome;
  }

  async createCurso(newCurso) {

    try {
      const nome = newCurso.nome;
  
      // Verificar se o nome é nulo ou vazio
      if (!nome || nome.trim() === "") {
          throw new Error("Nome do curso é obrigatório para criação.");
      }
  
      // Caso o nome seja válido, continuar com a lógica
      return await cursoQuery.createNewCurso(nome);
  
  } catch (erro) {
      return { status: 400, mensagem: erro.message };
  }

  }

  static async getAllCurso() {

    return await cursoQuery.searchAllCursos();

  }

  async updateCurso(alterCurso) {
    try {

      const id = alterCurso.id;

      const nome = alterCurso.nome;

      const cursoExists = await cursoQuery.cursoExistsOrNotById(id);

      if (cursoExists) {

        if (!nome || nome.trim() === "") {
          throw new Error("Nome do curso é obrigatório para atualização.");

      }
      return await cursoQuery.updateExistingCurso(id, nome)
    }

      if (!cursoExists) {

        throw new Error("Curso não encontrado.");

      }

    } catch (erro) {

      return { status: 400, mensagem: erro.message };

    }
  }


  static async deleteCurso(id) {

    try {

      const cursoExists = await cursoQuery.cursoExistsOrNotById(id);

      if (cursoExists) {

        await cursoQuery.deleteExistingCurso(id)

        return { status: 200, mensagem: "Curso deletado!" };

      }

      if (!cursoExists) {

        throw new Error("Curso não encontrado.");

      }

    } catch (erro) {

      return { status: 400, mensagem: erro.message };

    }
  }
}

module.exports = curso;
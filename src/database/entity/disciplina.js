const disciplinaQuery = require('../migrations/disciplinaQuery');

class disciplina {
  constructor(id, nome, nome_docente, nome_curso, codigo) {
    this.id = id;
    this.nome = nome;
    this.nome_docente = nome_docente;
    this.nome_curso = nome_curso;
    this.codigo = codigo;
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

  getDocente() {
    return this.nome_docente;
  }

  setDocente(nome_docente) {
    this.nome_docente = nome_docente;
  }

  getCurso() {
    return this.curso;
  }

  setCurso(curso) {
    this.curso = curso;
  }

  getCodigo() {
    return this.codigo;
  }

  setCodigo(codigo) {
    this.codigo = codigo;
  }


  async createDisciplina(newDisciplina) {
    try {
      const nome = newDisciplina.nome;
      const nome_docente = newDisciplina.nome_docente;
      const nome_curso = newDisciplina.nome_curso;
      const codigo = newDisciplina.codigo;

      // Verificar se o nome é nulo ou vazio
      if (!nome || nome.trim() === "") {
        throw new Error("Nome da disciplina é obrigatório para criação.");
      }

      if (!nome_docente) {
        throw new Error("ID do docente é obrigatório para criação.");
      }

      if (!nome_curso) {
        throw new Error("ID do curso é obrigatório para criação.");
      }

      if (!codigo) {
        throw new Error("Código é obrigatório para criação.");
      }

      // Caso o nome seja válido, continuar com a lógica
      return await disciplinaQuery.createNewDisciplina(nome, nome_docente, nome_curso, codigo);

    } catch (erro) {
      return { status: 400, mensagem: erro.message };
    }

  }

  static async getAllDisciplina() {
    return await disciplinaQuery.searchAllDisciplinas();
  }

  static async getDisciplinaById(id) {
    return await disciplinaQuery.searchDisciplinaById(id);
  }

  async updateDisciplina(alterDisciplina) {
    try {

      const id = alterDisciplina.id;

      const nome = alterDisciplina.nome;

      const nome_docente = alterDisciplina.nome_docente;

      const nome_curso = alterDisciplina.nome_curso;

      const codigo = alterDisciplina.codigo;

      const disciplinaExists = await disciplinaQuery.disciplinaExistsOrNotById(id);

      if (disciplinaExists) {

        if (!nome || nome.trim() === "") {
          throw new Error("Nome da disciplina é obrigatório para atualização.");

        }

        if (!nome_docente) {
          throw new Error("ID do docente é obrigatório para atualização.");

        }

        if (!nome_curso) {
          throw new Error("ID do curso é obrigatório para criação.");

        }

        if (!codigo) {
          throw new Error("Código é obrigatório para criação.");

        }

        return await disciplinaQuery.updateExistingDisciplina(id, nome, nome_docente, nome_curso, codigo)
      }

      if (!disciplinaExists) {

        throw new Error("Disciplina não encontrada.");

      }

    } catch (erro) {

      return { status: 400, mensagem: erro.message };

    }
  }



  static async deleteDisciplina(id) {

    try {

      const disciplinaExists = await disciplinaQuery.disciplinaExistsOrNotById(id);

      if (disciplinaExists) {

        await disciplinaQuery.deleteExistingDisciplina(id)

        return { status: 200, mensagem: "Disciplina deletada!" };

      }

      if (!disciplinaExists) {

        throw new Error("Disciplina não encontrada.");

      }

    } catch (erro) {

      return { status: 400, mensagem: erro.message };

    }
  }
}

module.exports = disciplina;

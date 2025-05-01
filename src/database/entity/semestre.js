const semestreQuery = require('../migrations/semestreQuery');

class semestre {

  constructor(id, nivel, ano, nome_curso, nome_turno, inicio, fim) {
    this.id = id;
    this.nivel = nivel;
    this.ano = ano,
    this.nome_curso = nome_curso;
    this.nome_turno = nome_turno;
    this.inicio = inicio;
    this.fim = fim;
  }
  getId() {
    return this.id;
  }

  setId(id) {
    this.id = id;
  }

  getNivel() {
    return this.nivel;
  }

  setNivel(nivel) {
    this.nivel = nivel;
  }

  getAno() {
    return this.ano;
  }

  setAno(ano) {
    this.ano = ano;
  }

  getNome_curso() {
    return this.nome_curso;
  }

  setNome_curso(nome_curso) {
    this.nome_curso = nome_curso;
  }

  getNome_turno() {
    return this.nome_turno;
  }

  setNome_turno(nome_turno) {
    this.nome_turno = nome_turno;
  }

  getInico() {
    return this.inico;
  }

  setInico(inico) {
    this.inico = inico;
  }

  getFim() {
    return this.fim;
  }

  setFim(fim) {
    this.fim = fim;
  }

  async createSemestre(newSemestre) {

    try {
      const nivel = newSemestre.nivel;
      
      const ano = newSemestre.ano;

      const nome_curso = newSemestre.nome_curso;

      const nome_turno = newSemestre.nome_turno;

      const inicio = newSemestre.inico;

      const fim = newSemestre.fim;

      // Verificar se o nivel é nulo ou vazio
      if (!nivel) {
        throw new Error("nivel do semestre é obrigatório para criação.");
      }

      if (!ano) {
        throw new Error("ano do semestre é obrigatório para criação.");
      }

      if (!nome_curso) {
        throw new Error("ID do curso do semestre é obrigatório para criação.");
      }

      if (!nome_turno) {
        throw new Error("ID do turno do semestre é obrigatório para criação.");
      }

      if (!inicio) {
        throw new Error("Data de inicio do semestre é obrigatório para criação.");
      }

      if (!fim) {
        throw new Error("Data de fim do semestre é obrigatório para criação.");
      }

      // Caso o nivel seja válido, continuar com a lógica
      return await semestreQuery.createNewSemestre(nivel, ano, nome_curso, nome_turno, inicio, fim);

    } catch (erro) {
      return { status: 400, mensagem: erro.message };
    }

  }

  static async getAllSemestre() {

    return await semestreQuery.searchAllSemestres();

  }

  async updateSemestre(alterSemestre) {
    try {

      const id = alterSemestre.id;

      const nivel = alterSemestre.nivel;

      const ano = alterSemestre.ano;

      const nome_curso = alterSemestre.nome_curso;

      const nome_turno = alterSemestre.nome_turno;

      const inicio = alterSemestre.inico;
      
      const fim = alterSemestre.fim;

      const semestreExists = await semestreQuery.semestreExistsOrNotById(id);

      if (semestreExists) {

        if (!nivel) {
          throw new Error("nivel do semestre é obrigatório para atualização.");

        }
        if (!ano) {
          throw new Error("ano do semestre é obrigatório para atualização.");

        }
        if (!nome_curso) {
          throw new Error("ID do curso do semestre é obrigatório para atualização.");

        }
        if (!nome_turno) {
          throw new Error("ID do turno do semestre é obrigatório para atualização.");

        }
        if (!inicio) {
          throw new Error("Data de inicio do semestre é obrigatório para atualização.");
        }
  
        if (!fim) {
          throw new Error("Data de fim do semestre é obrigatório para atualização.");
        }
        return await semestreQuery.updateExistingSemestre(id, nivel, ano, nome_curso, nome_turno, inicio, fim)
      }

      if (!semestreExists) {

        throw new Error("semestre não encontrado.");

      }

    } catch (erro) {

      return { status: 400, mensagem: erro.message };

    }
  }

  static async deleteSemestre(id) {

    try {

      const semestreExists = await semestreQuery.semestreExistsOrNotById(id);

      if (semestreExists) {

        await semestreQuery.deleteExistingSemestre(id)

        return { status: 200, mensagem: "Semestre deletado!" };

      }

      if (!semestreExists) {

        throw new Error("Semestre não encontrado.");

      }

    } catch (erro) {

      return { status: 400, mensagem: erro.message };

    }
  }
}

module.exports = semestre;
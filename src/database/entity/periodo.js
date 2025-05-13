const periodoQuery = require('../migrations/periodoQuery');

class periodo {

  constructor(id, dia_id, horario_id, nome_disciplina, nome_docente_disciplina, semestre_id, nome_ambiente) {

    this.id = id;
    this.dia_id = dia_id;
    this.horario_id = horario_id;
    this.nome_disciplina = nome_disciplina;
    this.nome_docente_disciplina = nome_docente_disciplina;
    this.semestre_id = semestre_id;
    this.nome_ambiente = nome_ambiente;

  }

  getId() {
    return this.id;
  }

  setId(id) {
    this.id = id;
  }

  getDia_id() {
    return this.dia_id;
  }

  setDia(dia_id) {
    this.dia_id = dia_id;
  }

  getHorario_id() {
    return this.horario_id;
  }

  setHorario(horario_id) {
    this.horario_id = horario_id;
  }

  getNome_disciplina() {
    return this.nome_disciplina;
  }

  setDisciplina(nome_disciplina) {
    this.nome_disciplina = nome_disciplina;
  }

  getNome_docente_disciplina() {
    return this.nome_docente_disciplina;
  }

  setDocente(nome_docente_disciplina) {
    this.nome_docente_disciplina = nome_docente_disciplina;
  }

  getSemestre_id() {
    return this.semestre_id;
  }

  setSemestre(semestre_id) {
    this.semestre_id = semestre_id;
  }

  getNome_ambiente() {
    return this.nome_ambiente;
  }

  setAmbiente(nome_ambiente) {
    this.nome_ambiente = nome_ambiente;
  }

  static async getAllPeriodo() {

    return await periodoQuery.searchAllPeriodos();

  }

  async updatePeriodo(alterPeriodo) {
    try {
      const id = alterPeriodo.id
      const disciplina = alterPeriodo.nome_disciplina
      const docente = alterPeriodo.nome_docente_disciplina
      const ambiente = alterPeriodo.nome_ambiente
      const periodoExists = await periodoQuery.periodoExistsOrNotById(id);

      if (periodoExists) {

        // Verificar se o nome é nulo ou vazio
        if (!disciplina) {
          throw new Error("Necessário inserir uma disciplina.");
        }

        if (!docente) {
          throw new Error("Necessário inserir um professor.");
        }

        if (!ambiente) {
          throw new Error("Necessário inserir uma sala ou laboratório.");
        }

        return await periodoQuery.updateExistingPeriodo(id, disciplina, docente, ambiente);

      }

      if (!periodoExists) {

        throw new Error("periodo não encontrado.");

      }

    } catch (erro) {
      return { status: 400, mensagem: erro.message };
    }
  }
}

module.exports = periodo;
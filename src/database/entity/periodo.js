const periodoQuery = require('../migrations/periodoQuery');

class periodo {

  constructor(id, dia_id, horario_id, id_disciplina, id_docente_disciplina, semestre_id, id_ambiente) {

    this.id = id;
    this.dia_id = dia_id;
    this.horario_id = horario_id;
    this.id_disciplina = id_disciplina;
    this.id_docente_disciplina = id_docente_disciplina;
    this.semestre_id = semestre_id;
    this.id_ambiente = id_ambiente;

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

  getid_disciplina() {
    return this.id_disciplina;
  }

  setDisciplina(id_disciplina) {
    this.id_disciplina = id_disciplina;
  }

  getid_docente_disciplina() {
    return this.id_docente_disciplina;
  }

  setDocente(id_docente_disciplina) {
    this.id_docente_disciplina = id_docente_disciplina;
  }

  getSemestre_id() {
    return this.semestre_id;
  }

  setSemestre(semestre_id) {
    this.semestre_id = semestre_id;
  }

  getid_ambiente() {
    return this.id_ambiente;
  }

  setAmbiente(id_ambiente) {
    this.id_ambiente = id_ambiente;
  }

  static async getAllPeriodo() {

    return await periodoQuery.searchAllPeriodos();

  }

  async updatePeriodo(alterPeriodo) {
    try {
      const id = alterPeriodo.id
      const disciplina = alterPeriodo.id_disciplina
      const docente = alterPeriodo.id_docente_disciplina
      const ambiente = alterPeriodo.id_ambiente
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
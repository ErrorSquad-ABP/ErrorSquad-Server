const periodoQuery = require('../migrations/periodoQuery');

class periodo {

  constructor(id, dia_id, horario_id, disciplina_id, docente_id, semestre_id, ambiente_id) {

    this.id = id;
    this.dia_id = dia_id;
    this.horario_id = horario_id;
    this.disciplina_id = disciplina_id;
    this.docente_id = docente_id;
    this.semestre_id = semestre_id;
    this.ambiente_id = ambiente_id;

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

  getDisciplina_id() {
    return this.disciplina_id;
  }

  setDisciplina(disciplina_id) {
    this.disciplina_id = disciplina_id;
  }

  getDocente_id() {
    return this.docente_id;
  }

  setDocente(docente_id) {
    this.docente_id = docente_id;
  }

  getSemestre_id() {
    return this.semestre_id;
  }

  setSemestre(semestre_id) {
    this.semestre_id = semestre_id;
  }

  getAmbiente_id() {
    return this.ambiente_id;
  }

  setAmbiente(ambiente_id) {
    this.ambiente_id = ambiente_id;
  }

  static async getAllPeriodo() {

    return await periodoQuery.searchAllPeriodos();

  }

  static async updatePeriodo(updatePeriodo) {
    try {
      const id = updatePeriodo.id
      const disciplina = updatePeriodo.disciplina_id
      const docente = updatePeriodo.docente_id
      const ambiente = updatePeriodo.ambiente_id
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

        // Caso o nome seja válido, continuar com a lógica
        return await periodoQuery.updateExistingPeriodo(id, disciplina, docente, ambiente);
      }

      if (!periodoExists) {

        throw new Error("periodo não encontrado.");

      }


    } catch (erro) {
      return { status: 400, mensagem: erro.message };
    }

  }

  static async deletePeriodo(id) {
  
      try {
  
        const periodoExists = await periodoQuery.periodoExistsOrNotById(id);
  
        if (periodoExists) {
  
          await periodoQuery.deleteExistingPeriodo(id)
  
          return { status: 200, mensagem: "periodo deletado!" };
  
        }
  
        if (!periodoExists) {
  
          throw new Error("periodo não encontrado.");
  
        }
  
      } catch (erro) {
  
        return { status: 400, mensagem: erro.message };
  
      }
    }

}
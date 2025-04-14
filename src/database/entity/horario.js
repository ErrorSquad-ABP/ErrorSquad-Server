const horarioQuery = require('../migrations/horarioQuery');
const timeValidator = require('../../utils/isValidTime')

class Horario {
  constructor(id, hr_inicio, hr_fim) {
    this.id = id;
    this.hr_inicio = hr_inicio;
    this.hr_fim = hr_fim;
  }

  getId() {
    return this.id;
  }

  setId(id) {
    this.id = id;
  }

  getHrInicio() {
    return this.hr_inicio;
  }

  setHrInicio(hr_inicio) {
    this.hr_inicio = hr_inicio;
  }

  getHrFim() {
    return this.hr_fim;
  }

  setHrFim(hr_fim) {
    this.hr_fim = hr_fim;
  }

  async createHorario(newHorario) {

    try {

      const hr_inicio = (newHorario.hr_inicio);

      const hr_fim = (newHorario.hr_fim);

      const hrFimIsTime = timeValidator.isValidTime(newHorario.hr_fim);

      const hrInicioIsTime = timeValidator.isValidTime(newHorario.hr_inicio);

      if (!hr_inicio) {
        throw new Error("Horário de inicio da aula é obrigatório para criação.");
      }

      if (!hrInicioIsTime) {
        throw new Error("Formato do horário de inicio da aula não é valido.");
      }

      if (!hr_fim) {
        throw new Error("Horário de fim da aula é obrigatório para criação.");
      }

      if (!hrFimIsTime) {
        throw new Error("Formato do horário de fim da aula não é valido.");
      }

      // Caso o nome seja válido, continuar com a lógica
      return await horarioQuery.createNewHorario(hr_inicio, hr_fim);

    } catch (erro) {
      return { status: 400, mensagem: erro.message };
    }

  }

  static async getAllHorario() {

    return await horarioQuery.searchAllHorarios();

  }

  async updateHorario(alterHorario) {
    try {

      const id = (alterHorario.id);

      const hr_inicio = (alterHorario.hr_inicio);

      const hr_fim = (alterHorario.hr_fim);

      const horarioExists = await horarioQuery.horarioExistsOrNotById(id);

      const hrFimIsTime = timeValidator.isValidTime(alterHorario.hr_fim);

      const hrInicioIsTime = timeValidator.isValidTime(alterHorario.hr_inicio);

      if (!horarioExists) {

        throw new Error("Horário não encontrado.");

      }

      if (!hr_inicio) {
        throw new Error("Horário de inicio da aula é obrigatório para alteração.");
      }

      if (!hrInicioIsTime) {
        throw new Error("Formato do horário de inicio da aula não é valido.");
      }

      if (!hr_fim) {
        throw new Error("Horário de fim da aula é obrigatório para alteração.");
      }

      if (!hrFimIsTime) {
        throw new Error("Formato do horário de fim da aula não é valido.");
      }

      // Caso o nome seja válido, continuar com a lógica
      return await horarioQuery.updateExistingHorario(id, hr_inicio, hr_fim );

    } catch (erro) {
      return { status: 400, mensagem: erro.message };
    }
  }


  static async deleteHorario(id) {

    try {

      const horarioExists = await horarioQuery.horarioExistsOrNotById(id);

      if (horarioExists) {

        await horarioQuery.deleteExistingHorario(id)

        return { status: 200, mensagem: "Horário deletado!" };

      }

      if (!horarioExists) {

        throw new Error("Horário não encontrado.");

      }

    } catch (erro) {

      return { status: 400, mensagem: erro.message };

    }
  }
}

module.exports = Horario;

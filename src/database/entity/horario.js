const bigquery = require("../../lib/bigquery");

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

  static async createHorario({ hr_inicio, hr_fim }) {
    const query = `INSERT INTO horarios (hr_inicio, hr_fim) VALUES (@hr_inicio, @hr_fim)`;
    const options = {
      query,
      params: { hr_inicio, hr_fim },
      useLegacySql: false,
    };
    try {
      await bigquery.query(options);
      return { status: "success", message: "Horário criado com sucesso!" };
    } catch (error) {
      throw new Error("Erro ao criar horário: " + error.message);
    }
  }

  static async getAllHorario() {
    const query = `SELECT * FROM horarios`;
    try {
      const [rows] = await bigquery.query({ query });
      return rows;
    } catch (error) {
      throw new Error("Erro ao listar horários: " + error.message);
    }
  }

  static async updateHorario(id, { hr_inicio, hr_fim }) {
    const query = `UPDATE horarios SET hr_inicio = @hr_inicio, hr_fim = @hr_fim WHERE id = @id`;
    const options = {
      query,
      params: { id, hr_inicio, hr_fim },
      useLegacySql: false,
    };
    try {
      await bigquery.query(options);
      return { status: "success", message: "Horário atualizado com sucesso!" };
    } catch (error) {
      throw new Error("Erro ao atualizar horário: " + error.message);
    }
  }

  static async deleteHorario(id) {
    const query = `DELETE FROM horarios WHERE id = @id`;
    const options = {
      query,
      params: { id },
      useLegacySql: false,
    };
    try {
      await bigquery.query(options);
      return { status: "success", message: "Horário deletado com sucesso!" };
    } catch (error) {
      throw new Error("Erro ao deletar horário: " + error.message);
    }
  }
}

module.exports = Horario;

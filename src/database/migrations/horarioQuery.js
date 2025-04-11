const bigquery = require("../../lib/bigquery");

async function createHorario(hr_inicio, hr_fim) {
  const query = `INSERT INTO horarios (hr_inicio, hr_fim) VALUES (@hr_inicio, @hr_fim)`;
  const options = {
    query,
    params: { hr_inicio, hr_fim },
    useLegacySql: false,
  };
  try {
    await bigquery.query(options);
    return { status: 201, message: "Horário criado com sucesso!" };
  } catch (error) {
    throw new Error("Erro ao criar horário: " + error.message);
  }
}

async function getAllHorarios() {
  const query = `SELECT * FROM horarios`;
  try {
    const [rows] = await bigquery.query({ query });
    return rows;
  } catch (error) {
    throw new Error("Erro ao listar horários: " + error.message);
  }
}

async function updateHorario(id, hr_inicio, hr_fim) {
  const query = `UPDATE horarios SET hr_inicio = @hr_inicio, hr_fim = @hr_fim WHERE id = @id`;
  const options = {
    query,
    params: { id, hr_inicio, hr_fim },
    useLegacySql: false,
  };
  try {
    await bigquery.query(options);
    return { status: 200, message: "Horário atualizado com sucesso!" };
  } catch (error) {
    throw new Error("Erro ao atualizar horário: " + error.message);
  }
}

async function deleteHorario(id) {
  const query = `DELETE FROM horarios WHERE id = @id`;
  const options = {
    query,
    params: { id },
    useLegacySql: false,
  };
  try {
    await bigquery.query(options);
    return { status: 200, message: "Horário deletado com sucesso!" };
  } catch (error) {
    throw new Error("Erro ao deletar horário: " + error.message);
  }
}

module.exports = {
  createHorario,
  getAllHorarios,
  updateHorario,
  deleteHorario,
};
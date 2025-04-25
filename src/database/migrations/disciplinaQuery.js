const bigquery = require('../../lib/bigquery');

async function createNewDisciplina(nome, id_docente) {

  const query =
    `INSERT INTO sitefatecdsm-01-2025.SiteFatecDSM.disciplina (id, nome, id_docente)
      SELECT 
      COALESCE((SELECT MAX(id) FROM sitefatecdsm-01-2025.SiteFatecDSM.disciplina), 0) + 1,
     @nome, @id_docente;`;

  const options = {
    query,
    params: {
      nome: String(nome),
      id_docente: parseInt(id_docente)
    },
    useLegacySql: false
  };

  try {
    await bigquery.query(options);
    return { status: 201, mensagem: 'Disciplina inserida com sucesso!' };
  } catch (erro) {
    console.error('Erro ao inserir disciplina:', erro);
    return { status: 400, mensagem: 'Problemas com o banco de dados.' };
  }
}

async function searchAllDisciplinas() {

  const query =
    `SELECT * 
      FROM \`sitefatecdsm-01-2025.SiteFatecDSM.disciplina\`
      order by id asc`;

  const [rows] = await bigquery.query({ query });

  if (rows.length > 0) {

    return { status: 200, data: rows, };

  }

  if (rows.length <= 0) {

    return { status: 200, mensagem: "Sem disciplinas cadastradas." };

  }


}

async function disciplinaExistsOrNotById(id) {
  const query = `
      SELECT * FROM \`sitefatecdsm-01-2025.SiteFatecDSM.disciplina\`
      WHERE id = @id;
    `;

  const options = {
    query,
    params: {
      id: parseInt(id)
    },
    useLegacySql: false
  };

  const [rows] = await bigquery.query(options);

  return rows.length > 0;
}

async function updateExistingDisciplina(id, nome, id_docente) {
  const query = `
      UPDATE \`sitefatecdsm-01-2025.SiteFatecDSM.disciplina\`
      SET nome = @nome,
      id_docente = @id_docente
      WHERE id = @id;
    `;

  const options = {
    query,
    params: {
      id: parseInt(id),
      nome: String(nome),
      id_docente: parseInt(id_docente)
    },
    useLegacySql: false
  };


  try {
    const [rows] = await bigquery.query(options);
    return { status: 200, mensagem: 'Disciplina atualizada com sucesso!' };

  } catch (erro) {
    console.error('Erro ao alterar disciplina:', erro);
    return { status: 400, mensagem: 'Problemas com o banco de dados.' };
  }
}

async function deleteExistingDisciplina(id) {
  const query = `
      DELETE FROM \`sitefatecdsm-01-2025.SiteFatecDSM.disciplina\`
      WHERE id = @id;
    `;

  const options = {
    query,
    params: {
      id: parseInt(id),
    },
    useLegacySql: false
  };


  try {
    const [rows] = await bigquery.query(options);
    return { sucesso: true, mensagem: 'Disciplina atualizada com sucesso!' };

  } catch (erro) {
    console.error('Erro ao alterar curso:', erro);
    return { status: 400, mensagem: 'Problemas com o banco de dados.' };
  }
}

module.exports = {
  searchAllDisciplinas,
  createNewDisciplina,
  disciplinaExistsOrNotById,
  updateExistingDisciplina,
  deleteExistingDisciplina
};
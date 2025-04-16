const bigquery = require('../../lib/bigquery');

async function searchAllPeriodos() {

  const query =
    `SELECT * 
    FROM \`sitefatecdsm-01-2025.SiteFatecDSM.periodo\`
    order by id asc`;

  const [rows] = await bigquery.query({ query });

  if (rows.length > 0) {

    return { status: 200, data: rows, };

  }

  if (rows.length <= 0) {

    return { status: 200, mensagem: "Sem periodos cadastrados." };

  }


}

async function periodoExistsOrNotById(id) {
  const query = `
    SELECT * FROM \`sitefatecdsm-01-2025.SiteFatecDSM.periodo\`
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


async function updateExistingPeriodo(id, disciplina, docente, ambiente) {
  const query = `
    UPDATE \`sitefatecdsm-01-2025.SiteFatecDSM.periodo\`
    SET id_disciplina = @disciplina, id_docente_disciplina = @docente, id_ambiente = @ambiente 
    WHERE id = @id;
  `;

  const options = {
    query,
    params: {
      id: parseInt(id),
      disciplina: parseInt(disciplina),
      docente: parseInt(docente),
      ambiente: parseInt(ambiente),
    },
    useLegacySql: false
  };


  try {
    const [rows] = await bigquery.query(options);
    return { status: 200, mensagem: 'periodo atualizado com sucesso!' };

  } catch (erro) {
    console.error('Erro ao alterar periodo:', erro);
    return { status: 400, mensagem: 'Problemas com o banco de dados.' };
  }
}

async function deleteExistingPeriodo(id) {
  const query = `
    DELETE FROM \`sitefatecdsm-01-2025.SiteFatecDSM.periodo\`
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
    return { sucesso: true, mensagem: 'periodo atualizado com sucesso!' };

  } catch (erro) {
    console.error('Erro ao alterar periodo:', erro);
    return { status: 400, mensagem: 'Problemas com o banco de dados.' };
  }
}


module.exports = {
  searchAllPeriodos,
  periodoExistsOrNotById,
  updateExistingPeriodo,
  deleteExistingPeriodo
};
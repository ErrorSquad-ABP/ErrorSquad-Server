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
  const query =  `
  CALL \`sitefatecdsm-01-2025\`.\`SiteFatecDSM\`.\`alterar_periodo\`(
    @id,
    @disciplina,
    @docente,
    @ambiente);
    `;

  const options = {
    query,
    params: {
      id: parseInt(id),
      disciplina: String(disciplina),
      docente: String(docente),
      ambiente: String(ambiente),
    },
    useLegacySql: false
  };


  try {
    const [rows] = await bigquery.query(options);
     // Verificar se a coluna 'erro' existe no resultado
    if (rows.length > 0 && rows[0].erro) {
      throw new Error(rows[0].erro); // Lança o erro retornado pelo BigQuery
    }
    return { status: 200, mensagem: 'periodo atualizado com sucesso!' };

  } catch (erro) {
    console.error('Erro ao alterar periodo:', erro);
    return { status: 400, mensagem: 'Problemas com o banco de dados.' };
  }
}

module.exports = {
  searchAllPeriodos,
  periodoExistsOrNotById,
  updateExistingPeriodo,
};

const bigquery = require('../../lib/bigquery');

async function createNewCurso( nome ) {

  const query = 
   `INSERT INTO sitefatecdsm-01-2025.SiteFatecDSM.curso (id, nome)
    SELECT 
    COALESCE((SELECT MAX(id) FROM sitefatecdsm-01-2025.SiteFatecDSM.curso), 0) + 1,
   @nome;`;

  const options = {
    query,
    params: {
      nome: String(nome)
    },
  };

  try {
    await bigquery.query(options);
    return { sucesso: true, mensagem: 'Curso inserido com sucesso!' };
  } catch (err) {
    console.error('Erro ao inserir curso no BigQuery:', err);
    throw err;
  }
}


async function searchAllCursos() {
  const query = 
   `SELECT * 
    FROM \`sitefatecdsm-01-2025.SiteFatecDSM.curso\`
    LIMIT 10`;

  const [rows] = await bigquery.query({ query });
  return rows;
}

module.exports = {
  searchAllCursos,
  createNewCurso,
};
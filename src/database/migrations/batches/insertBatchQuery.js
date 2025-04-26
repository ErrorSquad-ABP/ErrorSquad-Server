const bigquery = require('../../../lib/bigquery');

async function insertBatch(tableName, columns, records) {

  if (!records || records.length === 0) return;

  // Preparação dos valores para inserção em lote
  const values = records.map((record, index) => {
    return `STRUCT(${index + 1} AS seq_num, '${record.nome.replace(/'/g, "''")}' AS nome)`;
  }).join(', ');
console.log(columns.join(', '))
  const query = `
    INSERT INTO sitefatecdsm-01-2025.SiteFatecDSM.${tableName} (id, ${columns.join(', ')})
    SELECT
      COALESCE((SELECT MAX(id) FROM sitefatecdsm-01-2025.SiteFatecDSM.${tableName}), 0) + seq_num,
       ${columns.map(col => col).join(', ')}
    FROM UNNEST([${values}]);
  `;


  const options = { query, useLegacySql: false };

  try {
    await bigquery.query(options);
    console.log(`Inseridos ${records.length} registros em ${tableName}`);
    return { status: 201, mensagem: `Registros inseridos com sucesso em ${tableName}!` };
  } catch (erro) {
    console.error(`Erro ao inserir em ${tableName}:`, erro);
    throw erro;
  }
}

module.exports = { insertBatch }
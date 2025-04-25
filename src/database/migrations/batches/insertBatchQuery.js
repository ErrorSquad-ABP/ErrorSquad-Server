const bigquery = require('../../../lib/bigquery');

async function insertBatch(tableName, columns, records) {
  if (!records || records.length === 0) return;
  
  // Preparação dos valores para inserção em lote
  const values = records.map(record => {
    const vals = columns.map(col => {
      const val = record[col];
      return typeof val === 'string' ? `'${val.replace(/'/g, "''")}'` : val;
    });
    return `(${vals.join(', ')})`;
  }).join(', ');
  
  const query = `
    INSERT INTO sitefatecdsm-01-2025.SiteFatecDSM.${tableName} (${columns.join(', ')})
    VALUES ${values};
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
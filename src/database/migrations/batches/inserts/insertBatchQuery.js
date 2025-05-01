const bigquery = require('../../../../lib/bigquery');

async function insertBatch(tableName, columns, records) {
  if (!records || records.length === 0) return;

  let values;
  
  // Generate the STRUCT values based on column types
  values = records.map((record, index) => {
    const structFields = [];
    structFields.push(`${index + 1} AS seq_num`);
    
    columns.forEach(col => {
      if (tableName === 'horario' && (col === 'hr_inicio' || col === 'hr_fim')) {
        structFields.push(`TIME '${record[col]}' AS ${col}`);
      } else if (record[col] !== undefined && record[col] !== null) {
        if (typeof record[col] === 'string') {
          structFields.push(`'${record[col].replace(/'/g, "''")}' AS ${col}`);
        } 
      } else {
        structFields.push(`NULL AS ${col}`);
      }
    });
    
    return `STRUCT(${structFields.join(', ')})`;
  }).join(', ');
  
  const query = `
    INSERT INTO sitefatecdsm-01-2025.SiteFatecDSM.${tableName} (id, ${columns.join(', ')})
    SELECT
      COALESCE((SELECT MAX(id) FROM sitefatecdsm-01-2025.SiteFatecDSM.${tableName}), 0) + seq_num,
      ${columns.map(col => col).join(', ')}
    FROM UNNEST ([${values}]);
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
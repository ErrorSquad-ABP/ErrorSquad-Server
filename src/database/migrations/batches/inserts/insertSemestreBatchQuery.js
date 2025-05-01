const bigquery = require('../../../../lib/bigquery');

async function insertSemestreBatch(tableName, columns, records) {
  if (!records || records.length === 0) return;
  
  // Process each record to extract just the values
  const values = records.map(record => {
    const recordValues = [];
    
    columns.forEach(col => {
      if (record[col] !== undefined && record[col] !== null) {
        if (typeof record[col] === 'string') {
          // Properly format string values with quotes
          recordValues.push(`'${record[col].replace(/'/g, "''")}'`);
        } else {
          // Format numeric or boolean values without quotes
          recordValues.push(`${record[col]}`);
        }
      }
    });
    
    return recordValues.join(', ');
  }).join(', ');
  
  console.log(records, 'semestre');
  
  const query = `
  CALL \`sitefatecdsm-01-2025\`.\`SiteFatecDSM\`.\`inserir_semestre\`(
      p_nivel = ${values[0]},
      p_ano = ${values[1]}, 
      p_sigla_curso = ${values[2]}, 
      p_nome_turno = ${values[3]}, 
      p_inicio = ${values[4]}, 
      p_fim = ${values[5]});
  );`;

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

module.exports = { insertSemestreBatch }
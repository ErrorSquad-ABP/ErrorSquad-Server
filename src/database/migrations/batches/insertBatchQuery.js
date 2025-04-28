const bigquery = require('../../../lib/bigquery');

async function insertBatch(tableName, columns, records) {
  if (!records || records.length === 0) return;

  let values;
  
  // Caso especial para a tabela 'horario'
  if (tableName === 'horario') {
    values = records.map((record, index) => {
      // Constrói o STRUCT com tratamento especial para colunas de hora
      const structFields = [];
      structFields.push(`${index + 1} AS seq_num`);
      
      columns.forEach(col => {
        if (col === 'hr_inicio' || col === 'hr_fim') {
          // Usando TIME para converter strings de hora
          structFields.push(`TIME '${record[col]}' AS ${col}`);
        } else if (record[col] && typeof record[col] === 'string') {
          // Tratamento para strings normais
          structFields.push(`'${record[col].replace(/'/g, "''")}' AS ${col}`);
        } else if (record[col] !== undefined && record[col] !== null) {
          // Valores numéricos ou booleanos
          structFields.push(`${record[col]} AS ${col}`);
        } else {
          // Valores nulos
          structFields.push(`NULL AS ${col}`);
        }
      });
      
      return `STRUCT(${structFields.join(', ')})`;
    }).join(', ');
  } else {
    // Comportamento original para outras tabelas
    values = records.map((record, index) => {
      return `STRUCT(${index + 1} AS seq_num, '${record.nome.replace(/'/g, "''")}' AS nome)`;
    }).join(', ');
  }

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
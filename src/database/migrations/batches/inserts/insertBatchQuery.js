const pool = require('../../../../lib/pool');

async function insertBatch(tableName, columns, records) {
  if (!records || records.length === 0) return;

  const placeholders = [];
  const values = [];

  records.forEach((record, i) => {
    const valuePlaceholders = [];

    columns.forEach((col, j) => {
      values.push(record[col]); // adiciona o valor real
      valuePlaceholders.push(`$${values.length}`); // $1, $2, ...
    });

    placeholders.push(`(${valuePlaceholders.join(', ')})`);
  });

  const query = `
    INSERT INTO errorsquad.${tableName} (${columns.join(', ')})
    VALUES ${placeholders.join(', ')};
  `;

  try {
    await pool.query(query, values);
    console.log(`Inseridos ${records.length} registros em ${tableName}`);
    return { status: 201, mensagem: `Registros inseridos com sucesso em ${tableName}!` };
  } catch (erro) {
    console.error(`Erro ao inserir em ${tableName}:`, erro);
    throw erro;
  }
}

module.exports = { insertBatch }
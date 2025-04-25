const fs = require('fs');
const readline = require('readline');

async function processCsv(filePath) {
  try {
    const namesOfTables = [];
    const tables = {};
    let headers = null;

    const fileStream = fs.createReadStream(filePath);
    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity
    });

    for await (const line of rl) {
      // Linha vazia - ignorar
      if (!line.trim()) continue;

      // Processar tabelas combinadas na mesma linha (ex.: #turno,#curso,#dia,)
      if (line.startsWith('#')) {
        const tableNames = line
          .split(',')
          .map(name => name.trim().replace('#', '').replace(',', ''))
          .filter(name => name);

        for (const tableName of tableNames) {
          if (!namesOfTables.includes(tableName)) {
            namesOfTables.push(tableName);
            tables[tableName] = [];
          }
        }

        headers = null; // Resetar headers para nova tabela
        continue;
      }

      // Processa headers ou linha de dados
      const values = line.split(',').map(val => val.trim());

      if (!headers) {
        // Esta é a linha de cabeçalho
        headers = values;
      } else {
        // Distribuir os valores entre as tabelas
        let startIndex = 0;

        for (const tableName of namesOfTables) {
          const tableHeaders = headers.slice(startIndex, startIndex + values.length / namesOfTables.length);
          const rowValues = values.slice(startIndex, startIndex + values.length / namesOfTables.length);

          const row = {};
          for (let i = 0; i < tableHeaders.length; i++) {
            row[tableHeaders[i]] = rowValues[i];
          }

          tables[tableName].push(row);
          startIndex += values.length / namesOfTables.length;
        }
      }
    }

    return { tables, namesOfTables };
  } catch (error) {
    console.error('Erro ao processar o CSV no service:', error);
    return { status: 500, message: 'Erro ao processar o CSV.' };
  }
}

module.exports = { processCsv };

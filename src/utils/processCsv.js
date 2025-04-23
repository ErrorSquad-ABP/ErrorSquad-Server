const fs = require('fs');
const readline = require('readline');

async function processCsv(filePath) {
  try {
    const tables = {};
    let currentTable = null;
    let headers = null;
    
    const fileStream = fs.createReadStream(filePath);
    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity
    });

    for await (const line of rl) {
      // Linha vazia - ignorar
      if (!line.trim()) continue;
      
      // Nova tabela começando
      if (line.startsWith('#')) {
        const tableName = line.substring(1).trim().replace('.csv', '');
        currentTable = tableName;
        tables[currentTable] = [];
        headers = null;
        continue;
      }
      
      // Se não temos uma tabela atual, ignorar a linha
      if (!currentTable) continue;
      
      // Processa headers ou linha de dados
      const values = line.split(',').map(val => val.trim());
      
      if (!headers) {
        // Esta é a linha de cabeçalho
        headers = values;
      } else {
        // Esta é uma linha de dados
        const row = {};
        for (let i = 0; i < headers.length; i++) {
          row[headers[i]] = values[i];
        }
        tables[currentTable].push(row);
      }
    }
    console.log(tables)
    return tables;
   

  } catch (error) {
    console.error('Erro ao processar o CSV no service:', error);
    return { status: 500, message: 'Erro ao processar o CSV.' };
  }
}

module.exports = { processCsv };
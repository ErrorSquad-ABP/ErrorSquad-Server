const fs = require('fs');
const readline = require('readline');

async function processCsv(filePath) {
  try {
    const namesOfTables = [];
    const tables = {};
    let headers = null;
    let currentTableColumn = {};

    const fileStream = fs.createReadStream(filePath, 'utf-8');
    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity
    });

    for await (const line of rl) {
      // Linha vazia - ignorar
      if (!line.trim()) continue;

      // Processar linhas com atributos e nomes de tabelas (ex.: nome_turno,nivel_semestre,ano_semestre)
      if (line.includes('-')) {
        const columnDefs = line.split(',').map(item => item.trim()).filter(item => item);
        
        currentTableColumn = {};
        headers = [];
        
        // Extrair os nomes das tabelas e seus atributos
        for (const def of columnDefs) {
          const [attribute, tableName] = def.split('-');
          
          if (!namesOfTables.includes(tableName)) {
            namesOfTables.push(tableName);
            tables[tableName] = [];
          }
          
          if (!currentTableColumn[tableName]) {
            currentTableColumn[tableName] = [];
          }
          
          currentTableColumn[tableName].push(attribute);
          headers.push(def);
        }
        
        continue;
      }

      // Processar linha de dados
      if (headers && headers.length > 0) {
        const values = line.split(',').map(val => val.trim());
        
        // Criar objetos para cada tabela a partir dos valores
        const tableValues = {};
        
        for (let i = 0; i < values.length; i++) {
          if (i < headers.length) {
            const [attribute, tableName] = headers[i].split('-');
            
            if (!tableValues[tableName]) {
              tableValues[tableName] = {};
            }
            
            tableValues[tableName][attribute] = values[i];
          }
        }
        
        // Adicionar os valores às tabelas
        for (const tableName in tableValues) {
          tables[tableName].push(tableValues[tableName]);
        }
      }
    }
    
    console.log(tables);
    console.log("-------------------------------");
    console.log(namesOfTables);
    return { tables, namesOfTables };
  } catch (error) {
    console.error('Erro ao processar o CSV no service:', error);
    return { status: 500, message: 'Erro ao processar o CSV.' };
  }
}

module.exports = { processCsv };
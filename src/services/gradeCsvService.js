const fs = require('fs');
const { processCsv } = require('../utils/processCsv')
const { processCSVData } = require('../utils/processCsvData');


async function processAndSaveCsv(filePath) {
  try {
    // Chama a lógica de processar o csv em object javascript
    const tables = await processCsv(filePath);
    // Chama a lógica de salvar no banco
    await processCSVData(tables);
    // Retorna sucesso
    return { status: 200, message: 'CSV processado e salvo no banco com sucesso!' };
  } catch (error) {
    console.error('Erro ao processar o CSV no service:', error);
    return { status: 500, message: 'Erro ao processar o CSV.' };
  } finally {
    // Remove o arquivo após o processamento
    fs.unlink(filePath, (err) => {
      if (err) console.error('Erro ao remover arquivo temporário:', err);
    });
  }
}

module.exports = { processAndSaveCsv };

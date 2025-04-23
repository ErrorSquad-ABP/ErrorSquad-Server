const fs = require('fs');
const csvParser = require('csv-parser');
const saveDataToDatabase = require('../utils/saveDataToDatabase')

async function processCsv(filePath) {
  try {
    const results = [];

    await new Promise((resolve, reject) => {
      fs.createReadStream(filePath)
        .pipe(csvParser())
        .on('data', (data) => results.push(data))
        .on('end', resolve)
        .on('error', reject);
    });

    // Chama a lógica de salvar no banco
    await saveDataToDatabase.saveDataToDatabase(results);

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

module.exports = { processCsv };

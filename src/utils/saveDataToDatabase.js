const fs = require('fs');
const path = require('path');
const { processCSV, processCSVData } = require('../database/migrations/gradeQuery');

/**
 * Lê e processa um arquivo CSV para salvar seus dados no banco de dados.
 * @param {string} csvFilePath - Caminho para o arquivo CSV.
 * @returns {Promise<Object>} Resultado da operação.
 */
async function saveDataFromCSV(csvFilePath) {
  try {
    console.log(`Iniciando processamento do arquivo CSV: ${csvFilePath}`);

    // Verifica se o arquivo existe
    if (!fs.existsSync(csvFilePath)) {
      throw new Error(`Arquivo CSV não encontrado: ${csvFilePath}`);
    }

    // Lê o conteúdo do arquivo
    const csvContent = fs.readFileSync(csvFilePath, 'utf8');

    // Processa o CSV e salva no banco de dados
    const result = await processCSV(csvContent);

    console.log('Arquivo CSV processado e dados salvos com sucesso.');
    return result;
  } catch (error) {
    console.error('Erro ao processar arquivo CSV:', error);
    throw error;
  }
}

/**
 * Salva dados já processados no banco de dados.
 * @param {Array<Object>} data - Array de objetos representando os dados a serem salvos.
 * @returns {Promise<Object>} Resultado da operação.
 */
async function saveDataToDatabase(data) {
  try {
    console.log(`Iniciando processamento de ${data.length} registros.`);

    // Valida os dados antes de processá-los
    if (!Array.isArray(data) || data.length === 0) {
      throw new Error('Dados inválidos: é necessário fornecer um array não vazio.');
    }

    // Processa os dados e os salva no banco de dados
    const result = await processCSVData(data);

    console.log('Dados processados e salvos com sucesso no banco.');
    return result;
  } catch (error) {
    console.error('Erro ao salvar dados no banco de dados:', error);
    throw error;
  }
}

/**
 * Função utilitária para salvar dados com diferentes estratégias.
 * @param {string|Array<Object>} input - Caminho para o arquivo CSV ou dados processados.
 * @returns {Promise<Object>} Resultado da operação.
 */
async function saveData(input) {
  if (typeof input === 'string') {
    return saveDataFromCSV(input);
  } else if (Array.isArray(input)) {
    return saveDataToDatabase(input);
  } else {
    throw new Error('Entrada inválida: deve ser um caminho para arquivo CSV ou um array de dados processados.');
  }
}

module.exports = {
  saveDataFromCSV,
  saveDataToDatabase,
  saveData,
};

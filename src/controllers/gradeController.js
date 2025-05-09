const csvService = require('../services/gradeCsvService');
const gradeService = require('../services/gradeService')

async function requestNewGrade(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'Arquivo CSV é obrigatório!' });
    }
    const result = await csvService.processAndSaveCsv(req.file.path);
    res.status(result.status).json(result.message);
  } catch (error) {
    console.error('Erro ao processar o CSV:', error);
    res.status(500).json({ erro: 'Erro interno ao processar o CSV' });
  }
}


async function listGrades(req, res) {
  try {
    const gradeInfos = await gradeService.getAllInfosToGrade();
    res.status(gradeInfos.status).json({
      message: gradeInfos.mensagem,
      data: gradeInfos.data
    });
  } catch (error) {
    console.error('Erro ao listar cursos:', error);
    res.status(500).json({ erro: 'Erro interno ao buscar cursos' });
  }
}

module.exports = {
  listGrades,
  requestNewGrade,
};
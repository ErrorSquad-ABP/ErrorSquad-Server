const csvService = require('../services/gradeCsvService');
const defaultStrings = require('../utils/firstLetterUppercase')

async function requestNewGrade(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'Arquivo CSV é obrigatório!' });
    }
    const result = await csvService.processCsv(req.file.path);
    res.status(result.status).json(result.message);
  } catch (error) {
    console.error('Erro ao processar o CSV:', error);
    res.status(500).json({ erro: 'Erro interno ao processar o CSV' });
  }
}


async function listGrades(req, res) {
  try {
    const cursos = await curso.getAllCurso();
    res.status(cursos.status).json({
      message: cursos.mensagem,
      data: cursos.data
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
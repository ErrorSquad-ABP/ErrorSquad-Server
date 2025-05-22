const csvService = require('../services/gradeCsvService');
const gradeService = require('../services/gradeService')
const gradeWebSocket = require('../services/webSockets/gradeWebSocket')

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

async function requestSwapPeriodos(req, res) {
  const card_1 = {
    id: req.body.id_card1,
    id_dia: req.body.id_dia_card1,
    id_horario: req.body.id_horario_card1,
  };

  const card_2 = {
    id: req.body.id_card2,
    id_dia: req.body.id_dia_card2,
    id_horario: req.body.id_horario_card2,
  };

  try {
    console.log("Dados enviados para service:")
    const result = await gradeService.swapPeriodosInGrade(card_1, card_2);
    
    // Emite via WebSocket (não bloqueante)
    console.log("Dados enviados para swapPeriodos:")
    gradeWebSocket.swapPeriodos(result.card1, result.card2).catch(console.error);
    
    // Retorna resposta HTTP
    return res.status(result.status).json({
      success: true,
      message: 'Troca realizada com sucesso'
    });
    
  } catch (error) {
    console.error('Erro ao atualizar periodo:', error);
    return res.status(500).json({ 
      success: false,
      error: 'Erro interno ao atualizar periodo' 
    });
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
  requestSwapPeriodos
};
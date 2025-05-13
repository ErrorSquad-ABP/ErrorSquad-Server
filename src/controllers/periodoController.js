const periodo = require('../database/entity/periodo');
const createPeriodoDto = require('../database/entity/dto/createPeriodoDto');

async function listPeriodos(req, res) {
  try {
    const periodos = await periodo.getAllPeriodo();
    res.status(periodos.status).json({
      message: periodos.mensagem,
      data: periodos.data
    });
  } catch (error) {
    console.error('Erro ao listar periodos:', error);
    res.status(500).json({ erro: 'Erro interno ao buscar periodos' });
  }
}

async function requestAlterPeriodo(req, res) {

  const alterPeriodoDto = new createPeriodoDto(req.body.id,
    req.body.nome_disciplina,
    req.body.nome_docente,
    req.body.nome_ambiente);

  try {
    const alterPeriodo = new periodo(alterPeriodoDto.id,
      null,
      null,
      alterPeriodoDto.nome_disciplina,
      alterPeriodoDto.nome_docente_disciplina,
      null,
      alterPeriodoDto.nome_ambiente);
    const updatePeriodo = await alterPeriodo.updatePeriodo(alterPeriodo);
    res.status(updatePeriodo.status).json(updatePeriodo);
  } catch (error) {
    console.error('Erro ao atualizar periodo:', error);
    res.status(500).json({ erro: 'Erro interno ao atualizar periodo' });
  }
}

module.exports = {
  listPeriodos,
  requestAlterPeriodo,
};
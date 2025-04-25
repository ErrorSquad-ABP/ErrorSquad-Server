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
    req.body.id_disciplina,
    req.body.id_docente_disciplina,
    req.body.id_ambiente);

  try {
    const alterPeriodo = new periodo(alterPeriodoDto.id,
      null,
      null,
      alterPeriodoDto.id_disciplina,
      alterPeriodoDto.id_docente_disciplina,
      null,
      alterPeriodoDto.id_ambiente);
    const updatePeriodo = await alterPeriodo.updatePeriodo(alterPeriodo);
    res.status(updatePeriodo.status).json(updatePeriodo);
  } catch (error) {
    console.error('Erro ao atualizar periodo:', error);
    res.status(500).json({ erro: 'Erro interno ao atualizar periodo' });
  }
}

async function requestDeletePeriodo(req, res) {

  const id = req.body.id;

  try {
    const deletePeriodo = await periodo.deletePeriodo(id);
    res.status(deletePeriodo.status).json(deletePeriodo);
  } catch (error) {
    console.error('Erro ao atualizar periodo:', error);
    res.status(500).json({ erro: 'Erro interno ao atualizar periodo' });
  }
}

module.exports = {
  listPeriodos,
  requestAlterPeriodo,
  requestDeletePeriodo
};
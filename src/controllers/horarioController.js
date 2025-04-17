const horario = require('../database/entity/horario');
const createHorarioDto = require('../database/entity/dto/createHorarioDto');


async function requestNewHorario(req, res) {

  const newHorarioDto = new createHorarioDto(req.body.hr_inicio, req.body.hr_fim);

  try {
    const newHorario = new horario(null, newHorarioDto.hr_inicio, newHorarioDto.hr_fim)
    const createHorario = await newHorario.createHorario(newHorario);
    res.status(createHorario.status).json(createHorario);
  } catch (error) {
    console.error('Erro ao criar horário:', error);
    res.status(500).json({ erro: 'Erro interno ao criar horário' });
  }
}


async function listHorarios(req, res) {
  
  try {
    const horarios = await horario.getAllHorario();
    res.status(horarios.status).json({
      message: horarios.mensagem,
      data: horarios.data
    });
  } catch (error) {
    console.error('Erro ao listar horários:', error);
    res.status(500).json({ erro: 'Erro interno ao buscar horários' });
  }
}

async function requestAlterHorario(req, res) {

  const alterHorario = new horario(req.body.id, req.body.hr_inicio, req.body.hr_fim);

  try {
    const updateHorario = await alterHorario.updateHorario(alterHorario);
    res.status(updateHorario.status).json(updateHorario);
  } catch (error) {
    console.error('Erro ao atualizar horário:', error);
    res.status(500).json({ erro: 'Erro interno ao atualizar horário' });
  }
}

async function requestDeleteHorario(req, res) {

  try {
    const deleteHorario = await horario.deleteHorario(req.body.id);
    res.status(deleteHorario.status).json(deleteHorario);
  } catch (error) {
    console.error('Erro ao deletar horário:', error);
    res.status(500).json({ erro: 'Erro interno ao deletar horário' });
  }
}

module.exports = {
  listHorarios,
  requestNewHorario,
  requestAlterHorario,
  requestDeleteHorario
};
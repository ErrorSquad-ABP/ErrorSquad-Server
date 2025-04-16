const turno = require('../database/entity/turno');
const createTurnoDto = require('../database/entity/dto/createTurnoDto');
const defaultStrings = require('../utils/firstLetterUppercase')

async function requestNewTurno(req, res) {

  const defaultNomeString = defaultStrings.firstLetterUppercase(req.body.nome);
  const newTurnoDto = new createTurnoDto(defaultNomeString);

  try {
    const newTurno = new turno(null, newTurnoDto.nome)

    const createTurno = await newTurno.createTurno(newTurno);
    res.status(createTurno.status).json(createTurno);
  } catch (error) {
    console.error('Erro ao criar turno:', error);
    res.status(500).json({ erro: 'Erro interno ao criar turno' });
  }
}

async function listTurnos(req, res) {

  try {
    const turnos = await turno.getAllTurno();
    res.status(turnos.status).json(turnos.data);
  } catch (error) {
    console.error('Erro ao listar turnos:', error);
    res.status(500).json({ erro: 'Erro interno ao buscar turnos' });
  }
}

async function requestAlterTurno(req, res) {

  const defaultNomeString = defaultStrings.firstLetterUppercase(req.body.nome);
  const alterTurno = new turno(req.body.id, defaultNomeString);

  try {
    const updateTurno = await alterTurno.updateTurno(alterTurno);
    res.status(updateTurno.status).json(updateTurno);
  } catch (error) {
    console.error('Erro ao atualizar turno:', error);
    res.status(500).json({ erro: 'Erro interno ao atualizar turno' });
  }
}

async function requestDeleteTurno(req, res) {

  const id = req.body.id;

  try {
    const deleteTurno = await turno.deleteTurno(id);
    res.status(deleteTurno.status).json(deleteTurno);
  } catch (error) {
    console.error('Erro ao atualizar turno:', error);
    res.status(500).json({ erro: 'Erro interno ao atualizar turno' });
  }
}

module.exports = {
  listTurnos,
  requestNewTurno,
  requestAlterTurno,
  requestDeleteTurno
};
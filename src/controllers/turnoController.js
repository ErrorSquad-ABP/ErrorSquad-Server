const turno = require('../database/entity/turno');
const createTurnoDto = require('../database/entity/dto/createTurnoDto');
const defaultStrings = require('../utils/firstLetterUppercase')

async function requestNewTurno(req, res) {

const defaultNomeString = defaultStrings.firstLetterUppercase(req.body.nome);

const newTurnoDto = new createTurnoDto( defaultNomeString );

  try {
    const newTurno = new turno(null, newTurnoDto.nome)

    const createTurno = await newTurno.createTurno( newTurno );
    res.status(createTurno.status).json(createTurno);
  } catch (error) {
    console.error('Erro ao criar turno:', error);
    res.status(500).json({ erro: 'Erro interno ao criar turno' });
  }
}

async function listTurnos(req, res) {
    try {
      const turnos = await turno.getAllTurno();
      res.status(200).json(turnos);
    } catch (error) {
      console.error('Erro ao listar turnos:', error);
      res.status(500).json({ erro: 'Erro interno ao buscar turnos' });
    }
  }
const docente = require('../database/entity/docente');
const createDocenteDto = require('../database/entity/dto/createDocenteDto');
const defaultStrings = require('../utils/firstLetterUppercase')

async function requestNewDocente(req, res) {

const defaultNomeString = defaultStrings.firstLetterUppercase(req.body.nome);

const newDocenteDto = new createDocenteDto( defaultNomeString );

  try {
    const newDocente = new docente(null, newDocenteDto.nome)

    const createDocente = await newDocente.createDocente( newDocente );
    res.status(createDocente.status).json(createDocente);
  } catch (error) {
    console.error('Erro ao criar docente:', error);
    res.status(500).json({ erro: 'Erro interno ao criar docente' });
  }
}

async function listDocente(req, res) {
    try {
      const docente = await docente.getAllDocente();
      res.status(200).json(docente);
    } catch (error) {
      console.error('Erro ao listar docente:', error);
      res.status(500).json({ erro: 'Erro interno ao buscar docente' });
    }
  }
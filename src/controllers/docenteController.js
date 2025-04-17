const docente = require('../database/entity/docente');
const createDocenteDto = require('../database/entity/dto/createDocenteDto');
const defaultStrings = require('../utils/firstLetterUppercase')

async function requestNewDocente(req, res) {

  const defaultNomeString = defaultStrings.firstLetterUppercase(req.body.nome);
  const newDocenteDto = new createDocenteDto(defaultNomeString, req.body.cor);

  try {
    const newDocente = new docente(null, newDocenteDto.nome, newDocenteDto.cor)
    const createDocente = await newDocente.createDocente(newDocente);
    res.status(createDocente.status).json(createDocente);
  } catch (error) {
    console.error('Erro ao criar docente:', error);
    res.status(500).json({ erro: 'Erro interno ao criar docente' });
  }
}

async function listDocente(req, res) {

  try {
    const docentes = await docente.getAllDocente();
    console.log(docentes)
    res.status(docentes.status).json({
      message: docentes.mensagem,
      data: docentes.data
    });
  } catch (error) {
    console.error('Erro ao listar docente:', error);
    res.status(500).json({ erro: 'Erro interno ao buscar docente' });
  }
}

async function requestAlterDocente(req, res) {

  const defaultNomeString = defaultStrings.firstLetterUppercase(req.body.nome);
  const alterDocente = new docente(req.body.id, defaultNomeString, req.body.cor);

  try {
    const updateDocente = await alterDocente.updateDocente(alterDocente);
    res.status(updateDocente.status).json(updateDocente);
  } catch (error) {
    console.error('Erro ao atualizar docente:', error);
    res.status(500).json({ erro: 'Erro interno ao atualizar docente' });
  }
}

async function requestDeleteDocente(req, res) {

  const id = req.body.id;

  try {
    const deleteDocente = await docente.deleteDocente(id);
    res.status(deleteDocente.status).json(deleteDocente);
  } catch (error) {
    console.error('Erro ao atualizar Docente:', error);
    res.status(500).json({ erro: 'Erro interno ao atualizar DOcente' });
  }
}

module.exports = {
  listDocente,
  requestNewDocente,
  requestAlterDocente,
  requestDeleteDocente
};
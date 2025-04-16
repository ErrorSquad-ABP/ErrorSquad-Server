const dia = require('../database/entity/dia');
const createDiaDto = require('../database/entity/dto/createDiaDto');
const defaultStrings = require('../utils/firstLetterUppercase')

async function requestNewDia(req, res) {

  const defaultNomeString = defaultStrings.firstLetterUppercase(req.body.nome);
  const newDiaDto = new createDiaDto(defaultNomeString);

  try {
    const newDia = new dia(null, newDiaDto.nome)
    const createDia = await newDia.createDia(newDia);
    res.status(createDia.status).json(createDia);
  } catch (error) {
    console.error('Erro ao criar dia:', error);
    res.status(500).json({ erro: 'Erro interno ao criar dia' });
  }
}

async function listDias(req, res) {

  try {
    const dias = await dia.getAllDia();
    res.status(dias.status).json(dias.data);
  } catch (error) {
    console.error('Erro ao listar dias:', error);
    res.status(500).json({ erro: 'Erro interno ao buscar dias' });
  }
}

async function requestAlterDia(req, res) {

  const defaultNomeString = defaultStrings.firstLetterUppercase(req.body.nome);
  const alterDia = new dia(req.body.id, defaultNomeString);

  try {
    const updateDia = await alterDia.updateDia(alterDia);
    res.status(updateDia.status).json(updateDia);
  } catch (error) {
    console.error('Erro ao atualizar dia:', error);
    res.status(500).json({ erro: 'Erro interno ao atualizar dia' });
  }
}

async function requestDeleteDia(req, res) {
  
  const id = req.body.id;

  try {
    const deleteDia = await dia.deleteDia(id);
    res.status(deleteDia.status).json(deleteDia);
  } catch (error) {
    console.error('Erro ao deletar dia:', error);
    res.status(500).json({ erro: 'Erro interno ao deletar dia' });
  }
}

module.exports = {
  listDias,
  requestNewDia,
  requestAlterDia,
  requestDeleteDia
}; 

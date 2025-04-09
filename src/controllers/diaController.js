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

sync function listDias(req, res) {
  try {
    const dias = await dia.getAllDia();
    res.status(200).json(dias);
  } catch (error) {
    console.error('Erro ao listar dias:', error);
    res.status(500).json({ erro: 'Erro interno ao buscar dias' });
  }
}

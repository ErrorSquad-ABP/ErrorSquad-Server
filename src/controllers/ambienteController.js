const ambiente = require('../database/entity/ambiente');
const createAmbienteDto = require('../database/entity/dto/createAmbienteDto');
const defaultStrings = require('../utils/firstLetterUppercase');

async function requestNewAmbiente(req, res) {
  const defaultNomeString = defaultStrings.firstLetterUppercase(req.body.nome);
  const newAmbienteDto = new createAmbienteDto(defaultNomeString);

  try {
    const newAmbiente = new ambiente(null, newAmbienteDto.nome);
    const createAmbiente = await newAmbiente.createAmbiente(newAmbiente);
    res.status(createAmbiente.status).json(createAmbiente);
  } catch (error) {
    console.error('Erro ao criar ambiente:', error);
    res.status(500).json({ erro: 'Erro interno ao criar ambiente' });
  }
}

async function listAmbientes(req, res) {
  try {
    const ambientes = await ambiente.getAllAmbiente();
    res.status(200).json(ambientes);
  } catch (error) {
    console.error('Erro ao listar ambientes:', error);
    res.status(500).json({ erro: 'Erro interno ao buscar ambientes' });
  }
  
}
async function requestAlterAmbiente(req, res) {
  const defaultNomeString = defaultStrings.firstLetterUppercase(req.body.nome);
  const alterAmbiente = new ambiente(req.body.id, defaultNomeString);

  try {
    const updateAmbiente = await alterAmbiente.updateAmbiente(alterAmbiente);
    res.status(updateAmbiente.status).json(updateAmbiente);
  } catch (error) {
    console.error('Erro ao atualizar ambiente:', error);
    res.status(500).json({ erro: 'Erro interno ao atualizar ambiente' });
  }
}

const semestre = require('../database/entity/semestre');
const createSemestreDto = require('../database/entity/dto/createSemestreDto');
const defaultStrings = require('../utils/firstLetterUppercase');

async function requestNewSemestre(req, res) {
  const defaultNomeString = defaultStrings.firstLetterUppercase(req.body.nome);

  const newSemestreDto = new createSemestreDto(defaultNomeString);

  try {
    const newSemestre = new semestre(null, newSemestreDto.nome);

    const createSemestre = await newSemestre.createSemestre(newSemestre);
    res.status(createSemestre.status).json(createSemestre);
  } catch (error) {
    console.error("Erro ao criar semestre:", error);
    res.status(500).json({ erro: "Erro interno ao criar semestre" });
  }
}
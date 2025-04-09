const semestre = require('../database/entity/semestre');
const createSemestreDto = require('../database/entity/dto/createSemestreDto');
const defaultStrings = require('../utils/firstLetterUppercase');

async function requestNewSemestre(req, res) {
  const defaultNomeString = defaultStrings.firstLetterUppercase(req.body.nome);

  const newSemestreDto = new createSemestreDto(defaultNomeString);

  try {
    const newSemestre = new semestre(null, newSemestreDto.nivel);

    const createSemestre = await newSemestre.createSemestre(newSemestre);
    res.status(createSemestre.status).json(createSemestre);
  } catch (error) {
    console.error("Erro ao criar semestre:", error);
    res.status(500).json({ erro: "Erro interno ao criar semestre" });
  }
}

async function listSemestre(req, res) {
    try {
      const semestres = await semestres.getAllSemestre();
      res.status(200).json(semestre);
    } catch (error) {
      console.error("Erro ao listar semestre:", error);
      res.status(500).json({ erro: "Erro interno ao buscar semestres" });
    }
  }

  async function requestAlterSemestre(req, res) {
    const defaultNomeString = defaultStrings.firstLetterUppercase(req.body.nome);
  
    const alterSemestre = new semestre(req.body.id, defaultNomeString);
  
    try {
      const updateSemestre = await alterSemestre.updateSemestre(alterSemestre);
      res.status(updateSemestre.status).json(updateSemestre);
    } catch (error) {
      console.error("Erro ao atualizar semestre:", error);
      res.status(500).json({ erro: "Erro interno ao atualizar semestre" });
    }
  }
  
  async function requestDeleteSemestre(req, res) {
    const id = req.body.id;
  
    try {
      const deleteSemestre = await semestre.deleteSemestre(id);
      res.status(deleteSemestre.status).json(deleteSemestre);
    } catch (error) {
      console.error("Erro ao atualizar semestre:", error);
      res.status(500).json({ erro: "Erro interno ao atualizar semestre" });
    }
  }
  
  module.exports = {
    listSemestre,
    requestNewSemestre,
    requestAlterSemestre,
    requestDeleteSemestre,
  };
  
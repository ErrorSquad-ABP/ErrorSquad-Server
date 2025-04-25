const semestre = require('../database/entity/semestre');
const createSemestreDto = require('../database/entity/dto/createSemestreDto');
const defaultStrings = require('../utils/firstLetterUppercase');

async function requestNewSemestre(req, res) {

  const newSemestreDto = new createSemestreDto(req.body.nivel, req.body.ano, req.body.id_curso, req.body.id_turno);

  try {
    const newSemestre = new semestre(null, newSemestreDto.nivel, newSemestreDto.ano, newSemestreDto.id_curso, newSemestreDto.id_turno)
    const createSemestre = await newSemestre.createSemestre(newSemestre);
    res.status(createSemestre.status).json(createSemestre);
  } catch (error) {
    console.error('Erro ao criar semestre:', error);
    res.status(500).json({ erro: 'Erro interno ao criar semestre' });
  }
}

async function listSemestres(req, res) {

  try {
    const semestres = await semestre.getAllSemestre();
    res.status(semestres.status).json({
      message: semestres.mensagem,
      data: semestres.data
    });
  } catch (error) {
    console.error('Erro ao listar semestres:', error);
    res.status(500).json({ erro: 'Erro interno ao buscar semestres' });
  }
}

async function requestAlterSemestre(req, res) {

  const alterSemestre = new semestre(req.body.id, req.body.nivel, req.body.ano, req.body.id_curso, req.body.id_turno);

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
  listSemestres,
  requestNewSemestre,
  requestAlterSemestre,
  requestDeleteSemestre,
};

const curso = require('../database/entity/curso');
const cursoDto = require('../database/entity/dto/createCursoDto');

async function requestNewCurso(req, res) {

  const {id, nome } = req.body;

  try {
    const newCurso = await curso.createCurso( id, nome );
    res.status(200).json(newCurso);
  } catch (error) {
    console.error('Erro ao criar curso:', error);
    res.status(500).json({ erro: 'Erro interno ao criar curso' });
  }
}


async function listCursos(req, res) {
  try {
    const cursos = await curso.getAllCurso();
    res.status(200).json(cursos);
  } catch (error) {
    console.error('Erro ao listar cursos:', error);
    res.status(500).json({ erro: 'Erro interno ao buscar cursos' });
  }
}

module.exports = {
  listCursos,
  requestNewCurso,
};
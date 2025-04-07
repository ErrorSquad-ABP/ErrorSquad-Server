const curso = require('../database/entity/curso');
const createCursoDto = require('../database/entity/dto/createCursoDto');

async function requestNewCurso(req, res) {

const newCursoDto = new createCursoDto( req.body.nome );

  try {
    const newCurso = new curso(null, newCursoDto.nome)

    const createCurso = await newCurso.createCurso( newCurso );
    res.status(createCurso.status).json(createCurso);
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

async function requestAlterCurso(req, res) {

  const alterCurso = new curso( req.body.id, req.body.nome );
  
    try {
      const updateCurso = await alterCurso.updateCurso( alterCurso );
      res.status(updateCurso.status).json(updateCurso);
    } catch (error) {
      console.error('Erro ao atualizar curso:', error);
      res.status(500).json({ erro: 'Erro interno ao atualizar curso' });
    }
  }

  async function requestDeleteCurso(req, res) {

    const id = req.body.id;
    
      try {
        const deleteCurso = await curso.deleteCurso( id );
        res.status(deleteCurso.status).json(deleteCurso);
      } catch (error) {
        console.error('Erro ao atualizar curso:', error);
        res.status(500).json({ erro: 'Erro interno ao atualizar curso' });
      }
    }

module.exports = {
  listCursos,
  requestNewCurso,
  requestAlterCurso,
  requestDeleteCurso
};
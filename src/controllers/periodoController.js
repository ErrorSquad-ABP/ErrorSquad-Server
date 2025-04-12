const periodo = require('../database/entity/periodo');
const createPeriodoDto = require('../database/entity/dto/createPeriodoDto');

async function requestNewPeriodo(req, res) {

const newPeriodoDto = new createPeriodoDto( req.body.id_disciplina , 
                                            req.body.id_docente_disciplina , 
                                            req.body.id_ambiente);

  try {
    const newPeriodo = new periodo(null, 
                                    null,
                                    null,
                                    newPeriodoDto.id_disciplina ,
                                    newPeriodoDto.id_docente_disciplina ,
                                    null,
                                    newPeriodoDto.id_ambiente
    )

    const createPeriodo = await newPeriodo.createPeriodo( newPeriodo );
    res.status(createPeriodo.status).json(createPeriodo);
  } catch (error) {
    console.error('Erro ao criar periodo:', error);
    res.status(500).json({ erro: 'Erro interno ao criar periodo' });
  }
}


async function listPeriodos(req, res) {
  try {
    const periodos = await periodo.getAllPeriodo();
    res.status(200).json(periodos);
  } catch (error) {
    console.error('Erro ao listar periodos:', error);
    res.status(500).json({ erro: 'Erro interno ao buscar periodos' });
  }
}

async function requestAlterPeriodo(req, res) {

  const alterPeriodoDto = new createPeriodoDto( req.body.id_disciplina , 
                                              req.body.id_docente_disciplina , 
                                              req.body.id_ambiente);

  const alterPeriodo = new periodo( req.body.id,
                                    null,
                                    null,
                                    alterPeriodoDto.id_disciplina ,
                                    alterPeriodoDto.id_docente_disciplina ,
                                    null,
                                    alterPeriodoDto.id_ambiente
   );
  
    try {
      const updatePeriodo = await alterPeriodo.updatePeriodo( alterPeriodo );
      res.status(updatePeriodo.status).json(updatePeriodo);
    } catch (error) {
      console.error('Erro ao atualizar periodo:', error);
      res.status(500).json({ erro: 'Erro interno ao atualizar periodo' });
    }
  }

  async function requestDeletePeriodo(req, res) {

    const id = req.body.id;
    
      try {
        const deletePeriodo = await periodo.deletePeriodo( id );
        res.status(deletePeriodo.status).json(deletePeriodo);
      } catch (error) {
        console.error('Erro ao atualizar periodo:', error);
        res.status(500).json({ erro: 'Erro interno ao atualizar periodo' });
      }
    }

module.exports = {
  listPeriodos,
  requestNewPeriodo,
  requestAlterPeriodo,
  requestDeletePeriodo
};
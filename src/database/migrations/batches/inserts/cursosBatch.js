const { insertBatch } = require('../insertBatchQuery')
const createCursoDto = require('../../../entity/dto/createCursoDto');
const curso = require('../../../entity/curso');
const defaultStrings = require('../../../../utils/firstLetterUppercase')


async function insertCursosEmLote(cursos) {
  let allEntities = []; // Inicializando como um array

  for (let i = 0; i < cursos.length; i++) {
    const dtoEntity = new createCursoDto(cursos[i].nome); // Criando o DTO
    const entity = new curso(null, dtoEntity.nome); // Criando a entidade
    allEntities.push(entity); // Adicionando ao array

  }
  // Mapeando as entidades para o formato esperado pelo insertBatch
    const records = allEntities.map(curso => ({
      id: null,
      nome: defaultStrings.firstLetterUppercase(curso.nome)
    }));
  
  // Chamando a função insertBatch
  return await insertBatch('curso', [ 'nome' ], records);
}

module.exports = { insertCursosEmLote }
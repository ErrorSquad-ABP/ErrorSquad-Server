const { insertBatch } = require('../batches/inserts/insertBatchQuery')
const createCursoDto = require('../../entity/dto/createCursoDto');
const curso = require('../../entity/curso');
const defaultStrings = require('../../../utils/firstLetterUppercase')


async function insertCursosEmLote(cursos) {
  let allEntities = []; // Inicializando como um array

  for (let i = 0; i < cursos.length; i++) {
    const dtoEntity = new createCursoDto(cursos[i].nome, cursos[i].coordenador, cursos[i].sigla, cursos[i].inicio, cursos[i].fim ); // Criando o DTO
    const entity = new curso(null, dtoEntity.nome, dtoEntity.coordenador, dtoEntity.sigla,dtoEntity.inicio, dtoEntity.fim); // Criando a entidade
    allEntities.push(entity); // Adicionando ao array

  }
  // Mapeando as entidades para o formato esperado pelo insertBatch
    const records = allEntities.map(curso => ({
      id: null,
      nome: defaultStrings.firstLetterUppercase(curso.nome),
      coordenador: defaultStrings.firstLetterUppercase(curso.coordenador),
      sigla: defaultStrings.firstLetterUppercase(curso.sigla),
      inicio: curso.inicio,
      fim: curso.fim
    }));
  
  // Chamando a função insertBatch
  return await insertBatch('curso', [ 'nome', 'coordenador', 'sigla', 'inicio', 'fim' ], records);
}

module.exports = { insertCursosEmLote }
const { insertSemestreBatch } = require('../batches/inserts/insertSemestreBatchQuery')
const createSemestreDto = require('../../entity/dto/createSemestreDto');
const semestre = require('../../entity/semestre');
const defaultStrings = require('../../../utils/firstLetterUppercase')


async function insertSemestresEmLote(semestres) {
  let allEntities = []; // Inicializando como um array

  for (let i = 0; i < semestres.length; i++) {
    const dtoEntity = new createSemestreDto(semestres[i].nivel, semestres[i].ano, semestres[i].id_curso, semestres[i].id_turno, semestres[i].inicio, semestres[i].fim); // Criando o DTO
    const entity = new semestre(null, dtoEntity.nivel, dtoEntity.ano, dtoEntity.nome_curso, dtoEntity.nome_turno, dtoEntity.inicio, dtoEntity.fim); // Criando a entidade
    allEntities.push(entity); // Adicionando ao array

  }
  // Mapeando as entidades para o formato esperado pelo insertBatch
    const records = allEntities.map(semestre => ({
      id: null,
      nivel: semestre.nivel,
      ano: semestre.ano,
      nome_curso: defaultStrings.firstLetterUppercase(semestre.nome_curso),
      nome_turno: defaultStrings.firstLetterUppercase(semestre.nome_turno)
    }));
  
  // Chamando a função insertBatch
  return await insertSemestreBatch('semestre_cronograma', [ 'nivel', 'ano', 'id_curso', 'id_turno', 'inicio', 'fim' ], records);
}

module.exports = { insertSemestresEmLote }
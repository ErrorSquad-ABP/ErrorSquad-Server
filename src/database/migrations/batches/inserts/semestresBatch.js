const { insertBatch } = require('../insertBatchQuery')
const createSemestreDto = require('../../../entity/dto/createSemestreDto');
const semestre = require('../../../entity/semestre');
const defaultStrings = require('../../../../utils/firstLetterUppercase')


async function insertSemestresEmLote(semestres) {
  let allEntities = []; // Inicializando como um array

  for (let i = 0; i < semestres.length; i++) {
    const dtoEntity = new createSemestreDto(semestres[i].nivel, semestres[i].ano, semestres[i].id_curso, semestres[i].id_turno); // Criando o DTO
    const entity = new semestre(null, dtoEntity.nivel, dtoEntity.ano, dtoEntity.id_curso, dtoEntity.id_turno); // Criando a entidade
    allEntities.push(entity); // Adicionando ao array

  }
  // Mapeando as entidades para o formato esperado pelo insertBatch
    const records = allEntities.map(semestre => ({
      id: null,
      nivel: semestre.nivel,
      ano: semestre.ano,
      id_curso: 6,
      id_turno: 6
    }));
  
  // Chamando a função insertBatch
  return await insertBatch('semestre_cronograma', [ 'nivel', 'ano', 'id_curso', 'id_turno' ], records);
}

module.exports = { insertSemestresEmLote }
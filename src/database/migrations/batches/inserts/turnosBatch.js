const { insertBatch } = require('../insertBatchQuery')
const createTurnoDto = require('../../../entity/dto/createTurnoDto');
const turno = require('../../../entity/turno');
const defaultStrings = require('../../../../utils/firstLetterUppercase')


async function insertTurnosEmLote(turnos) {
  let allEntities = []; // Inicializando como um array

  for (let i = 0; i < turnos.length; i++) {
    const dtoEntity = new createTurnoDto(turnos[i].nome); // Criando o DTO
    const entity = new turno(null, dtoEntity.nome); // Criando a entidade
    allEntities.push(entity); // Adicionando ao array

  }
  // Mapeando as entidades para o formato esperado pelo insertBatch
    const records = allEntities.map(turno => ({
      id: null,
      nome: defaultStrings.firstLetterUppercase(turno.nome)
    }));
  
  // Chamando a função insertBatch
  return await insertBatch('turno', [ 'nome' ], records);
}

module.exports = { insertTurnosEmLote }
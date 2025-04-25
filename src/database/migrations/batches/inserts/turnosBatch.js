const { insertBatch } = require('../insertBatchQuery')
const createTurnoDto = require('../../../entity/dto/createTurnoDto');
const turno = require('../../../entity/turno');

async function insertTurnosEmLote(turnos) {
  let allEntities = []; // Inicializando como um array

  for (let i = 0; i < turnos.length; i++) { // Corrigida a condição do loop
    const dtoEntity = new createTurnoDto(turnos[i].nome); // Criando o DTO
    const entity = new turno(null, dtoEntity.nome); // Criando a entidade
    allEntities.push(entity); // Adicionando ao array
    
  }
  // Mapeando as entidades para o formato esperado pelo insertBatch
  const records = turnos.map(turno => ({
    id: turno.id, 
    nome: turno.nome
  }));
  // Chamando a função insertBatch
  return await insertBatch('turno', ['id', 'nome'], records);
}

module.exports = { insertTurnosEmLote }
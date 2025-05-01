const { insertBatch } = require('../batches/inserts/insertBatchQuery')
const createDiaDto = require('../../entity/dto/createDiaDto');
const dia = require('../../entity/dia');
const defaultStrings = require('../../../utils/firstLetterUppercase')


async function insertDiasEmLote(dias) {
  let allEntities = []; // Inicializando como um array

  for (let i = 0; i < dias.length; i++) {
    const dtoEntity = new createDiaDto(dias[i].nome); // Criando o DTO
    const entity = new dia(null, dtoEntity.nome); // Criando a entidade
    allEntities.push(entity); // Adicionando ao array

  }
  // Mapeando as entidades para o formato esperado pelo insertBatch
    const records = allEntities.map(dia => ({
      id: null,
      nome: defaultStrings.firstLetterUppercase(dia.nome)
    }));
  
  // Chamando a função insertBatch
  return await insertBatch('dia', [ 'nome' ], records);
}

module.exports = { insertDiasEmLote }
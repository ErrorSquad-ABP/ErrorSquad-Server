const { insertBatch } = require('../insertBatchQuery')
const createAmbienteDto = require('../../../entity/dto/createAmbienteDto');
const ambiente = require('../../../entity/ambiente');
const defaultStrings = require('../../../../utils/firstLetterUppercase')


async function insertAmbientesEmLote(ambientes) {
  let allEntities = []; // Inicializando como um array

  for (let i = 0; i < ambientes.length; i++) {
    const dtoEntity = new createAmbienteDto(ambientes[i].nome); // Criando o DTO
    const entity = new ambiente(null, dtoEntity.nome); // Criando a entidade
    allEntities.push(entity); // Adicionando ao array

  }
  // Mapeando as entidades para o formato esperado pelo insertBatch
    const records = allEntities.map(ambiente => ({
      id: null,
      nome: defaultStrings.firstLetterUppercase(ambiente.nome)
    }));
  
  // Chamando a função insertBatch
  return await insertBatch('ambiente', [ 'nome' ], records);
}

module.exports = { insertAmbientesEmLote }
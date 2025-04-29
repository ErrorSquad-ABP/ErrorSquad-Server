const { insertBatch } = require('../insertBatchQuery')
const createDocenteDto = require('../../../entity/dto/createDocenteDto');
const docente = require('../../../entity/docente');
const defaultStrings = require('../../../../utils/firstLetterUppercase')


async function insertDocentesEmLote(docentes) {
  let allEntities = []; // Inicializando como um array

  for (let i = 0; i < docentes.length; i++) {
    const dtoEntity = new createDocenteDto(docentes[i].nome, docentes[i].cor); // Criando o DTO
    const entity = new docente(null, dtoEntity.nome, dtoEntity.cor); // Criando a entidade
    allEntities.push(entity); // Adicionando ao array

  }
  // Mapeando as entidades para o formato esperado pelo insertBatch
    const records = allEntities.map(docente => ({
      id: null,
      nome: defaultStrings.firstLetterUppercase(docente.nome),
      cor: defaultStrings.firstLetterUppercase(docente.cor)
    }));
  console.log("docentebatch", records)
  // Chamando a função insertBatch
  return await insertBatch('docente', [ 'nome', 'cor' ], records);
}

module.exports = { insertDocentesEmLote }
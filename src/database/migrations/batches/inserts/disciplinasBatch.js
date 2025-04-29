const { insertBatch } = require('../insertBatchQuery')
const createDisciplinaDto = require('../../../entity/dto/createDisciplinaDto');
const disciplina = require('../../../entity/disciplina');
const defaultStrings = require('../../../../utils/firstLetterUppercase')


async function insertDisciplinasEmLote(disciplinas) {
  let allEntities = []; // Inicializando como um array

  for (let i = 0; i < disciplinas.length; i++) {
    const dtoEntity = new createDisciplinaDto(disciplinas[i].nome); // Criando o DTO
    const entity = new disciplina(null, dtoEntity.nome); // Criando a entidade
    allEntities.push(entity); // Adicionando ao array

  }
  // Mapeando as entidades para o formato esperado pelo insertBatch
    const records = allEntities.map(disciplina => ({
      id: null,
      nome: defaultStrings.firstLetterUppercase(disciplina.nome),
      id_docente: 1,
      id_curso: 1
    }));
  
  // Chamando a função insertBatch
  return await insertBatch('disciplina', [ 'nome', 'id_docente', 'id_curso' ], records);
}

module.exports = { insertDisciplinasEmLote }
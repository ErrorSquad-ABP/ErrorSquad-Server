const { insertDisciplinaBatch } = require('../batches/inserts/insertDisciplinaBatchQuery')
const createDisciplinaDto = require('../../entity/dto/createDisciplinaDto');
const disciplina = require('../../entity/disciplina');
const defaultStrings = require('../../../utils/firstLetterUppercase')


async function insertDisciplinasEmLote(disciplinas) {
  let allEntities = []; // Inicializando como um array

  for (let i = 0; i < disciplinas.length; i++) {
    const dtoEntity = new createDisciplinaDto(disciplinas[i].nome, disciplinas[i].nome_docente, disciplinas[i].nome_curso ); // Criando o DTO
    const entity = new disciplina(null, dtoEntity.nome, dtoEntity.nome_docente, dtoEntity.nome_curso); // Criando a entidade
    allEntities.push(entity); // Adicionando ao array

  }
  // Mapeando as entidades para o formato esperado pelo insertBatch
    const records = allEntities.map(disciplina => ({
      id: null,
      nome: defaultStrings.firstLetterUppercase(disciplina.nome),
      nome_docente: defaultStrings.firstLetterUppercase(disciplina.nome_docente),
      sigla_curso: defaultStrings.firstLetterUppercase(disciplina.nome_curso)
    }));
  // Chamando a função insertBatch
  return await insertDisciplinaBatch('disciplina', [ 'nome', 'nome_docente', 'sigla_curso' ], records);
}

module.exports = { insertDisciplinasEmLote }
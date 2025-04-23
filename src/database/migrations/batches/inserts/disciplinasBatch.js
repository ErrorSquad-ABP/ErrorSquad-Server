const { insertBatch } = require ('../insertBatchQuery')

async function insertDisciplinasEmLote(disciplinas) {
  return insertBatch('disciplina', ['id', 'nome', 'id_docente'], disciplinas);
}

module.exports = { insertDisciplinasEmLote }
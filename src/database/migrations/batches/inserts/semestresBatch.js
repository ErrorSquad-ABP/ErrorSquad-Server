const { insertBatch } = require ('../insertBatchQuery')

async function insertSemestresEmLote(semestres) {
  return insertBatch('semestre_cronograma', ['id', 'nivel', 'ano', 'id_curso', 'id_turno'], semestres);
}

module.exports = { insertSemestresEmLote }
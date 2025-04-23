const { insertBatch } = require ('../insertBatchQuery')

async function insertCursosEmLote(cursos) {
  return insertBatch('curso', ['id', 'nome'], cursos);
}

module.exports = { insertCursosEmLote }
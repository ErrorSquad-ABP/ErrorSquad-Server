const { insertBatch } = require ('../insertBatchQuery')

async function insertDocentesEmLote(docentes) {
  return insertBatch('docente', ['id', 'nome', 'cor'], docentes);
}

module.exports = { insertDocentesEmLote }
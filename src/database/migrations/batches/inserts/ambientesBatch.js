const { insertBatch } = require ('../insertBatchQuery')

async function insertAmbientesEmLote(ambientes) {
  return insertBatch('ambiente', ['id', 'nome'], ambientes);
}

module.exports = { insertAmbientesEmLote }
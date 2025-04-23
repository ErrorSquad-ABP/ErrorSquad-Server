const { insertBatch } = require ('../insertBatchQuery')

async function insertDiasEmLote(dias) {
  return insertBatch('dia', ['id', 'nome'], dias);
}

module.exports = { insertDiasEmLote }
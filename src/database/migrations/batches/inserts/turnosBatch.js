const { insertBatch }= require ('../insertBatchQuery')

async function insertTurnosEmLote(turnos) {
  return insertBatch('turno', ['id', 'nome'], turnos);
}

module.exports = { insertTurnosEmLote }
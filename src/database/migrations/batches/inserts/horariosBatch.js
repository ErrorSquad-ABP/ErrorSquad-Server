const { insertBatch } = require ('../insertBatchQuery')

async function insertHorariosEmLote(horarios) {
  return insertBatch('horario', ['id', 'hr_inicio', 'hr_fim'], horarios);
}

module.exports = { insertHorariosEmLote }
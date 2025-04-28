const { insertBatch } = require('../insertBatchQuery')
const createHorarioDto = require('../../../entity/dto/createHorarioDto');
const horario = require('../../../entity/horario');
const formatTime = require('../../../../utils/formatTime')


async function insertHorariosEmLote(horarios) {
  let allEntities = []; // Inicializando como um array

  for (let i = 0; i < horarios.length; i++) {
    const dtoEntity = new createHorarioDto(horarios[i].hr_inicio, horarios[i].hr_fim); // Criando o DTO
    const entity = new horario(null, dtoEntity.hr_inicio,dtoEntity.hr_fim); // Criando a entidade
    allEntities.push(entity); // Adicionando ao array

  }
  // Mapeando as entidades para o formato esperado pelo insertBatch
    const records = allEntities.map(horario => ({
      hr_inicio:formatTime.formatTime(horario.hr_inicio),
      hr_fim:formatTime.formatTime(horario.hr_fim)
    }));
  // Chamando a função insertBatch
  return await insertBatch('horario', [ 'hr_inicio', 'hr_fim' ], records);
}

module.exports = { insertHorariosEmLote }
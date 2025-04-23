const { insertTurnosEmLote } = require('../database/migrations/batches/inserts/turnosBatch')
const { insertCursosEmLote } = require('../database/migrations/batches/inserts/cursosBatch')
const { insertSemestresEmLote } = require('../database/migrations/batches/inserts/semestresBatch')

// Processador principal dos dados CSV
async function processCSVData(data) {
  try {
    
    console.log(`Iniciando processamento de ${data.length} registros.`);

    // Validação de dados
    if (typeof data !== 'object' || data === null || Object.keys(data).length === 0) {
      throw new Error('Dados inválidos: é necessário fornecer um objeto não vazio.');
    }

    // Extração de dados das tabelas
    const turnos = data.turno ? data.turno.map(item => ({
      id: parseInt(item.id),
      nome: item.nome
    })) : [];

    const cursos = data.curso ? data.curso.map(item => ({
      id: parseInt(item.id),
      nome: item.nome
    })) : [];

    const semestres = data.semestre_cronograma ? data.semestre_cronograma.map(item => ({
      id: parseInt(item.id),
      nivel: parseInt(item.nivel),
      ano: parseInt(item.ano),
      id_curso: parseInt(item.id_curso),
      id_turno: parseInt(item.id_turno)
    })) : [];

    console.log(`Processando ${turnos.length} turnos, ${cursos.length} cursos e ${semestres.length} semestres`);
    
    // Executar todas as inserções em paralelo para máxima performance
    await Promise.all([
       insertTurnosEmLote(turnos),
       insertCursosEmLote(cursos),
       insertSemestresEmLote(semestres)
    ]);
    console.log('Dados processados e salvos com sucesso no banco.');
    return { status: 200 };
  
  } catch (error) {
    console.error('Erro ao salvar dados no banco de dados:', error);
    throw error;
  }
}

module.exports = {
  processCSVData
};
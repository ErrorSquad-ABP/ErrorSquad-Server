const { insertTurnosEmLote } = require('../database/migrations/batches/turnosBatch')
const { insertCursosEmLote } = require('../database/migrations/batches/cursosBatch')
const { insertAmbientesEmLote } = require('../database/migrations/batches/ambientesBatch')
const { insertDiasEmLote } = require('../database/migrations/batches/diasBatch')
const { insertHorariosEmLote } = require('../database/migrations/batches/horariosBatch')
const { insertDocentesEmLote } = require('../database/migrations/batches/docentesBatch')
const { insertDisciplinasEmLote } = require('../database/migrations/batches/disciplinasBatch')
const { insertSemestresEmLote } = require('../database/migrations/batches/semestresBatch')

// Processador principal dos dados CSV
async function processCSVData(data) {
  try {

    console.log(`Iniciando processamento em ${Object.keys(data.tables).length} tabelas.`);

    // Validação de dados
    if (typeof data.tables !== 'object' || data.tables === null || Object.keys(data.tables).length === 0) {
      throw new Error('Dados inválidos: é necessário fornecer um objeto não vazio.');
    }

    // Extração de dados das tabelas
    const turnos = data.tables.turno ? data.tables.turno.map(item => ({
      id: parseInt(item.id),
      nome: String(item.nome)
    })) : [];

    const cursos = data.tables.curso ? data.tables.curso.map(item => ({
      id: parseInt(item.id),
      nome: String(item.nome),
      coordenador: String(item.coordenador),
      sigla: String(item.sigla)
    })) : [];

    const ambientes = data.tables.ambiente ? data.tables.ambiente.map(item => ({
      id: parseInt(item.id),
      nome: String(item.nome)
    })) : [];

    const dias = data.tables.dia ? data.tables.dia.map(item => ({
      id: parseInt(item.id),
      nome: String(item.nome)
    })) : [];

    const horarios = data.tables.horario ? data.tables.horario.map(item => ({
      id: parseInt(item.id),
      hr_inicio: item.hr_inicio,
      hr_fim: item.hr_fim
    })) : [];

    const docentes = data.tables.docente ? data.tables.docente.map(item => ({
      id: parseInt(item.id),
      nome: String(item.nome),
      cor: String(item.cor)
    })) : [];

    const disciplinas = data.tables.disciplina ? data.tables.disciplina.map(item => ({
      id: parseInt(item.id),
      nome: String(item.nome),
      nome_docente:String(item.nome_docente),
      nome_curso:String(item.nome_curso)
    })) : [];

    const semestres = data.tables.semestre_cronograma ? data.tables.semestre_cronograma.map(item => ({
      id: parseInt(item.id),
      nivel: parseInt(item.nivel),
      ano: parseInt(item.ano),
      nome_curso: String(item.nome_curso),
      nome_turno: String(item.nome_turno)
    })) : [];
    // Executar todas as inserções em paralelo para máxima performance
    await Promise.resolve()
      .then(() => Promise.all([
        insertDocentesEmLote(docentes),
        insertTurnosEmLote(turnos),
        insertCursosEmLote(cursos),
        insertAmbientesEmLote(ambientes),
        insertDiasEmLote(dias),
        insertHorariosEmLote(horarios),
      ]))
      .then(() => Promise.all([ 
        //insertSemestresEmLote(semestres),
        insertDisciplinasEmLote(disciplinas)
      ]));
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
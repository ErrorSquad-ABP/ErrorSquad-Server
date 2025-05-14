const bigquery = require('../../lib/bigquery');

async function searchAllInfos() {

  const query =
    `SELECT 
  (SELECT ARRAY_AGG(STRUCT(
    id, 
    nome
  )) FROM sitefatecdsm-01-2025.SiteFatecDSM.dia) AS dias,
   (SELECT ARRAY_AGG(STRUCT(
    id, 
    nome
  )) FROM sitefatecdsm-01-2025.SiteFatecDSM.turno) AS turnos,
   (SELECT ARRAY_AGG(STRUCT(
    id, 
    nivel,
    ano,
    id_curso,
    id_turno
  )) FROM sitefatecdsm-01-2025.SiteFatecDSM.semestre_cronograma) AS semestres,
   (SELECT ARRAY_AGG(STRUCT(
    id, 
    nome,
    cor
  )) FROM sitefatecdsm-01-2025.SiteFatecDSM.docente) AS docente,
(SELECT ARRAY_AGG(STRUCT(
id,
hr_inicio,
hr_fim
)) FROM sitefatecdsm-01-2025.SiteFatecDSM.horario) AS horarios,
(SELECT ARRAY_AGG(STRUCT(
id,
nome,
sigla
)) FROM sitefatecdsm-01-2025.SiteFatecDSM.curso) AS cursos,
(SELECT ARRAY_AGG(STRUCT(
id,
nome
)) FROM sitefatecdsm-01-2025.SiteFatecDSM.turno) AS turnos,
(SELECT ARRAY_AGG(STRUCT(
periodo.id,
dia.nome AS nome_dia,
horario.hr_inicio,
horario.hr_fim,
disciplina.nome AS nome_disciplina,
docente.nome AS nome_docente,
docente.cor AS cor_docente,
semestre_cronograma.nivel AS nivel_semestre,
curso.sigla AS sigla_curso,
turno.nome AS nome_turno,
ambiente.nome AS nome_ambiente
))
FROM sitefatecdsm-01-2025.SiteFatecDSM.periodo AS periodo
LEFT JOIN sitefatecdsm-01-2025.SiteFatecDSM.dia AS dia ON periodo.id_dia = dia.id
LEFT JOIN sitefatecdsm-01-2025.SiteFatecDSM.horario AS horario ON periodo.id_horario = horario.id
LEFT JOIN sitefatecdsm-01-2025.SiteFatecDSM.disciplina AS disciplina ON periodo.id_disciplina = disciplina.id
LEFT JOIN sitefatecdsm-01-2025.SiteFatecDSM.docente AS docente_disciplina ON periodo.id_docente_disciplina = docente_disciplina.id
LEFT JOIN sitefatecdsm-01-2025.SiteFatecDSM.docente AS docente ON disciplina.id_docente = docente.id
LEFT JOIN sitefatecdsm-01-2025.SiteFatecDSM.semestre_cronograma AS semestre_cronograma ON periodo.id_cronograma_semestre = semestre_cronograma.id
LEFT JOIN sitefatecdsm-01-2025.SiteFatecDSM.curso AS curso ON semestre_cronograma.id_curso = curso.id
LEFT JOIN sitefatecdsm-01-2025.SiteFatecDSM.turno AS turno ON semestre_cronograma.id_turno = turno.id
LEFT JOIN sitefatecdsm-01-2025.SiteFatecDSM.ambiente AS ambiente ON periodo.id_ambiente = ambiente.id) AS periodos;
`;

  const [rows] = await bigquery.query({ query });

  if (rows.length > 0) {

    return { status: 200, data: rows, };

  }

  if (rows.length <= 0) {

    return { status: 200, mensagem: "Sem informações cadastradas." };

  }


}

module.exports = {
  searchAllInfos,
};
const bigquery = require('../../lib/bigquery');

async function searchAllInfos() {

  const query =
    `SELECT 
  (SELECT ARRAY_AGG(STRUCT(id, nome)) FROM \`sitefatecdsm-01-2025.SiteFatecDSM.dia\`) AS dias,
  (SELECT ARRAY_AGG(STRUCT(id, hr_inicio, hr_fim)) FROM \`sitefatecdsm-01-2025.SiteFatecDSM.horario\`) AS horarios,
  (SELECT ARRAY_AGG(STRUCT(id, nome, sigla)) FROM \`sitefatecdsm-01-2025.SiteFatecDSM.curso\`) AS cursos,
  (SELECT ARRAY_AGG(STRUCT(id, nome)) FROM \`sitefatecdsm-01-2025.SiteFatecDSM.turno\`) AS turnos,
  (SELECT ARRAY_AGG(STRUCT(id, id_dia, id_horario, id_disciplina, id_docente_disciplina, id_cronograma_semestre, id_ambiente)) FROM \`sitefatecdsm-01-2025.SiteFatecDSM.periodo\`) AS periodos;
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
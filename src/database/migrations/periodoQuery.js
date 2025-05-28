const bigquery = require('../../lib/bigquery');

async function searchAllPeriodos() {

  const query =
    `SELECT ARRAY_AGG(STRUCT(
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
          ambiente.nome AS nome_ambiente,
          ambiente.localizacao AS localizacao_ambiente
        ) 
        ORDER BY periodo.id ASC) AS periodos
FROM sitefatecdsm-01-2025.SiteFatecDSM.periodo AS periodo
LEFT JOIN sitefatecdsm-01-2025.SiteFatecDSM.dia AS dia ON periodo.id_dia = dia.id
LEFT JOIN sitefatecdsm-01-2025.SiteFatecDSM.horario AS horario ON periodo.id_horario = horario.id
LEFT JOIN sitefatecdsm-01-2025.SiteFatecDSM.disciplina AS disciplina ON periodo.id_disciplina = disciplina.id
LEFT JOIN sitefatecdsm-01-2025.SiteFatecDSM.docente AS docente_disciplina ON periodo.id_docente_disciplina = docente_disciplina.id
LEFT JOIN sitefatecdsm-01-2025.SiteFatecDSM.docente AS docente ON disciplina.id_docente = docente.id
LEFT JOIN sitefatecdsm-01-2025.SiteFatecDSM.semestre_cronograma AS semestre_cronograma ON periodo.id_cronograma_semestre = semestre_cronograma.id
LEFT JOIN sitefatecdsm-01-2025.SiteFatecDSM.curso AS curso ON semestre_cronograma.id_curso = curso.id
LEFT JOIN sitefatecdsm-01-2025.SiteFatecDSM.turno AS turno ON semestre_cronograma.id_turno = turno.id
LEFT JOIN sitefatecdsm-01-2025.SiteFatecDSM.ambiente AS ambiente ON periodo.id_ambiente = ambiente.id;
  `;

  const [rows] = await bigquery.query({ query });
  console.log(rows)

  if (rows.length > 0) {

    return { status: 200, data: rows, };

  }

  if (rows.length <= 0) {

    return { status: 200, mensagem: "Sem periodos cadastrados." };

  }


}

async function periodoExistsOrNotById(id) {
  const query = `
    SELECT * FROM \`sitefatecdsm-01-2025.SiteFatecDSM.periodo\`
    WHERE id = @id;
  `;

  const options = {
    query,
    params: {
      id: parseInt(id)
    },
    useLegacySql: false
  };

  const [rows] = await bigquery.query(options);

  return rows.length > 0;
}


async function updateExistingPeriodo(id, disciplina, docente, ambiente) {
  const query =  `
  CALL \`sitefatecdsm-01-2025\`.\`SiteFatecDSM\`.\`alterar_periodo\`(
    @id,
    @disciplina,
    @docente,
    @ambiente);
    `;

  const options = {
    query,
    params: {
      id: parseInt(id),
      disciplina: String(disciplina),
      docente: String(docente),
      ambiente: String(ambiente),
    },
    useLegacySql: false
  };


  try {
    const [rows] = await bigquery.query(options);
     // Verificar se a coluna 'erro' existe no resultado
    if (rows.length > 0 && rows[0].erro) {
      throw new Error(rows[0].erro); // Lança o erro retornado pelo BigQuery
    }
    return { status: 200, mensagem: 'periodo atualizado com sucesso!' };

  } catch (erro) {
    console.error('Erro ao alterar periodo:', erro);
    return { status: 400, mensagem: 'Problemas com o banco de dados.' };
  }
}

module.exports = {
  searchAllPeriodos,
  periodoExistsOrNotById,
  updateExistingPeriodo,
};

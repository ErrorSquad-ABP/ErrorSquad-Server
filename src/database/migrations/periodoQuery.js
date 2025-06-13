const pool = require('../../lib/pool');

async function searchAllPeriodos() {

  const query =
    `SELECT COALESCE(json_agg(periodo_data ORDER BY periodo_data.id ASC), '[]'::json) AS periodos
    FROM (
      SELECT
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
      FROM errorsquad.periodo AS periodo
      LEFT JOIN errorsquad.dia AS dia ON periodo.id_dia = dia.id
      LEFT JOIN errorsquad.horario AS horario ON periodo.id_horario = horario.id
      LEFT JOIN errorsquad.disciplina AS disciplina ON periodo.id_disciplina = disciplina.id
      LEFT JOIN errorsquad.docente AS docente ON disciplina.id_docente = docente.id
      LEFT JOIN errorsquad.semestre_cronograma AS semestre_cronograma ON periodo.id_cronograma_semestre = semestre_cronograma.id
      LEFT JOIN errorsquad.curso AS curso ON semestre_cronograma.id_curso = curso.id
      LEFT JOIN errorsquad.turno AS turno ON semestre_cronograma.id_turno = turno.id
      LEFT JOIN errorsquad.ambiente AS ambiente ON periodo.id_ambiente = ambiente.id
    ) AS periodo_data;
  `;
  try {
    const { rows } = await pool.query(query);
    const periodos = rows[0].periodos;

    if (periodos.length > 0) {

      return { status: 200, data: periodos, };

    }

    if (rows.periodos == null) {

      return { status: 200, mensagem: "Sem periodos cadastrados." };

    }
  } catch (erro) {
    console.error('Erro ao inserir periodo:', erro);
    return { status: 400, mensagem: 'Problemas com o banco de dados.' };
  }


}

async function searchPeriodoById(id) {

  const query =
    `SELECT row_to_json(periodo_data) AS periodo
FROM (
  SELECT
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
  FROM errorsquad.periodo AS periodo
  LEFT JOIN errorsquad.dia AS dia ON periodo.id_dia = dia.id
  LEFT JOIN errorsquad.horario AS horario ON periodo.id_horario = horario.id
  LEFT JOIN errorsquad.disciplina AS disciplina ON periodo.id_disciplina = disciplina.id
  LEFT JOIN errorsquad.docente AS docente_disciplina ON periodo.id_docente_disciplina = docente_disciplina.id
  LEFT JOIN errorsquad.docente AS docente ON disciplina.id_docente = docente.id
  LEFT JOIN errorsquad.semestre_cronograma AS semestre_cronograma ON periodo.id_cronograma_semestre = semestre_cronograma.id
  LEFT JOIN errorsquad.curso AS curso ON semestre_cronograma.id_curso = curso.id
  LEFT JOIN errorsquad.turno AS turno ON semestre_cronograma.id_turno = turno.id
  LEFT JOIN errorsquad.ambiente AS ambiente ON periodo.id_ambiente = ambiente.id
  WHERE periodo.id = $1
) AS periodo_data;`;

  const values = [id];
  try {
    const { rows } = await pool.query(query, values);

    if (rows.length > 0) {

      return { status: 200, data: rows, };

    }

    if (rows.length <= 0) {

      return { status: 200, mensagem: "Sem periodos cadastrados." };

    }


  } catch (erro) {
    console.error('Erro ao buscar periodo:', erro);
    return { status: 400, mensagem: 'Problemas com o banco de dados.' };
  }
}

async function periodoExistsOrNotById(id) {
  const query = `
    SELECT * FROM errorsquad.periodo
    WHERE id = $1;
  `;

  const values = [id];
  try {
    const { rows } = await pool.query(query, values);

    return rows.length > 0;
  } catch (erro) {
    return { status: 400, mensagem: 'Problemas com o banco de dados.' };
  }
}


async function updateExistingPeriodo(id, disciplina, docente, ambiente) {
  const query = `
    CALL errorsquad.alterar_periodo($1, $2, $3, $4);
  `;

  const values = [id, disciplina, docente, ambiente];

  try {
    const result = await pool.query(query, values);

    // Verificar se a procedure retornou algum erro em uma coluna chamada 'erro'
    if (result.rows && result.rows.length > 0 && result.rows[0].erro) {
      throw new Error(result.rows[0].erro);
    }
    console.log('Cachorro', id, disciplina, docente, ambiente)
    return { status: 200, mensagem: 'Período atualizado com sucesso!' };

  } catch (erro) {
    console.error('Erro ao alterar período:', erro);
    return { status: 400, mensagem: 'Problemas com o banco de dados.' };
  }
}

module.exports = {
  searchAllPeriodos,
  periodoExistsOrNotById,
  updateExistingPeriodo,
  searchPeriodoById
};

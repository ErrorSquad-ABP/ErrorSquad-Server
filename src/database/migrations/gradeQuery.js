const pool = require('../../lib/pool');

async function searchAllInfos() {
  const query = `
  SELECT 
  (SELECT json_agg(json_build_object(
    'id', id, 
    'nome', nome
  )) FROM errorsquad.dia) AS dias,

  (SELECT json_agg(json_build_object(
    'id', id, 
    'nome', nome
  )) FROM errorsquad.turno) AS turnos,

  (SELECT json_agg(json_build_object(
    'id', id, 
    'nivel', nivel,
    'ano', ano,
    'id_curso', id_curso,
    'id_turno', id_turno
  )) FROM errorsquad.semestre_cronograma) AS semestres,

  (SELECT json_agg(json_build_object(
    'id', id, 
    'nome', nome,
    'cor', cor
  )) FROM errorsquad.docente) AS docente,

  (SELECT json_agg(json_build_object(
    'id', id,
    'hr_inicio', hr_inicio,
    'hr_fim', hr_fim
  )) FROM errorsquad.horario) AS horarios,

  (SELECT json_agg(json_build_object(
    'id', id,
    'nome', nome,
    'sigla', sigla
  )) FROM errorsquad.curso) AS cursos,

  (SELECT json_agg(json_build_object(
    'id', periodo.id,
    'nome_dia', dia.nome,
    'hr_inicio', horario.hr_inicio,
    'hr_fim', horario.hr_fim,
    'nome_disciplina', disciplina.nome,
    'nome_docente', docente.nome,
    'cor_docente', docente.cor,
    'nivel_semestre', semestre_cronograma.nivel,
    'sigla_curso', curso.sigla,
    'nome_turno', turno.nome,
    'nome_ambiente', ambiente.nome
  ))
  FROM errorsquad.periodo AS periodo
  LEFT JOIN errorsquad.dia AS dia ON periodo.id_dia = dia.id
  LEFT JOIN errorsquad.horario AS horario ON periodo.id_horario = horario.id
  LEFT JOIN errorsquad.disciplina AS disciplina ON periodo.id_disciplina = disciplina.id
  LEFT JOIN errorsquad.docente AS docente_disciplina ON periodo.id_docente_disciplina = docente_disciplina.id
  LEFT JOIN errorsquad.docente AS docente ON disciplina.id_docente = docente.id
  LEFT JOIN errorsquad.semestre_cronograma AS semestre_cronograma ON periodo.id_cronograma_semestre = semestre_cronograma.id
  LEFT JOIN errorsquad.curso AS curso ON semestre_cronograma.id_curso = curso.id
  LEFT JOIN errorsquad.turno AS turno ON semestre_cronograma.id_turno = turno.id
  LEFT JOIN errorsquad.ambiente AS ambiente ON periodo.id_ambiente = ambiente.id) AS periodos;
  `;

  const { rows } = await pool.query(query);

  if (rows.length > 0) {
    return { status: 200, data: rows };
  }

  return { status: 200, mensagem: "Sem informações cadastradas." };
}

async function swapPeriodos(id1, id1_dia, id1_horario, id2, id2_dia, id2_horario) {
  const query = `
    CALL errorsquad.swap_periodos (
      $1, $2, $3, $4, $5, $6
    );
  `;

  const values = [id1, id1_dia, id1_horario, id2, id2_dia, id2_horario];

  try {

    const { rows } = await pool.query(query, values)
    console.log(rows)
    const card1 = {
      id: rows[0].id,
      id_dia: rows[0].id_dia,
      id_horario: rows[0].id_horario
    }

     const card2 = {
      id: rows[1].id,
      id_dia: rows[1].id_dia,
      id_horario: rows[1].id_horario
    }

   
    
    return { 
      status: 201, 
      message: 'Períodos trocados com sucesso!',
      card1,
      card2
    };

  } catch (erro) {
    console.error('Erro ao inserir nivel:', erro);
    return { status: 400, mensagem: 'Problemas com o banco de dados.' };
  }
}

module.exports = {
  searchAllInfos,
  swapPeriodos,
};

const pool = require('../../lib/pool');

async function createNewDisciplina(nome, nome_docente, nome_curso, codigo) {

  const query =
    `CALL errorsquad.inserir_disciplina_unico(
    $1, $2, $3, $4
);`;


  const values = [
    nome,
    nome_docente,
    nome_curso,
    codigo
  ]

  try {
    const result = await pool.query(query, values);
    return { status: 201, mensagem: 'Disciplina inserida com sucesso!' };
  } catch (erro) {
    console.error('Erro ao inserir disciplina:', erro);
    return { status: 400, mensagem: 'Problemas com o banco de dados.' };
  }
}

async function searchAllDisciplinas() {

  const query =
    `SELECT 
    disciplina.id AS id_disciplina,
    disciplina.nome AS nome_disciplina,
    curso.sigla AS sigla_curso,
    docente.nome AS nome_docente,
    disciplina.codigo AS codigo
FROM 
    errorsquad.disciplina AS disciplina
LEFT JOIN 
    errorsquad.curso AS curso 
    ON disciplina.id_curso = curso.id
LEFT JOIN 
    errorsquad.docente AS docente 
    ON disciplina.id_docente = docente.id
ORDER BY 
    disciplina.id ASC;`;


  try {
    const { rows } = await pool.query(query);

    if (rows.length > 0) {

      return { status: 200, data: rows, };

    }

    if (rows.length <= 0) {

      return { status: 200, mensagem: "Sem disciplinas cadastradas." };

    }


  } catch (erro) {
    console.error('Erro ao buscar disciplinas:', erro);
    return { status: 400, mensagem: 'Problemas com o banco de dados.' };
  }
}

async function searchDisciplinaById(id) {
  const query =
    `SELECT row_to_json(disciplina_data) AS disciplina
FROM (
  SELECT 
    disciplina.id AS id_disciplina,
    disciplina.nome AS nome_disciplina,
    curso.sigla AS sigla_curso,
    docente.nome AS nome_docente,
    disciplina.codigo AS codigo
  FROM 
    errorsquad.disciplina AS disciplina
  LEFT JOIN 
    errorsquad.curso AS curso 
    ON disciplina.id_curso = curso.id
  LEFT JOIN 
    errorsquad.docente AS docente 
    ON disciplina.id_docente = docente.id
  WHERE disciplina.id = $1
) AS disciplina_data;`;

  const values = [id];

  const { rows } = await pool.query(query, values);

  if (rows.length > 0) {

    return { status: 200, data: rows, };

  }

  if (rows.length <= 0) {

    return { status: 200, mensagem: "Sem disciplinas cadastradas." };

  }
}

async function disciplinaExistsOrNotById(id) {
  const query = `
      SELECT * FROM errorsquad.disciplina
      WHERE id = $1;
    `;

  const values = [id];

  const { rows } = await pool.query(query, values);

  return rows.length > 0;
}

async function updateExistingDisciplina(id, nome, nome_docente, nome_curso, codigo) {
  const query = `
    CALL errorsquad.alterar_disciplina_unico(
    $1, $2, $3, $4, $5);`;


  const values = [id, nome, nome_docente, nome_curso, codigo]


  try {
    const result = await pool.query(query, values);
    return { status: 200, mensagem: 'Disciplina atualizada com sucesso!' };

  } catch (erro) {
    console.error('Erro ao alterar disciplina:', erro);
    return { status: 400, mensagem: 'Problemas com o banco de dados.' };
  }
}

async function deleteExistingDisciplina(id) {
  const query = `
      DELETE FROM errorsquad.disciplina
      WHERE id = $1;
    `;

  const values = [id];


  try {
    const result = await pool.query(query, values);
    return { sucesso: true, mensagem: 'Disciplina atualizada com sucesso!' };

  } catch (erro) {
    console.error('Erro ao alterar curso:', erro);
    return { status: 400, mensagem: 'Problemas com o banco de dados.' };
  }
}

module.exports = {
  searchAllDisciplinas,
  createNewDisciplina,
  disciplinaExistsOrNotById,
  updateExistingDisciplina,
  deleteExistingDisciplina,
  searchDisciplinaById
};

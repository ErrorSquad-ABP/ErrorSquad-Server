const pool = require('../../lib/pool');

async function createNewSemestre(nivel, ano, nome_curso, nome_turno) {

  const query =
    `CALL errorsquad.inserir_semestre_unico (
    $1, $2, $3, $4);`;


  const values = [nivel, ano, nome_curso, nome_turno]

  try {
    const result = await pool.query(query, values);
    return { status: 201, mensagem: 'Nivel inserido com sucesso!' };
  } catch (erro) {
    console.error('Erro ao inserir nivel:', erro);
    return { status: 400, mensagem: 'Problemas com o banco de dados.' };
  }
}


async function searchAllSemestres() {

  const query =
   `SELECT 
    semestre_cronograma.id AS id_semestre_cronograma,
    semestre_cronograma.nivel AS nivel_semestre_cronograma,
    semestre_cronograma.ano AS ano_semestre_cronograma,
    curso.sigla AS sigla_curso,
    turno.nome AS nome_turno
FROM 
    errorsquad.semestre_cronograma AS semestre_cronograma
LEFT JOIN 
    errorsquad.curso AS curso 
    ON semestre_cronograma.id_curso = curso.id
LEFT JOIN 
    errorsquad.turno AS turno 
    ON semestre_cronograma.id_turno = turno.id
ORDER BY 
    semestre_cronograma.id ASC;`;

  const {rows} = await pool.query(query);

  if (rows.length > 0) {

    return { status: 200, data: rows, };

  }

  if (rows.length <= 0) {

    return { status: 200, mensagem: "Sem semestre cadastrados." };

  }


}

async function searchSemestreById(id) {

  const query =
   `SELECT row_to_json(semestre_data) AS semestre FROM (
    SELECT
    semestre_cronograma.id AS id_semestre_cronograma,
    semestre_cronograma.nivel AS nivel_semestre_cronograma,
    semestre_cronograma.ano AS ano_semestre_cronograma,
    curso.sigla AS sigla_curso,
    turno.nome AS nome_turno
FROM 
errorsquad.semestre_cronograma AS semestre_cronograma
  LEFT JOIN 
errorsquad.curso AS curso 
    ON semestre_cronograma.id_curso = curso.id
  LEFT JOIN 
errorsquad.turno AS turno 
    ON semestre_cronograma.id_turno = turno.id
WHERE semestre_cronograma.id = $1) AS semestre_data;
`;

    const values = [id];

  const {rows} = await pool.query(query, values);
  console.log('teste', rows, id)
  if (rows.length > 0) {

    return { status: 200, data: rows, };

  }

  if (rows.length <= 0) {

    return { status: 200, mensagem: "Sem semestre cadastrados." };

  }


}

async function semestreExistsOrNotById(id) {
  const query = `
    SELECT * FROM errorsquad.semestre_cronograma
    WHERE id = $1;
  `;

  const values = [id];

  const {rows} = await pool.query(query, values);

  return rows.length > 0;
}


async function updateExistingSemestre(id, nivel, ano, nome_curso, nome_turno) {
  const query = `
    CALL errorsquad.alterar_semestre_unico(
    $1, $2, $3, $4, $5);`;


  const values = [id, nivel, ano, nome_curso, nome_turno];


  try {
    const result = await pool.query(query, values);
    return { status: 200, mensagem: 'Semestre atualizado com sucesso!' };

  } catch (erro) {
    console.error('Erro ao alterar semestre:', erro);
    return { status: 400, mensagem: 'Problemas com o banco de dados.' };
  }
}

async function deleteExistingSemestre(id) {
  const query = `
    DELETE FROM errorsquad.semestre_cronograma
    WHERE id = $1;
  `;

  const values = [id];


  try {
    const result = await pool.query(query, values);
    return { sucesso: true, mensagem: 'Semestre atualizado com sucesso!' };

  } catch (erro) {
    console.error('Erro ao alterar semestre:', erro);
    return { status: 400, mensagem: 'Problemas com o banco de dados.' };
  }
}


module.exports = {
  searchAllSemestres,
  createNewSemestre,
  semestreExistsOrNotById,
  updateExistingSemestre,
  deleteExistingSemestre,
  searchSemestreById
};

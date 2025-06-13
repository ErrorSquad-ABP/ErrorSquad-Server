const pool = require('../../lib/pool');

async function createNewCurso(nome, coordenador, sigla, inicio, fim) {

  const query =
    `INSERT INTO errorsquad.curso(nome, coordenador, sigla, inicio, fim)
VALUES
($1, $2, $3, $4, $5);`;

  const values = [
    nome,
    coordenador,
    sigla,
    inicio,
    fim
  ]

  try {
    const result = await pool.query(query, values);
    return { status: 201, mensagem: 'Curso inserido com sucesso!' };
  } catch (erro) {
    console.error('Erro ao inserir curso:', erro);
    return { status: 400, mensagem: 'Problemas com o banco de dados.' };
  }
}


async function searchAllCursos() {

  const query =
    `SELECT * 
    FROM errorsquad.curso
    order by id asc`;



  try {
    const { rows } = await pool.query(query);

    if (rows.length > 0) {

      return { status: 200, data: rows, };

    }

    if (rows.length <= 0) {

      return { status: 200, mensagem: "Sem cursos cadastrados." };

    }


  } catch (erro) {
    console.error('Erro ao buscar cursos:', erro);
    return { status: 400, mensagem: 'Problemas com o banco de dados.' };
  }
}

async function searchCursoById(id) {

  const query = `SELECT (
  SELECT row_to_json(c)
  FROM (
    SELECT *
    FROM errorsquad.curso
    WHERE id = $1
  ) c
) AS curso;`;

  const values = [id];

  try {
    const { rows } = await pool.query(query, values);

    if (rows.length > 0) {

      return { status: 200, data: rows, };

    }

    if (rows.length <= 0) {

      return { status: 200, mensagem: "Sem cursos cadastrados." };

    }


  } catch (erro) {
    console.error('Erro ao buscar curso:', erro);
    return { status: 400, mensagem: 'Problemas com o banco de dados.' };
  }
}

async function cursoExistsOrNotById(id) {
  const query = `
    SELECT * FROM errorsquad.curso
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


async function updateExistingCurso(id, nome, coordenador, sigla, inicio, fim) {

  const query = `
    UPDATE errorsquad.curso
    SET nome = $1,
    coordenador = $2,
    sigla = $3,
    inicio = $4,
    fim = $5
    WHERE id = $6;
  `;

  const values = [nome, coordenador, sigla, inicio, fim, id]

  try {
    const result = await pool.query(query, values);
    return { status: 200, mensagem: 'Curso atualizado com sucesso!' };

  } catch (erro) {
    console.error('Erro ao alterar curso:', erro);
    return { status: 400, mensagem: 'Problemas com o banco de dados.' };

  }
}

async function deleteExistingCurso(id) {
  const query = `
    DELETE FROM errorsquad.curso
    WHERE id = $1
  `;

  const values = [id];


  try {
    const result = await pool.query(query, values);
    return { sucesso: true, mensagem: 'Curso atualizado com sucesso!' };

  } catch (erro) {
    console.error('Erro ao alterar curso:', erro);
    return { status: 400, mensagem: 'Problemas com o banco de dados.' };
  }
}


module.exports = {
  searchAllCursos,
  createNewCurso,
  cursoExistsOrNotById,
  updateExistingCurso,
  deleteExistingCurso,
  searchCursoById
};
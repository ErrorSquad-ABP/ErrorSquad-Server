const pool = require('../../lib/pool');

async function createNewDocente(nome, cor) {

  const query =
    `INSERT INTO errorsquad.docente(nome, cor)
VALUES
($1, $2);`;
 
  values = [nome, cor];
  

  try {
   const result = await pool.query(query, values);
    return { status: 201, mensagem: 'Docente inserido com sucesso!' };
  } catch (erro) {
    console.error('Erro ao inserir docente:', erro);
    return { status: 400, mensagem: 'Problemas com o banco de dados.' };
  }
}


async function searchAllDocentes() {

  const query =
    `SELECT * 
    FROM errorsquad.docente
    order by id asc`;

  const { rows } = await pool.query(query);

  if (rows.length > 0) {

    return { status: 200, data: rows, };

  }

  if (rows.length <= 0) {

    return { status: 200, mensagem: "Sem Docentes cadastrados." };

  }


}

async function searchDocenteById(id) {

  const query =
    `SELECT (
  SELECT AS STRUCT *
  FROM \`sitefatecdsm-01-2025.SiteFatecDSM.docente\`
  WHERE id = @id
) AS docente;`;

  const options = {
    query,
    params: {
      id: parseInt(id)
    },
    useLegacySql: false
  };

  const [rows] = await pool.query(options);

  if (rows.length > 0) {

    return { status: 200, data: rows, };

  }

  if (rows.length <= 0) {

    return { status: 200, mensagem: "Sem Docentes cadastrados." };

  }


}

async function docenteExistsOrNotById(id) {
  const query = `
    SELECT * FROM errorsquad.docente
    WHERE id = $1;
  `;

  const values = [id];

  const { rows } = await pool.query(query, values);

  return rows.length > 0;
}


async function updateExistingDocente(id, nome, cor) {
  const query = `
    UPDATE errorsquad.docente
    SET nome = $1,
    cor = $2
    WHERE id = $3;
  `;

  const values = [nome, cor, id];

  try {
    const result = await pool.query(query, values);
    return { status: 200, mensagem: 'Docente atualizado com sucesso!' };

  } catch (erro) {
    console.error('Erro ao alterar docente:', erro);
    return { status: 400, mensagem: 'Problemas com o banco de dados.' };
  }
}

async function deleteExistingDocente(id) {
  const query = `
    DELETE FROM errorsquad.docente
    WHERE id = $1;
  `;

  const values = [id];

  try {
    const result = await pool.query(query, values);
    return { sucesso: true, mensagem: 'Docente atualizado com sucesso!' };

  } catch (erro) {
    console.error('Erro ao alterar docente:', erro);
    return { status: 400, mensagem: 'Problemas com o banco de dados.' };
  }
}


module.exports = {
  searchAllDocentes,
  createNewDocente,
  docenteExistsOrNotById,
  updateExistingDocente,
  deleteExistingDocente,
  searchDocenteById
};
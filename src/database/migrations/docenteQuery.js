const pool = require('../../lib/pool');

async function createNewDocente(nome, cor) {

  const query =
    `INSERT INTO errorsquad.docente(nome, cor)
VALUES
($1, $2);`;
 
  values = [nome, cor];
  

  try {
    await pool.query(query, values);
    return { status: 201, mensagem: 'Docente inserido com sucesso!' };
  } catch (erro) {
    console.error('Erro ao inserir docente:', erro);
    return { status: 400, mensagem: 'Problemas com o banco de dados.' };
  }
}


async function searchAllDocentes() {

  const query =
    `SELECT * 
    FROM \`sitefatecdsm-01-2025.SiteFatecDSM.docente\`
    order by id asc`;

  const [rows] = await pool.query({ query });

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
    SELECT * FROM \`sitefatecdsm-01-2025.SiteFatecDSM.docente\`
    WHERE id = @id;
  `;

  const options = {
    query,
    params: {
      id: parseInt(id)
    },
    useLegacySql: false
  };

  const [rows] = await pool.query(options);

  return rows.length > 0;
}


async function updateExistingDocente(id, nome, cor) {
  const query = `
    UPDATE \`sitefatecdsm-01-2025.SiteFatecDSM.docente\`
    SET nome = @nome,
    cor = @cor
    WHERE id = @id;
  `;

  const options = {
    query,
    params: {
      id: parseInt(id),
      nome: String(nome),
      cor: String(cor)
    },
    useLegacySql: false
  };


  try {
    const [rows] = await pool.query(options);
    return { status: 200, mensagem: 'Docente atualizado com sucesso!' };

  } catch (erro) {
    console.error('Erro ao alterar docente:', erro);
    return { status: 400, mensagem: 'Problemas com o banco de dados.' };
  }
}

async function deleteExistingDocente(id) {
  const query = `
    DELETE FROM \`sitefatecdsm-01-2025.SiteFatecDSM.docente\`
    WHERE id = @id;
  `;

  const options = {
    query,
    params: {
      id: parseInt(id),
    },
    useLegacySql: false
  };


  try {
    const [rows] = await pool.query(options);
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
const bigquery = require('../../lib/bigquery');

async function createNewCurso(nome, coordenador, sigla) {

  const query =
    `INSERT INTO sitefatecdsm-01-2025.SiteFatecDSM.curso (id, nome, coordenador, sigla)
    SELECT 
    COALESCE((SELECT MAX(id) FROM sitefatecdsm-01-2025.SiteFatecDSM.curso), 0) + 1,
   @nome, @coordenador, @sigla;`;
  ''
  const options = {
    query,
    params: {
      nome: String(nome),
      coordenador: String(coordenador),
      sigla: String(sigla)
    },
    useLegacySql: false
  };

  try {
    await bigquery.query(options);
    return { status: 201, mensagem: 'Curso inserido com sucesso!' };
  } catch (erro) {
    console.error('Erro ao inserir curso:', erro);
    return { status: 400, mensagem: 'Problemas com o banco de dados.' };
  }
}


async function searchAllCursos() {

  const query =
    `SELECT * 
    FROM \`sitefatecdsm-01-2025.SiteFatecDSM.curso\`
    order by id asc`;

  const [rows] = await bigquery.query({ query });

  if (rows.length > 0) {

    return { status: 200, data: rows, };

  }

  if (rows.length <= 0) {

    return { status: 200, mensagem: "Sem cursos cadastrados." };

  }


}

async function cursoExistsOrNotById(id) {
  const query = `
    SELECT * FROM \`sitefatecdsm-01-2025.SiteFatecDSM.curso\`
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


async function updateExistingCurso(id, nome, coordenador, sigla) {
  const query = `
    UPDATE \`sitefatecdsm-01-2025.SiteFatecDSM.curso\`
    SET nome = @nome,
    coordenador = @coordenador,
    sigla = @sigla
    WHERE id = @id;
  `;

  const options = {
    query,
    params: {
      id: parseInt(id),
      nome: String(nome),
      coordenador: String(coordenador),
      sigla: String(sigla)
    },
    useLegacySql: false
  };


  try {
    const [rows] = await bigquery.query(options);
    return { status: 200, mensagem: 'Curso atualizado com sucesso!' };

  } catch (erro) {
    console.error('Erro ao alterar curso:', erro);
    return { status: 400, mensagem: 'Problemas com o banco de dados.' };
  }
}

async function deleteExistingCurso(id) {
  const query = `
    DELETE FROM \`sitefatecdsm-01-2025.SiteFatecDSM.curso\`
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
    const [rows] = await bigquery.query(options);
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
  deleteExistingCurso
};
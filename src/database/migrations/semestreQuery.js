const bigquery = require('../../lib/bigquery');

async function createNewSemestre(nivel, ano, curso_id, turno_id) {

  const query =
    `INSERT INTO sitefatecdsm-01-2025.SiteFatecDSM.semestre_cronograma (id, nivel, ano, id_curso, id_turno)
    SELECT 
    COALESCE((SELECT MAX(id) FROM sitefatecdsm-01-2025.SiteFatecDSM.semestre_cronograma), 0) + 1,
   @nivel, @ano, @curso_id, @turno_id;`;

  const options = {
    query,
    params: {
      nivel: parseInt(nivel),
      ano: parseInt(ano),
      curso_id: parseInt(curso_id),
      turno_id: parseInt(turno_id)
    },
    useLegacySql: false
  };

  try {
    await bigquery.query(options);
    return { status: 201, mensagem: 'Nivel inserido com sucesso!' };
  } catch (erro) {
    console.error('Erro ao inserir nivel:', erro);
    return { status: 400, mensagem: 'Problemas com o banco de dados.' };
  }
}


async function searchAllSemestres() {

  const query =
    `SELECT * 
    FROM \`sitefatecdsm-01-2025.SiteFatecDSM.semestre_cronograma\`
    order by id asc`;

  const [rows] = await bigquery.query({ query });

  if (rows.length > 0) {

    return { status: 200, data: rows, };

  }

  if (rows.length <= 0) {

    return { status: 200, mensagem: "Sem semestre cadastrados." };

  }


}

async function semestreExistsOrNotById(id) {
  const query = `
    SELECT * FROM \`sitefatecdsm-01-2025.SiteFatecDSM.semestre_cronograma\`
    WHERE id = @id;
  `;

  const options = {
    query,
    params: {
      id: parseInt(id),
    },
    useLegacySql: false
  };

  const [rows] = await bigquery.query(options);

  return rows.length > 0;
}


async function updateExistingSemestre(id, nivel, ano, curso_id, turno_id) {
  const query = `
    UPDATE \`sitefatecdsm-01-2025.SiteFatecDSM.semestre_cronograma\`
    SET nivel = @nivel,
    ano = @ano,
    id_curso = @curso_id,
    id_turno = @turno_id
    WHERE id = @id;
  `;

  const options = {
    query,
    params: {
      id: parseInt(id),
      nivel: parseInt(nivel),
      ano: parseInt(ano),
      curso_id: parseInt(curso_id),
      turno_id: parseInt(turno_id)
    },
    useLegacySql: false
  };


  try {
    const [rows] = await bigquery.query(options);
    return { status: 200, mensagem: 'Semestre atualizado com sucesso!' };

  } catch (erro) {
    console.error('Erro ao alterar semestre:', erro);
    return { status: 400, mensagem: 'Problemas com o banco de dados.' };
  }
}

async function deleteExistingSemestre(id) {
  const query = `
    DELETE FROM \`sitefatecdsm-01-2025.SiteFatecDSM.semestre_cronograma\`
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
  deleteExistingSemestre
};
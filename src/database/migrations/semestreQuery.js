const bigquery = require('../../lib/bigquery');

async function createNewSemestre(nivel, ano, nome_curso, nome_turno) {

  const query =
    `CALL \`sitefatecdsm-01-2025\`.\`SiteFatecDSM\`.\`inserir_semestre\`(
    @nivel,
    @ano,
    @nome_curso,
    @nome_turno;`;

  const options = {
    query,
    params: {
      nivel: parseInt(nivel),
      ano: parseInt(ano),
      nome_curso: String(nome_curso),
      nome_turno: String(nome_turno),
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
   `SELECT 
    semestre_cronograma.id AS id_semestre_cronograma,
    semestre_cronograma.nivel AS nivel_semestre_cronograma,
    semestre_cronograma.ano AS ano_semestre_cronograma,
    curso.sigla AS sigla_curso,
    turno.nome AS nome_turno
FROM 
    \`sitefatecdsm-01-2025.SiteFatecDSM.semestre_cronograma\` AS semestre_cronograma
LEFT JOIN 
    \`sitefatecdsm-01-2025.SiteFatecDSM.curso\` AS curso 
    ON semestre_cronograma.id_curso = curso.id
LEFT JOIN 
    \`sitefatecdsm-01-2025.SiteFatecDSM.turno\` AS turno 
    ON semestre_cronograma.id_turno = turno.id
ORDER BY 
    semestre_cronograma.id ASC;`;

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


async function updateExistingSemestre(id, nivel, ano, nome_curso, nome_turno) {
  const query = `
    UPDATE \`sitefatecdsm-01-2025.SiteFatecDSM.semestre_cronograma\`
    SET nivel = @nivel,
    ano = @ano,
    nome_curso = @nome_curso,
    nome_turno = @nome_turno
    WHERE id = @id;
  `;

  const options = {
    query,
    params: {
      id: parseInt(id),
      nivel: parseInt(nivel),
      ano: parseInt(ano),
      nome_curso: String(nome_curso),
      nome_turno: String(nome_turno),
    },
    useLegacySql: false
  };


  try {
    await bigquery.query(options);
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

const bigquery = require('../../lib/bigquery');

async function createNewSemestre( nivel ) {

  const query = 
   `INSERT INTO sitefatecdsm-01-2025.SiteFatecDSM.semestre (id, nivel, ano, curso_id, turno_id)
    SELECT 
    COALESCE((SELECT MAX(id) FROM sitefatecdsm-01-2025.SiteFatecDSM.semestre), 0) + 1,
   @nivel, @ano, @curso_id, @turno_id;`;

  const options = {
    query,
    params: {
      nivel: String(nivel)
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


async function searchAllSemestre() {
  
  const query = 
   `SELECT * 
    FROM \`sitefatecdsm-01-2025.SiteFatecDSM.semestre\`
    order by id asc`;

  const [rows] = await bigquery.query({ query });

  if ( rows.length > 0 ){

  return rows;

  }

  if ( rows.length <= 0 ){

    return { status:200, mensagem: "Sem semestre cadastrados." };

  }


}

async function semestreExistsOrNotById(id) {
  const query = `
    SELECT * FROM \`sitefatecdsm-01-2025.SiteFatecDSM.semestre\`
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


async function updateExistingSemestre(id, nivel) {
  const query = `
    UPDATE \`sitefatecdsm-01-2025.SiteFatecDSM.semestre\`
    SET nivel = @nivel
    SET ano = @ano
    SET turno_id = @turno_id
    SET curso_id = @turno_id
    WHERE id = @id;
  `;

  const options = {
    query,
    params: {
      id: parseInt(id),      
      nivel: String(nivel)     
    },
    useLegacySql: false      
  };


  try {
    const [rows] = await bigquery.query(options);
    return { status:200, mensagem: 'Semestre atualizado com sucesso!' };
    
  } catch (erro) {
    console.error('Erro ao alterar semestre:', erro);
    return { status: 400, mensagem: 'Problemas com o banco de dados.' };
  }
}

async function deleteExistingSemestre( id ) {
  const query = `
    DELETE FROM \`sitefatecdsm-01-2025.SiteFatecDSM.semestre\`
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
  searchAllSemestre,
  createNewSemestre,
  semestreExistsOrNotById,
  updateExistingSemestre,
  deleteExistingSemestre
};
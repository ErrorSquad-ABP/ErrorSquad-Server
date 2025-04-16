const bigquery = require('../../lib/bigquery');

async function createNewTurno( nome ) {

  const query = 
   `INSERT INTO sitefatecdsm-01-2025.SiteFatecDSM.turno (id, nome)
    SELECT 
    COALESCE((SELECT MAX(id) FROM sitefatecdsm-01-2025.SiteFatecDSM.turno), 0) + 1,
   @nome;`;

  const options = {
    query,
    params: {
      nome: String(nome)
    },
    useLegacySql: false
  };

  try {
    await bigquery.query(options);
    return { status: 201, mensagem: 'Turno inserido com sucesso!' };
  } catch (erro) {
    console.error('Erro ao inserir turno:', erro);
    return { status: 400, mensagem: 'Problemas com o banco de dados.' };
  }
}


async function searchAllTurnos() {
  
  const query = 
   `SELECT * 
    FROM \`sitefatecdsm-01-2025.SiteFatecDSM.turno\`
    order by id asc`;

  const [rows] = await bigquery.query({ query });

  if ( rows.length > 0 ){

    return { status: 200, data: rows, };

  }

  if ( rows.length <= 0 ){

    return { status:200, mensagem: "Sem turnos cadastrados." };

  }


}

async function turnoExistsOrNotById(id) {
  const query = `
    SELECT * FROM \`sitefatecdsm-01-2025.SiteFatecDSM.turno\`
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


async function updateExistingTurno(id, nome) {
  const query = `
    UPDATE \`sitefatecdsm-01-2025.SiteFatecDSM.turno\`
    SET nome = @nome
    WHERE id = @id;
  `;

  const options = {
    query,
    params: {
      id: parseInt(id),      
      nome: String(nome)     
    },
    useLegacySql: false      
  };


  try {
    const [rows] = await bigquery.query(options);
    return { status:200, mensagem: 'Turno atualizado com sucesso!' };
    
  } catch (erro) {
    console.error('Erro ao alterar turno:', erro);
    return { status: 400, mensagem: 'Problemas com o banco de dados.' };
  }
}

async function deleteExistingTurno( id ) {
  const query = `
    DELETE FROM \`sitefatecdsm-01-2025.SiteFatecDSM.turno\`
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
    return { sucesso: true, mensagem: 'Turno atualizado com sucesso!' };
    
  } catch (erro) {
    console.error('Erro ao alterar turno:', erro);
    return { status: 400, mensagem: 'Problemas com o banco de dados.' };
  }
}


module.exports = {
  searchAllTurnos,
  createNewTurno,
  turnoExistsOrNotById,
  updateExistingTurno,
  deleteExistingTurno
};
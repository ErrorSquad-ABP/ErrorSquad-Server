const pool = require('../../lib/pool');

async function createNewDia(nome) {

  const query =
`INSERT INTO errorsquad.dia(nome)
VALUES
($1);`;

  const values = [nome];

  try {
    await pool.query(query, values);
    return { status: 201, mensagem: 'Dia inserido com sucesso!' };
  } catch (erro) {
    console.error('Erro ao inserir dia:', erro);
    return { status: 400, mensagem: 'Problemas com o banco de dados.' };
  }
}

async function searchAllDias() {

  const query =
    `SELECT * 
      FROM \`sitefatecdsm-01-2025.SiteFatecDSM.dia\`
      order by id asc`;

  const [rows] = await pool.query({ query });

  if (rows.length > 0) {

    return { status: 200, data: rows, };

  }

  if (rows.length <= 0) {

    return { status: 200, mensagem: "Sem dias cadastrados." };

  }


}

async function diaExistsOrNotById(id) {
  const query = `
      SELECT * FROM \`sitefatecdsm-01-2025.SiteFatecDSM.dia\`
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

async function updateExistingDia(id, nome) {
  const query = `
      UPDATE \`sitefatecdsm-01-2025.SiteFatecDSM.dia\`
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
    const [rows] = await pool.query(options);
    return { status: 200, mensagem: 'Dia atualizado com sucesso!' };

  } catch (erro) {
    console.error('Erro ao alterar dia:', erro);
    return { status: 400, mensagem: 'Problemas com o banco de dados.' };
  }
}

async function deleteExistingDia(id) {
  const query = `
      DELETE FROM \`sitefatecdsm-01-2025.SiteFatecDSM.dia\`
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
    return { sucesso: true, mensagem: 'Dia atualizado com sucesso!' };

  } catch (erro) {
    console.error('Erro ao alterar dia:', erro);
    return { status: 400, mensagem: 'Problemas com o banco de dados.' };
  }
}

module.exports = {
  searchAllDias,
  createNewDia,
  diaExistsOrNotById,
  updateExistingDia,
  deleteExistingDia
};
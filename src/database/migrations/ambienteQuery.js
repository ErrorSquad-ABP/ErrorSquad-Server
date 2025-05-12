const bigquery = require('../../lib/bigquery');

async function createNewAmbiente(nome, localizacao) {

  const query =
    `INSERT INTO sitefatecdsm-01-2025.SiteFatecDSM.ambiente (id, nome, localizacao)
    SELECT 
    COALESCE((SELECT MAX(id) FROM sitefatecdsm-01-2025.SiteFatecDSM.ambiente), 0) + 1,
   @nome, @localizacao;`;

  const options = {
    query,
    params: {
      nome: String(nome),
      localizacao: parseInt(localizacao)
    },
    useLegacySql: false
  };

  try {
    await bigquery.query(options);
    return { status: 201, mensagem: 'Ambiente inserido com sucesso!' };
  } catch (erro) {
    console.error('Erro ao inserir ambiente:', erro);
    return { status: 400, mensagem: 'Problemas com o banco de dados.' };
  }
}

async function searchAllAmbientes() {

  const query =
    `SELECT * 
      FROM \`sitefatecdsm-01-2025.SiteFatecDSM.ambiente\`
      order by id asc`;

  const [rows] = await bigquery.query({ query });

  if (rows.length > 0) {

    return { status: 200, data: rows, };

  }

  if (rows.length <= 0) {

    return { status: 200, mensagem: "Sem ambientes cadastrados." };

  }


}

async function ambienteExistsOrNotById(id) {
  const query = `
      SELECT * FROM \`sitefatecdsm-01-2025.SiteFatecDSM.ambiente\`
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

async function updateExistingAmbiente(id, nome) {
  const query = `
      UPDATE \`sitefatecdsm-01-2025.SiteFatecDSM.ambiente\`
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
    return { status: 200, mensagem: 'Ambiente atualizado com sucesso!' };

  } catch (erro) {
    console.error('Erro ao alterar ambiente:', erro);
    return { status: 400, mensagem: 'Problemas com o banco de dados.' };
  }
}

async function deleteExistingAmbiente(id) {
  const query = `
      DELETE FROM \`sitefatecdsm-01-2025.SiteFatecDSM.ambiente\`
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
    return { sucesso: 200, mensagem: 'Ambiente deletado com sucesso!' };

  } catch (erro) {
    console.error('Erro ao alterar ambiente:', erro);
    return { status: 400, mensagem: 'Problemas com o banco de dados.' };
  }
}

module.exports = {
  searchAllAmbientes,
  createNewAmbiente,
  ambienteExistsOrNotById,
  updateExistingAmbiente,
  deleteExistingAmbiente
};
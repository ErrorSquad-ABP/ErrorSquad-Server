const bigquery = require('../../lib/bigquery');

async function createNewHorario(hr_inicio, hr_fim) {

  const query =
    `INSERT INTO sitefatecdsm-01-2025.SiteFatecDSM.horario ( id ,hr_inicio, hr_fim )
    SELECT 
    COALESCE((SELECT MAX(id) FROM sitefatecdsm-01-2025.SiteFatecDSM.horario), 0) + 1,
   CAST(@hr_inicio AS TIME), 
   CAST(@hr_fim AS TIME);`;

  const options = {
    query,
    params: {
      hr_inicio,
      hr_fim
    },
    useLegacySql: false
  };

  try {
    await bigquery.query(options);
    return { status: 201, mensagem: 'Horário inserido com sucesso!' };
  } catch (erro) {
    console.error('Erro ao inserir horário:', erro);
    return { status: 400, mensagem: 'Problemas com o banco de dados.' };
  }
}


async function searchAllHorarios() {

  const query =
    `SELECT * 
    FROM \`sitefatecdsm-01-2025.SiteFatecDSM.horario\`
    order by id asc`;

  const [rows] = await bigquery.query({ query });

  if (rows.length > 0) {

    return { status: 200, data: rows, };

  }

  if (rows.length <= 0) {

    return { status: 200, mensagem: "Sem horários cadastrados." };

  }


}

async function horarioExistsOrNotById(id) {
  const query = `
    SELECT * FROM \`sitefatecdsm-01-2025.SiteFatecDSM.horario\`
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


async function updateExistingHorario(id, hr_inicio, hr_fim) {
  const query = `
    UPDATE \`sitefatecdsm-01-2025.SiteFatecDSM.horario\`
    SET hr_inicio = @hr_inicio,
    hr_fim = @hr_fim
    WHERE id = @id;
  `;

  const options = {
    query,
    params: {
      id: parseInt(id),
      hr_inicio: (hr_inicio),
      hr_fim: (hr_fim)
    },
    useLegacySql: false
  };


  try {
    const [rows] = await bigquery.query(options);
    return { status: 200, mensagem: 'Horário atualizado com sucesso!' };

  } catch (erro) {
    console.error('Erro ao alterar horário:', erro);
    return { status: 400, mensagem: 'Problemas com o banco de dados.' };
  }
}

async function deleteExistingHorario(id) {
  const query = `
    DELETE FROM \`sitefatecdsm-01-2025.SiteFatecDSM.horario\`
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
    return { sucesso: true, mensagem: 'Horário atualizado com sucesso!' };

  } catch (erro) {
    console.error('Erro ao alterar horário:', erro);
    return { status: 400, mensagem: 'Problemas com o banco de dados.' };
  }
}


module.exports = {
  searchAllHorarios,
  createNewHorario,
  horarioExistsOrNotById,
  updateExistingHorario,
  deleteExistingHorario
};
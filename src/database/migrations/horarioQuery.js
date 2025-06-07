const pool = require('../../lib/pool');

async function createNewHorario(hr_inicio, hr_fim) {

  const query =
   `INSERT INTO errorsquad.horario(hr_inicio, hr_fim)
VALUES
($1, $2);`;
 


  const values = [hr_inicio, hr_fim];

  try {
    const result = await pool.query(query, values);
    return { status: 201, mensagem: 'Horário inserido com sucesso!' };
  } catch (erro) {
    console.error('Erro ao inserir horário:', erro);
    return { status: 400, mensagem: 'Problemas com o banco de dados.' };
  }
}


async function searchAllHorarios() {

  const query =
    `SELECT * 
    FROM errorsquad.horario
    order by id asc`;

  const { rows } = await pool.query(query);

  if (rows.length > 0) {

    return { status: 200, data: rows, };

  }

  if (rows.length <= 0) {

    return { status: 200, mensagem: "Sem horários cadastrados." };

  }


}

async function horarioExistsOrNotById(id) {
  const query = `
    SELECT * FROM errorsquad.horario
    WHERE id = $1;
  `;

  const values = [id];

  const { rows } = await pool.query(query , values);

  return rows.length > 0;
}


async function updateExistingHorario(id, hr_inicio, hr_fim) {
  const query = `
    UPDATE errorsquad.horario
    SET hr_inicio = $1
    hr_fim = $2
    WHERE id = $3;
  `;

  const values = [hr_inicio, hr_fim, id];


  try {
    const result = await pool.query(query, values);
    return { status: 200, mensagem: 'Horário atualizado com sucesso!' };

  } catch (erro) {
    console.error('Erro ao alterar horário:', erro);
    return { status: 400, mensagem: 'Problemas com o banco de dados.' };
  }
}

async function deleteExistingHorario(id) {
  const query = `
    DELETE FROM errorsquad.horario
    WHERE id = $1;
  `;

  const values = [id];


  try {
    const result = await pool.query(query, values);
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
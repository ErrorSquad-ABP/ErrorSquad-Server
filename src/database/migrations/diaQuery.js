const pool = require('../../lib/pool');

async function createNewDia(nome) {

  const query =
    `INSERT INTO errorsquad.dia(nome)
VALUES
($1);`;

  const values = [nome];

  try {
    const result = await pool.query(query, values);
    return { status: 201, mensagem: 'Dia inserido com sucesso!' };
  } catch (erro) {
    console.error('Erro ao inserir dia:', erro);
    return { status: 400, mensagem: 'Problemas com o banco de dados.' };
  }
}

async function searchAllDias() {

  const query =
    `SELECT * 
      FROM errorsquad.dia
      order by id asc`;


  try {

    const { rows } = await pool.query(query);

    if (rows.length > 0) {

      return { status: 200, data: rows, };

    }

    if (rows.length <= 0) {

      return { status: 200, mensagem: "Sem dias cadastrados." };

    }


  } catch (erro) {
    console.error('Erro ao buscar dias:', erro);
    return { status: 400, mensagem: 'Problemas com o banco de dados.' };
  }
}

async function diaExistsOrNotById(id) {
  const query = `
      SELECT * FROM errorsquad.dia
      WHERE id = $1;
    `;

  const values = [id];

  const { rows } = await pool.query(query, values);


  return rows.length > 0;
}

async function updateExistingDia(id, nome) {
  const query = `
      UPDATE errorsquad.dia
      SET nome = $1
      WHERE id = $2;
    `;

  const values = [nome, id]

  try {
    const result = await pool.query(query, values);
    return { status: 200, mensagem: 'Dia atualizado com sucesso!' };

  } catch (erro) {
    console.error('Erro ao alterar dia:', erro);
    return { status: 400, mensagem: 'Problemas com o banco de dados.' };
  }
}

async function deleteExistingDia(id) {
  const query = `
      DELETE FROM errorsquad.dia
      WHERE id = $1;
    `;

  const values = [id]

  try {
    const result = await pool.query(query, values);
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
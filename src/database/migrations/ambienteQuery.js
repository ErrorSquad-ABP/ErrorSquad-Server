const pool = require('../../lib/pool');

async function createNewAmbiente(nome, localizacao) {

  const query =


  `CALL errorsquad.inserir_ambiente(
    $1, $2, $3
);`;
 
  const values = [
    nome,
    localizacao,
    nome_andar
  ]

  try {
    const result = await pool.query(query, values);
    return { status: 201, mensagem: 'Ambiente inserido com sucesso!' };
  } catch (erro) {
    console.error('Erro ao inserir ambiente:', erro);
    return { status: 400, mensagem: 'Problemas com o banco de dados.' };
  }
}

async function searchAllAmbientes() {

  const query =
    `SELECT * 
      FROM errorsquad.ambiente
      order by id asc`;

  const {rows} = await pool.query(query);

  if (rows.length > 0) {

    return { status: 200, data: rows, };

  }

  if (rows.length <= 0) {

    return { status: 200, mensagem: "Sem ambientes cadastrados." };

  }


}

async function ambienteExistsOrNotById(id) {
  const query = `
      SELECT * FROM errorsquad.ambiente
      WHERE id = $1;
    `;

  const values = [id]

  const { rows } = await pool.query(query, values);


  return rows.length > 0;
}

async function updateExistingAmbiente(id, nome) {
  const query = `
      UPDATE errorsquad.ambiente
      SET nome = $1
      WHERE id = $2;
    `;

  const values = [nome, id];

  try {
    const result = await pool.query(query, values);
    return { status: 200, mensagem: 'Ambiente atualizado com sucesso!' };

  } catch (erro) {
    console.error('Erro ao alterar ambiente:', erro);
    return { status: 400, mensagem: 'Problemas com o banco de dados.' };
  }
}

async function deleteExistingAmbiente(id) {
  const query = `
      DELETE FROM errorsquad.ambiente
      WHERE id = $1;
    `;

  const values = [id];


  try {
    const result = await pool.query(query, values);
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
const pool = require('../../lib/pool');

async function login(email) {
  const query = `
    SELECT id, nome, senha AS hashed_password
    FROM errorsquad.admin
    WHERE email = $1;
  `;

  const values = [email];

  try {
    const { rows } = await pool.query(query, values);
    
    if (rows.length === 0) {
      return null;
    }

    const user = rows[0];

    return {
      id: user.id,
      nome: user.nome,
      hashed_password: user.hashed_password,
    };

  } catch (error) {
    console.error("Erro ao executar login:", error);
    throw error; // ou return null;
  }
}

async function userExistsOrNotById( id ) {
  const query = `
      SELECT * FROM errorsquad.admin
      WHERE id = $1;
    `;

  const values = [id];

  const { rows } = await pool.query(query, values);

  return rows.length > 0;
}

async function updateNameExistingUser(id, nome) {
  const query = `
      UPDATE errorsquad.admin
      SET nome = $1
      WHERE id = $2;
    `;

  const values = [nome, id];


  try {
    const result = await pool.query(query, values);
    return { status: 200, mensagem: 'Nome do usuário atualizado com sucesso!' };

  } catch (erro) {
    console.error('Erro ao alterar dia:', erro);
    return { status: 400, mensagem: 'Problemas com o banco de dados.' };
  }
}

async function searchUserById(id) {

  const query = `SELECT (
  SELECT row_to_json(a)
  FROM (
    SELECT *
    FROM errorsquad.admin
    WHERE id = $1
  ) a
) AS admin;`;

    const values = [id];

  const {rows} = await pool.query( query, values );

  if (rows.length > 0) {

    return { status: 200, data: rows, };

  }

  if (rows.length <= 0) {

    return { status: 200, mensagem: "Sem usuários cadastrados." };

  }


}

async function getPasswordHashed(id) {
  const query = `
    SELECT senha FROM errorsquad.admin
    WHERE id = $1;
  `;

  const values = [id];

  const { rows } = await pool.query(query, values);

  if (rows.length === 0) {
    return null; // ou lançar erro se quiser: throw new Error('Admin não encontrado');
  }

  return rows[0].senha;
}

async function updatePasswordExistingUser(id, senha) {
  const query = `
      UPDATE errorsquad.admin
      SET senha = $1
      WHERE id = $2;
    `;

  const values = [senha, id];


  try {
    const result = await pool.query(query, values);
    return { status: 200, mensagem: 'Senha do usuário atualizada com sucesso!' };

  } catch (erro) {
    console.error('Erro ao alterar dia:', erro);
    return { status: 400, mensagem: 'Problemas com o banco de dados.' };
  }
}

module.exports = {
  login,
  userExistsOrNotById,
  updateNameExistingUser,
  getPasswordHashed,
  updatePasswordExistingUser,
  searchUserById
};

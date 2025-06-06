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
      SELECT * FROM \`sitefatecdsm-01-2025.SiteFatecDSM.admin\`
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

async function updateNameExistingUser(id, nome) {
  const query = `
      UPDATE \`sitefatecdsm-01-2025.SiteFatecDSM.admin\`
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
    await pool.query(options);
    return { status: 200, mensagem: 'Nome do usuário atualizado com sucesso!' };

  } catch (erro) {
    console.error('Erro ao alterar dia:', erro);
    return { status: 400, mensagem: 'Problemas com o banco de dados.' };
  }
}

async function searchUserById(id) {

  const query =
    `SELECT (
      SELECT AS STRUCT nome, email
      FROM \`sitefatecdsm-01-2025.SiteFatecDSM.admin\`
      WHERE id = @id
    ) AS admin;`;

    const options = {
      query,
      params: {
        id: parseInt(id)
      },
      useLegacySql: false
    };  

  const [rows] = await pool.query( options );

  if (rows.length > 0) {

    return { status: 200, data: rows, };

  }

  if (rows.length <= 0) {

    return { status: 200, mensagem: "Sem usuários cadastrados." };

  }


}

async function getPasswordHashed( id ) {
  const query = `
      SELECT senha FROM \`sitefatecdsm-01-2025.SiteFatecDSM.admin\`
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

  return rows[0].senha
}

async function updatePasswordExistingUser(id, senha) {
  const query = `
      UPDATE \`sitefatecdsm-01-2025.SiteFatecDSM.admin\`
      SET senha = @senha
      WHERE id = @id;
    `;

  const options = {
    query,
    params: {
      id: parseInt(id),
      senha: String(senha)
    },
    useLegacySql: false
  };


  try {
    await pool.query(options);
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

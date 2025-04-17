const bigquery = require('../../lib/bigquery');

async function login(email) {
  const query = `
    SELECT id, nome, senha AS hashed_password
    FROM \`sitefatecdsm-01-2025.SiteFatecDSM.admin\`
    WHERE email = @email;
  `;

  const options = {
    query: query,
    params: { email },
  };

  const [rows] = await bigquery.query(options);

  if (rows.length === 0) {
    return null; // Retorna null se nenhum usuário for encontrado
  }

  const user = rows[0];

  return {
    id: user.id,
    nome: user.nome,
    hashed_password: user.hashed_password,
  };
}

module.exports = {
  login,
};

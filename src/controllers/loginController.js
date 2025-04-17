const user = require('../database/entity/user');

async function requestLogin(req, res) {

  try {
    const loginUser = await user.validateLogin(req.body.email, req.body.senha);
    res.status(loginUser.status).json({
      message: loginUser.message,
      data: loginUser.data
    });
  } catch (error) {
    console.error('Erro ao logar no servidor:', error);
    res.status(500).json({ erro: 'Erro interno ao logar no servidor' });
  }
}

module.exports = {
  requestLogin
};
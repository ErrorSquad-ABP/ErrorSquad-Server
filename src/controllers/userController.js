const user = require("../database/entity/user");
const alterNameDto = require("../database/entity/dto/alterNameUserDto");
const alterPasswordDto = require("../database/entity/dto/alterPasswordUserDto");

async function requestAlterNameUser(req, res) {

  const id = req.body.id;

  const nome = req.body.nome;

  const newNameUserDto = new alterNameDto( id, nome );

  const newNameUser = new user( newNameUserDto.id, newNameUserDto.nome, null, null );

   try {
    const updateName = await newNameUser.updateName( newNameUser );
    res.status(updateName.status).json(updateName);
  } catch (error) {
    console.error('Erro ao atualizar nome:', error);
    res.status(500).json({ erro: 'Erro interno ao atualizar nome' });
  }

}

async function listUserById(req, res) {
  try {

    const id = req.params.a_id;

    const users = await user.getUserById(id);
    res.status(users.status).json({
      message: users.mensagem,
      data: users.data
    });
  } catch (error) {
    console.error('Erro ao listar usuários:', error);
    res.status(500).json({ erro: 'Erro interno ao buscar usuários' });
  }
}

async function requestAlterPasswordUser(req, res) {

  const id = req.body.id;

  const senhaAtual = req.body.senhaAtual;

  const senhaNova = req.body.senhaNova;

  const newPasswordUserDto = new alterPasswordDto( id, senhaNova );

  const newPasswordUser = new user( newPasswordUserDto.id , null, null, newPasswordUserDto.senha );

  try {
    const updatePassword = await newPasswordUser.updatePassword( newPasswordUser, senhaAtual );
    res.status(updatePassword.status).json(updatePassword);
  } catch (error) {
    console.error('Erro ao atualizar credenciais:', error);
    res.status(500).json({ erro: 'Erro interno ao atualizar credenciais' });
  }
}

module.exports = { requestAlterNameUser, requestAlterPasswordUser, listUserById }
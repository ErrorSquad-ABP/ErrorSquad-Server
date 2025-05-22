const user = require("../database/entity/user");
const alterNameDto = require("../database/entity/dto/alterNameUserDto");
const alterPasswordDto = require("../database/entity/dto/alterPasswordUserDto");

async function requestAlterNameUser(req, res) {

  const nome = req.body.nome;

  const newNameUserDto = new alterNameDto( nome );

  const newNameUser = new user( null, newNameUserDto, null, null );

   try {
    const updateName = await newNameUser.updateName( newNameUser );
    res.status(updateName).json(updateName);
  } catch (error) {
    console.error('Erro ao atualizar nome:', error);
    res.status(500).json({ erro: 'Erro interno ao atualizar nome' });
  }

}

async function requestAlterPasswordUser(req, res) {

  const senha = req.body.senha;

  const newPasswordUserDto = new alterPasswordDto( senha );

  const newPasswordUser = new user( null, null, null, newPasswordUserDto );

  try {
    const updatePassword = await newPasswordUser.updatePassword( newPasswordUser );
    res.status(updatePassword.status).json(updatePassword);
  } catch (error) {
    console.error('Erro ao atualizar nome:', error);
    res.status(500).json({ erro: 'Erro interno ao atualizar nome' });
  }
}

module.exports = { requestAlterNameUser, requestAlterPasswordUser }
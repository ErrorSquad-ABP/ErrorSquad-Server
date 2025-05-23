const bcrypt = require('bcrypt');

// Função para criptografar uma senha
async function encryptPassword(password) {
    const saltRounds = 10; // Número de rodadas para gerar o salt
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
}

module.exports = { encryptPassword};

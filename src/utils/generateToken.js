const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET_KEY;

// Função para gerar o token JWT
function generateToken(tokenInfos) {
    const payload = {
        id: tokenInfos.id,
        nome: tokenInfos.nome,  
    };

    const options = {
        expiresIn: '1h', 
    };

    // Gerando o token com o payload, a chave secreta e as opções
    const token = jwt.sign(payload, secretKey, options);

    return token;  // Retorna o token gerado
}

module.exports = generateToken;

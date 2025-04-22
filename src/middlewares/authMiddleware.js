const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET_KEY;

 function authenticate(req, res, next) {
    // Pega o token do header Authorization
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ message: "Acesso negado. Nenhum token fornecido." });
    }

    try {
        const decoded = jwt.verify(token, secretKey);  // Decodifica o token usando a chave secreta
        req.user = decoded;  // Adiciona os dados do usuário no objeto 'req', para que as próximas rotas possam acessá-lo
        next();  
    } catch (err) {
        return res.status(400).json({ message: "Token inválido." });
    }
};
module.exports = authenticate;

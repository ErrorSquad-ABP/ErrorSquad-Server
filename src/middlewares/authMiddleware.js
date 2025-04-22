// authMiddleware.js
const jwt = require('jsonwebtoken');
const secretKey = 'seuSegredoAqui'; // A chave secreta que você usa para assinar os tokens

module.exports = function authenticate(req, res, next) {
    // Pega o token do header Authorization
    const token = req.header('Authorization')?.replace('Bearer ', ''); // O token é geralmente passado no header como 'Bearer <token>'

    if (!token) {
        return res.status(401).json({ message: "Acesso negado. Nenhum token fornecido." });
    }

    try {
        // Verifica e decodifica o token
        const decoded = jwt.verify(token, secretKey);  // Decodifica o token usando a chave secreta
        req.user = decoded;  // Adiciona os dados do usuário no objeto 'req', para que as próximas rotas possam acessá-lo
        next();  // Passa para o próximo middleware ou rota
    } catch (err) {
        return res.status(400).json({ message: "Token inválido." });
    }
};

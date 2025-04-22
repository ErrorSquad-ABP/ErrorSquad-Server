// checkAdminMiddleware.js

module.exports = function checkAdmin(req, res, next) {
  // Verifica se o usuário está autenticado e se é um admin
  const user = req.user;  // O 'user' foi adicionado pelo middleware 'authenticate'

  if (user && user.role === 'admin') {
      return next();  // Se for admin, segue para a próxima função (a rota)
  }

  // Se não for admin, retorna um erro 403 (Forbidden)
  return res.status(403).json({ message: "Acesso negado. Somente administradores podem acessar esta rota." });
};

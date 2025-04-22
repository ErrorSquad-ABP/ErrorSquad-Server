const checkAdminId = (req, res, next) => {
  const userId = req.user.id; // O ID do usuário autenticado
  const routeId = req.params.id; // O ID da URL

  if (userId !== parseInt(routeId)) {
      return res.status(403).json({ message: "Acesso negado. ID do usuário não corresponde." });
  }

  next(); // Passa para o próximo middleware ou controller
};

module.exports = checkAdminId;
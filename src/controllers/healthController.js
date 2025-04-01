const checkHealth = (req, res) => {
  res.status(200).json({ status: "OK", message: "Servidor funcionando corretamente" });
};

module.exports = { checkHealth };

const express = require("express");
const router = express.Router();

const healthRoutes = require("./healthRoutes");

// Adicionamos a rota de verificação de saúde no endpoint "/health"
router.use("/health", healthRoutes);

module.exports = router;


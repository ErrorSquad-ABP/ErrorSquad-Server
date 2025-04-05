const express = require("express");
const router = express.Router();

const healthRoutes = require("./healthRoutes");
const cursosRoutes = require("./cursoRoutes");

// Adicionamos a rota de verificação de saúde no endpoint "/health"
router.use("/health", healthRoutes);
router.use("/cursos", cursosRoutes);

module.exports = router;


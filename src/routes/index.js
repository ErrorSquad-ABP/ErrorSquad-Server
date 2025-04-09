const express = require("express");
const router = express.Router();

const healthRoutes = require("./healthRoutes");
const cursosRoutes = require("./cursoRoutes");
const turnosRoutes = require("./turnoRoutes");


// Adicionamos a rota de verificação de saúde no endpoint "/health"
router.use("/health", healthRoutes);
router.use("/cursos", cursosRoutes);
router.use("/turnos", turnosRoutes);

module.exports = router;


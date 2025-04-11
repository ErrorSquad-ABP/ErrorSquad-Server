const express = require("express");
const router = express.Router();

const healthRoutes = require("./healthRoutes");
const cursosRoutes = require("./cursoRoutes");
const turnosRoutes = require("./turnoRoutes");
const docenteRoutes = require("./docenteRoutes");
const semestreRoutes = require("./semestreRoutes");

// Adicionamos a rota de verificação de saúde no endpoint "/health"
router.use("/health", healthRoutes);
router.use("/cursos", cursosRoutes);
router.use("/turno", turnosRoutes);
router.use("/docente", docenteRoutes);
router.use("/semestre", semestreRoutes);

module.exports = router;
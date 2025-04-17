const express = require("express");
const router = express.Router();

const healthRoutes = require("./healthRoutes");
const diasRoutes = require("./diaRoutes");
const cursosRoutes = require("./cursoRoutes");
const turnosRoutes = require("./turnoRoutes");
const docenteRoutes = require("./docenteRoutes");
const semestreRoutes = require("./semestreRoutes");
const ambienteRoutes = require("./ambienteRoutes");
const disciplinaRoutes = require("./disciplinaRoutes");
const horarioRoutes = require("./horarioRoutes");
const periodosRoutes = require("./periodoRoutes");
const loginRoutes = require("./loginRoutes");

// Adicionamos a rota de verificação de saúde no endpoint "/health"
router.use("/health", healthRoutes);
router.use("/dia", diasRoutes);
router.use("/cursos", cursosRoutes);
router.use("/turno", turnosRoutes);
router.use("/docente", docenteRoutes);
router.use("/semestre", semestreRoutes);
router.use("/ambientes", ambienteRoutes);
router.use("/disciplina", disciplinaRoutes);
router.use("/horarios", horarioRoutes);
router.use("/periodos", periodosRoutes);
router.use("/login", loginRoutes);

module.exports = router;
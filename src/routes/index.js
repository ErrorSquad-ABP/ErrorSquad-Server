const express = require("express");
const router = express.Router();
const authenticate = require("../middlewares/authMiddleware");
const checkAdminId = require("../middlewares/checkAdminId");

// Importando as rotas
const gradeRoutes = require("./gradeRoutes")
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
const healthRoutes = require("./healthRoutes");

// Rotas públicas
router.use("/health", healthRoutes);
router.use("/login", loginRoutes); //Retornar um id e um token jwt

// Rotas protegidas para administração (com id na URL)
router.use("/admin/:id", authenticate); // Aplica a autenticação a todas as rotas /admin/id

// Aqui, o id será extraído da URL e passado para as rotas
router.use("/admin/:id/grade", authenticate, checkAdminId, gradeRoutes);
router.use("/admin/:id/dia", authenticate, checkAdminId, diasRoutes);
router.use("/admin/:id/cursos", authenticate, checkAdminId, cursosRoutes);
router.use("/admin/:id/turno", authenticate, checkAdminId, turnosRoutes);
router.use("/admin/:id/docente", authenticate, checkAdminId, docenteRoutes);
router.use("/admin/:id/semestre", authenticate, checkAdminId, semestreRoutes);
router.use("/admin/:id/ambientes", authenticate, checkAdminId, ambienteRoutes);
router.use("/admin/:id/disciplina", authenticate, checkAdminId, disciplinaRoutes);
router.use("/admin/:id/horarios", authenticate, checkAdminId, horarioRoutes);
router.use("/admin/:id/periodos", authenticate, checkAdminId, periodosRoutes);

module.exports = router;

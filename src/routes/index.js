const express = require("express");
const router = express.Router();
const authenticate = require("./authMiddleware");
const checkAdmin = require("./checkAdminMiddleware"); // Middleware para verificar se o usuário é admin

// Importando as rotas
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
router.use("/admin/:id", authenticate, checkAdmin); // Aplica a autenticação e verificação de admin a todas as rotas /admin/id

// Aqui, o id será extraído da URL e passado para as rotas
router.use("/admin/:id/dia", authenticate, checkAdmin, diasRoutes);
router.use("/admin/:id/cursos", authenticate, checkAdmin, cursosRoutes);
router.use("/admin/:id/turno", authenticate, checkAdmin, turnosRoutes);
router.use("/admin/:id/docente", authenticate, checkAdmin, docenteRoutes);
router.use("/admin/:id/semestre", authenticate, checkAdmin, semestreRoutes);
router.use("/admin/:id/ambientes", authenticate, checkAdmin, ambienteRoutes);
router.use("/admin/:id/disciplina", authenticate, checkAdmin, disciplinaRoutes);
router.use("/admin/:id/horarios", authenticate, checkAdmin, horarioRoutes);
router.use("/admin/:id/periodos", authenticate, checkAdmin, periodosRoutes);

module.exports = router;

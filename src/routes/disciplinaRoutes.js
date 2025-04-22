const express = require("express");
const router = express.Router();
const disciplinaController = require("../controllers/disciplinaController");
const authenticate = require("../middlewares/authMiddleware");
const checkAdmin = require("../middlewares/checkAdminMiddleware");

// Rota para criar uma disciplina
router.post("/", authenticate, checkAdmin, disciplinaController.requestNewDisciplina);

// Rota para listar disciplina
router.get("/", authenticate, checkAdmin, disciplinaController.listDisciplinas);

// Rota para alterar disciplina
router.put("/", authenticate, checkAdmin, disciplinaController.requestAlterDisciplina);

// Rota para alterar disciplina
router.delete("/", authenticate, checkAdmin, disciplinaController.requestDeleteDisciplina);

module.exports = router;
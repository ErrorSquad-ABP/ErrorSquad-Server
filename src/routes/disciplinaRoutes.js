const express = require("express");
const router = express.Router();
const disciplinaController = require("../controllers/disciplinaController");
const authenticate = require("../middlewares/authMiddleware");

// Rota para criar uma disciplina
router.post("/", authenticate, disciplinaController.requestNewDisciplina);

// Rota para listar disciplinas
router.get("/", authenticate, disciplinaController.listDisciplinas);

// Rota para alterar disciplina
router.put("/", authenticate, disciplinaController.requestAlterDisciplina);

// Rota para deletar disciplina
router.delete("/", authenticate, disciplinaController.requestDeleteDisciplina);

module.exports = router;
const express = require("express");
const router = express.Router();
const disciplinaController = require("../controllers/disciplinaController");

// Rota para criar uma disciplina
router.post("/", disciplinaController.requestNewDisciplina);

// Rota para listar disciplina
router.get("/", disciplinaController.listDisciplinas);

// Rota para alterar disciplina
router.put("/", disciplinaController.requestAlterDisciplina);

// Rota para alterar disciplina
router.delete("/", disciplinaController.requestDeleteDisciplina);

module.exports = router;
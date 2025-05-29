const express = require("express");
const router = express.Router();
const disciplinaController = require("../controllers/disciplinaController");
const authenticate = require("../middlewares/authMiddleware");

// Rota para criar uma disciplina
router.post("/", authenticate, disciplinaController.requestNewDisciplina);

// Rota para listar disciplinas
router.get("/", authenticate, disciplinaController.listDisciplinas);

// Rota para selecionar disciplina pelo id
router.get("/:d_id", authenticate, disciplinaController.listDisciplinaById);

// Rota para alterar disciplina
router.put("/", authenticate, disciplinaController.requestAlterDisciplina);

// Rota para deletar disciplina
router.delete("/", authenticate, disciplinaController.requestDeleteDisciplina);



module.exports = router;
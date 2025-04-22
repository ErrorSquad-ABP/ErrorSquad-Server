const express = require("express");
const router = express.Router();
const semestreController = require("../controllers/semestreController");
const authenticate = require("../middlewares/authMiddleware");

// Rota para criar um semestre
router.post("/", authenticate, semestreController.requestNewSemestre);

// Rota para listar semestres
router.get("/", authenticate, semestreController.listSemestres);

// Rota para alterar semestre
router.put("/", authenticate, semestreController.requestAlterSemestre);

// Rota para deletar semestre
router.delete("/", authenticate, semestreController.requestDeleteSemestre);


module.exports = router;
const express = require("express");
const router = express.Router();
const semestreController = require("../controllers/semestreController");

// Rota para criar um semesrte
router.post("/", semestreController.requestNewSemestre);

// Rota para listar semesrte
router.get("/", semestreController.listSemestres);

// Rota para alterar semesrte
router.put("/", semestreController.requestAlterSemestre);

// Rota para alterar semesrte
router.delete("/", semestreController.requestDeleteSemestre);


module.exports = router;
const express = require("express");
const router = express.Router();
const cursoController = require("../controllers/cursoController");

// Rota para criar um curso
router.post("/", cursoController.requestNewCurso);

// Rota para listar curso
router.get("/", cursoController.listCursos);

// Rota para alterar curso
router.put("/", cursoController.requestAlterCurso);

// Rota para alterar curso
router.delete("/", cursoController.requestDeleteCurso)


module.exports = router;

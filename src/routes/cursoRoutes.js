const express = require("express");
const router = express.Router();
const userController = require("../controllers/cursoController");

// Rota para criar um curso
router.post("/", userController.requestNewCurso);

// Rota para listar curso
router.get("/", userController.listCursos);

// Rota para alterar curso
router.put("/", userController.requestAlterCurso);

// Rota para alterar curso
router.delete("/", userController.requestDeleteCurso)


module.exports = router;

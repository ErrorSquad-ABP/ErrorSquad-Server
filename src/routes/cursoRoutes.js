const express = require("express");
const router = express.Router();
const userController = require("../controllers/cursoController");

// Rota para criar um curso
router.post("/", userController.requestNewCurso);

// Rota para listar curso
router.get("/", userController.listCursos);


module.exports = router;

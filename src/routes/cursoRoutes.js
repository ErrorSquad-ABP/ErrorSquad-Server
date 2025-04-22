const express = require("express");
const router = express.Router();
const cursoController = require("../controllers/cursoController");
const authenticate = require("../middlewares/authMiddleware");

// Rota para criar um curso
router.post("/", authenticate, cursoController.requestNewCurso);

// Rota para listar cursos
router.get("/", authenticate, cursoController.listCursos);

// Rota para alterar curso
router.put("/", authenticate, cursoController.requestAlterCurso);

// Rota para deletar curso
router.delete("/", authenticate, cursoController.requestDeleteCurso)


module.exports = router;

const express = require("express");
const router = express.Router();
const cursoController = require("../controllers/cursoController");
const authenticate = require("../middlewares/authMiddleware");
const checkAdmin = require("../middlewares/checkAdminMiddleware"); 

// Rota para criar um curso
router.post("/", authenticate, checkAdmin, cursoController.requestNewCurso);

// Rota para listar curso
router.get("/", authenticate, checkAdmin, cursoController.listCursos);

// Rota para alterar curso
router.put("/", authenticate, checkAdmin, cursoController.requestAlterCurso);

// Rota para alterar curso
router.delete("/", authenticate, checkAdmin, cursoController.requestDeleteCurso)


module.exports = router;

const express = require("express");
const router = express.Router();
const docenteController = require("../controllers/docenteController");
const authenticate = require("../middlewares/authMiddleware");

// Rota para criar um docente
router.post("/", authenticate, docenteController.requestNewDocente);

// Rota para listar docentes
router.get("/", authenticate, docenteController.listDocente);

// Rota para alterar docente
router.put("/", authenticate, docenteController.requestAlterDocente);

// Rota para deletar docente
router.delete("/", authenticate, docenteController.requestDeleteDocente);


module.exports = router;
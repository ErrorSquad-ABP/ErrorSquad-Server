const express = require("express");
const router = express.Router();
const docenteController = require("../controllers/docenteController");

// Rota para criar um docente
router.post("/", docenteController.requestNewDocente);

// Rota para listar docente
router.get("/", docenteController.listDocente);

// Rota para alterar docente
router.put("/", docenteController.requestAlterDocente);

// Rota para alterar docente
router.delete("/", docenteController.requestDeleteDocente);


module.exports = router;
const express = require("express");
const router = express.Router();
const docenteController = require("../controllers/docenteController");
const authenticate = require("../middlewares/authMiddleware");
const checkAdmin = require("../middlewares/checkAdminMiddleware");

// Rota para criar um docente
router.post("/", authenticate, checkAdmin, docenteController.requestNewDocente);

// Rota para listar docente
router.get("/", authenticate, checkAdmin, docenteController.listDocente);

// Rota para alterar docente
router.put("/", authenticate, checkAdmin, docenteController.requestAlterDocente);

// Rota para alterar docente
router.delete("/", authenticate, checkAdmin, docenteController.requestDeleteDocente);


module.exports = router;
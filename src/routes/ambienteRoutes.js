const express = require("express");
const router = express.Router();
const ambienteController = require("../controllers/ambienteController");
const authenticate = require("../middlewares/authMiddleware");


// Rota para criar um ambiente
router.post("/", authenticate, ambienteController.requestNewAmbiente);

// Rota para listar ambientes
router.get("/", authenticate, ambienteController.listAmbientes);

// Rota para alterar um ambiente
router.put("/", authenticate, ambienteController.requestAlterAmbiente);

// Rota para deletar um ambiente
router.delete("/", authenticate, ambienteController.requestDeleteAmbiente);

module.exports = router;

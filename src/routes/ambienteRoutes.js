const express = require("express");
const router = express.Router();
const ambienteController = require("../controllers/ambienteController");

// Rota para criar um ambiente
router.post("/", ambienteController.requestNewAmbiente);

// Rota para listar ambientes
router.get("/", ambienteController.listAmbientes);

// Rota para alterar ambiente
router.put("/", ambienteController.requestAlterAmbiente);

// Rota para deletar ambiente
router.delete("/", ambienteController.requestDeleteAmbiente);

module.exports = router;
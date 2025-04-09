const express = require("express");
const router = express.Router();
const diaController = require("../controllers/diaController");

// Rota para criar um dia
router.post("/", diaController.requestNewDia);

// Rota para listar dias
router.get("/", diaController.listDias);

// Rota para alterar dia
router.put("/", diaController.requestAlterDia);

// Rota para deletar dia
router.delete("/", diaController.requestDeleteDia);

module.exports = router; 

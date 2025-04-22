const express = require("express");
const router = express.Router();
const diaController = require("../controllers/diaController");
const authenticate = require("../middlewares/authMiddleware");

// Rota para criar um dia
router.post("/", authenticate, diaController.requestNewDia);

// Rota para listar dias
router.get("/", authenticate, diaController.listDias);

// Rota para alterar dia
router.put("/", authenticate, diaController.requestAlterDia);

// Rota para deletar dia
router.delete("/", authenticate, diaController.requestDeleteDia);

module.exports = router; 

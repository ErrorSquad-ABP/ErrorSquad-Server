const express = require("express");
const router = express.Router();
const diaController = require("../controllers/diaController");
const authenticate = require("../middlewares/authMiddleware");
const checkAdmin = require("../middlewares/checkAdminMiddleware");

// Rota para criar um dia
router.post("/", authenticate, checkAdmin, diaController.requestNewDia);

// Rota para listar dias
router.get("/", authenticate, checkAdmin, diaController.listDias);

// Rota para alterar dia
router.put("/", authenticate, checkAdmin, diaController.requestAlterDia);

// Rota para deletar dia
router.delete("/", authenticate, checkAdmin, diaController.requestDeleteDia);

module.exports = router; 

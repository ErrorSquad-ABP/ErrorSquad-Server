const express = require("express");
const router = express.Router();
const healthController = require("../controllers/healthController");

// Rota para verificar se o servidor está rodando
router.get("/", healthController.checkHealth);

module.exports = router;

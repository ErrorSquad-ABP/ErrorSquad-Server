const express = require("express");
const router = express.Router();
const periodoController = require("../controllers/periodoController");

// Rota para listar periodo
router.get("/", periodoController.listPeriodos);

// Rota para alterar periodo
router.put("/", periodoController.requestAlterPeriodo);

// Rota para alterar periodo
router.delete("/", periodoController.requestDeletePeriodo)


module.exports = router;

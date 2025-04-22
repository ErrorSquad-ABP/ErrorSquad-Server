const express = require("express");
const router = express.Router();
const periodoController = require("../controllers/periodoController");
const authenticate = require("../middlewares/authMiddleware");

// Rota para listar periodo
router.get("/", authenticate, periodoController.listPeriodos);

// Rota para alterar periodos
router.put("/", authenticate, periodoController.requestAlterPeriodo);

// Rota para deletar periodo
router.delete("/", authenticate, periodoController.requestDeletePeriodo)


module.exports = router;

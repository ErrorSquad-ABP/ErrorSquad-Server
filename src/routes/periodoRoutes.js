const express = require("express");
const router = express.Router();
const periodoController = require("../controllers/periodoController");
const authenticate = require("../middlewares/authMiddleware");
const checkAdmin = require("../middlewares/checkAdminMiddleware");

// Rota para listar periodo
router.get("/", authenticate, checkAdmin, periodoController.listPeriodos);

// Rota para alterar periodo
router.put("/", authenticate, checkAdmin, periodoController.requestAlterPeriodo);

// Rota para alterar periodo
router.delete("/", authenticate, checkAdmin, periodoController.requestDeletePeriodo)


module.exports = router;

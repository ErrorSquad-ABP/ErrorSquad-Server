const express = require("express");
const router = express.Router();
const turnoController = require("../controllers/turnoController");
const authenticate = require("../middlewares/authMiddleware");
const checkAdmin = require("../middlewares/checkAdminMiddleware");

// Rota para criar um turno
router.post("/", authenticate, checkAdmin, turnoController.requestNewTurno);

// Rota para listar turno
router.get("/", authenticate, checkAdmin, turnoController.listTurnos);

// Rota para alterar turno
router.put("/", authenticate, checkAdmin, turnoController.requestAlterTurno);

// Rota para alterar turno
router.delete("/", authenticate, checkAdmin, turnoController.requestDeleteTurno);


module.exports = router;
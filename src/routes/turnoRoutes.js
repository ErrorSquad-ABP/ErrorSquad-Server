const express = require("express");
const router = express.Router();
const turnoController = require("../controllers/turnoController");
const authenticate = require("../middlewares/authMiddleware");

// Rota para criar um turno
router.post("/", authenticate, turnoController.requestNewTurno);

// Rota para listar turnos
router.get("/", authenticate, turnoController.listTurnos);

// Rota para alterar turno
router.put("/", authenticate, turnoController.requestAlterTurno);

// Rota para deletar turno
router.delete("/", authenticate, turnoController.requestDeleteTurno);


module.exports = router;
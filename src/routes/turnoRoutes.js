const express = require("express");
const router = express.Router();
const turnoController = require("../controllers/turnoController");

// Rota para criar um turno
router.post("/", turnoController.requestNewTurno);

// Rota para listar turno
router.get("/", turnoController.listTurnos);

// Rota para alterar turno
router.put("/", turnoController.requestAlterTurno);

// Rota para alterar turno
router.delete("/", turnoController.requestDeleteTurno);


module.exports = router;
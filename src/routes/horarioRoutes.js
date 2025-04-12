const express = require("express");
const router = express.Router();
const horarioController = require("../controllers/horarioController");

router.post("/", horarioController.requestNewHorario);

// Rota para listar horario
router.get("/", horarioController.listHorarios);

// Rota para alterar horario
router.put("/", horarioController.requestAlterHorario);

// Rota para alterar horario
router.delete("/", horarioController.requestDeleteHorario)


module.exports = router;
const express = require("express");
const router = express.Router();
const horarioController = require("../controllers/horarioController");

// Rota para criar um horário
router.post("/", horarioController.createHorario);

// Rota para listar horários
router.get("/", horarioController.listHorarios);

// Rota para atualizar um horário
router.put("/:id", horarioController.updateHorario);

// Rota para deletar um horário
router.delete("/:id", horarioController.deleteHorario);

module.exports = router;
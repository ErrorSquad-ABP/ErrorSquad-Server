const express = require("express");
const router = express.Router();
const horarioController = require("../controllers/horarioController");
const authenticate = require("../middlewares/authMiddleware");

router.post("/", authenticate, horarioController.requestNewHorario);

// Rota para listar horario
router.get("/", authenticate, horarioController.listHorarios);

// Rota para alterar horarios
router.put("/", authenticate, horarioController.requestAlterHorario);

// Rota para deletar horario
router.delete("/", authenticate, horarioController.requestDeleteHorario)


module.exports = router;
const express = require("express");
const router = express.Router();
const horarioController = require("../controllers/horarioController");
const authenticate = require("../middlewares/authMiddleware");
const checkAdmin = require("../middlewares/checkAdminMiddleware");

router.post("/", authenticate, checkAdmin, horarioController.requestNewHorario);

// Rota para listar horario
router.get("/", authenticate, checkAdmin, horarioController.listHorarios);

// Rota para alterar horario
router.put("/", authenticate, checkAdmin, horarioController.requestAlterHorario);

// Rota para alterar horario
router.delete("/", authenticate, checkAdmin, horarioController.requestDeleteHorario)


module.exports = router;
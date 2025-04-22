const express = require("express");
const router = express.Router();
const semestreController = require("../controllers/semestreController");
const authenticate = require("../middlewares/authMiddleware");
const checkAdmin = require("../middlewares/checkAdminMiddleware");

// Rota para criar um semesrte
router.post("/", authenticate, checkAdmin, semestreController.requestNewSemestre);

// Rota para listar semesrte
router.get("/", authenticate, checkAdmin, semestreController.listSemestres);

// Rota para alterar semesrte
router.put("/", authenticate, checkAdmin, semestreController.requestAlterSemestre);

// Rota para alterar semesrte
router.delete("/", authenticate, checkAdmin, semestreController.requestDeleteSemestre);


module.exports = router;
const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authenticate = require("../middlewares/authMiddleware");

// Rota para listar cursos por id
router.get("/:a_id", authenticate, userController.listUserById);

// Rota para alterar nome do user
router.put("/alterName", authenticate, userController.requestAlterNameUser);

// Rota para alterar senha do user
router.put("/alterPassword", authenticate, userController.requestAlterPasswordUser);

module.exports = router;

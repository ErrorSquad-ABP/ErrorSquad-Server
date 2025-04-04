const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// Rota para listar usuários
router.get("/", userController.getAllUsers);

// Rota para criar um usuário
router.post("/", userController.createUser);

module.exports = router;

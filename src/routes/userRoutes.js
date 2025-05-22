const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authenticate = require("../middlewares/authMiddleware");

// Rota para criar um user
router.post("/", authenticate, userController.requestNewuser);

// Rota para listar users
router.get("/", authenticate, userController.listusers);

// Rota para alterar nome do user
router.put("/alterName", authenticate, userController.requestAlterNameuser);

// Rota para alterar senha do user
router.put("/alterPassowd", authenticate, userController.requestAlterPasswordUser);


// Rota para deletar user
router.delete("/", authenticate, userController.requestDeleteuser)


module.exports = router;

const express = require("express");
const router = express.Router();
const loginController = require("../controllers/loginController");

// Rota para criar um login
router.post("/", loginController.requestLogin);

module.exports = router;

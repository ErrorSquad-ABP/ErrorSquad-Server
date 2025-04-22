const express = require("express");
const router = express.Router();
const ambienteController = require("../controllers/ambienteController");
const authenticate = require("../middlewares/authMiddleware");
const checkAdmin = require("../middlewares/checkAdminMiddleware"); 

router.post("/", authenticate, checkAdmin, ambienteController.requestNewAmbiente);

router.get("/", authenticate, checkAdmin, ambienteController.listAmbientes);

router.put("/", authenticate, checkAdmin, ambienteController.requestAlterAmbiente);

router.delete("/", authenticate, checkAdmin, ambienteController.requestDeleteAmbiente);

module.exports = router;

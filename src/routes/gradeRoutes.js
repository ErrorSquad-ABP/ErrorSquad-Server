const express = require("express");
const router = express.Router();
const gradeController = require("../controllers/gradeController");
const authenticate = require("../middlewares/authMiddleware");
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Caminho da pasta 'uploads'
const uploadDir = path.join(__dirname, '../uploads');

// Verifica se a pasta 'uploads' existe e a cria caso não exista
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Configuração do multer para upload de arquivos
const upload = multer({ 
  dest: uploadDir // Define o diretório de upload
});

// Rota para criar uma grade completa
router.post("/import", authenticate, upload.single('file'), gradeController.requestNewGrade);

// Rota para listar as grades
router.get("/", authenticate, gradeController.listGrades);

// Rota para swapar os periodos
router.put("/", authenticate, gradeController.requestSwapPeriodos)

module.exports = router;

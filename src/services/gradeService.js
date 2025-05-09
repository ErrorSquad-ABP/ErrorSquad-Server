const gradeQuery = require ('../database/migrations/gradeQuery')

async function getAllInfosToGrade() {

  try {

    return await gradeQuery.searchAllInfos();
   
  } catch (error) {
    console.error('Erro ao buscar informações:', error);
    res.status(500).json({ erro: 'Erro interno ao buscar cursos' });
  }
}

module.exports = {
  getAllInfosToGrade
};
const gradeQuery = require ('../database/migrations/gradeQuery')
const hasNullValues = require('../utils/hasNullValues')

async function getAllInfosToGrade() {

  try {

    return await gradeQuery.searchAllInfos();
   
  } catch (error) {
    console.error('Erro ao buscar informações:', error);
    res.status(500).json({ erro: 'Erro interno ao buscar cursos' });
  }
}

async function swapPeriodosInGrade(card_1, card_2) {

  try {
  // Verificar card_1 e card_2
  if (hasNullValues(card_1)) {
      console.log('card_1 possui campos nulos.');
  }

  if (hasNullValues(card_2)) {
      console.log('card_2 possui campos nulos.');
  }
  console.log('card 1111',card_1)
   console.log('card 2222',card_2)

    return await gradeQuery.swapPeriodos(card_1.id, card_1.id_dia, card_1.id_horario, card_2.id, card_2.id_dia, card_2.id_horario);
   
  } catch (error) {
    console.error('Erro ao buscar informações:', error);
    res.status(500).json({ erro: 'Erro interno ao buscar cursos' });
  }
}


module.exports = {
  getAllInfosToGrade,
  swapPeriodosInGrade
};
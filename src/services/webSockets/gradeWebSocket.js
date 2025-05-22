const { getIO } = require("../../lib/socket");

async function swapPeriodos(card1, card2) {
  try {
    const io = getIO();
    if (!io) {
      console.warn('Socket.IO não disponível');
      return;
    }
console.log("[DEBUG] Emitindo grade_updated...");
    io.emit('grade_updated', {
      type: 'swap',

      card1: 
        { 
          id: card1.id,
          dia: card1.id_dia,
          horario: card1.id_horario

        },

        card2:
        {
          id: card2.id,
          dia: card2.id_dia,
          horario: card2.id_horario

        },
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Erro ao emitir WebSocket:', error);
    throw error; // Propaga o erro para ser tratado no controller
  }
}

module.exports = {
  swapPeriodos
};
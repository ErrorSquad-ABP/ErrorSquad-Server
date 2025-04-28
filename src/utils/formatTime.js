function formatTime(timeStr) {
  if (!timeStr) return null;
  
  try {
    // Se for apenas "HH:MM", adiciona segundos
    if (timeStr.split(':').length === 2) {
      return `${timeStr}:00`;
    }
    // Se já estiver no formato correto ou outro formato, tenta padronizar
    const timeParts = timeStr.split(':');
    if (timeParts.length >= 3) {
      // Pega apenas as partes HH:MM:SS se houver mais
      return `${timeParts[0].padStart(2, '0')}:${timeParts[1].padStart(2, '0')}:${timeParts[2].padStart(2, '0')}`;
    }
    return timeStr;
  } catch (e) {
    console.error(`Erro ao formatar horário: ${timeStr}`, e);
    return null;
  }
};

module.exports = {
  formatTime
};
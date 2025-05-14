    // Função para verificar campos nulos em um objeto
function hasNullValues(obj) {
    return Object.values(obj).some(value => value === null || value === undefined);
}

module.exports = hasNullValues;
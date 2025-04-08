function firstLetterUppercase(str) {
  if (!str) return ""; // Verifica se a string é vazia ou undefined
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

// Exemplo de uso
const exemplo = "SISTEMAS OPERACIONAIS";
console.log(firstLetterUppercase(exemplo)); 

module.exports = {
  firstLetterUppercase
};
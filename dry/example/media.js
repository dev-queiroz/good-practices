const numerosA = [5, 8, 9, 10, 11, 12, 13, 14, 15];
const mediaA = numerosA.reduce(
    (total, atual) => total + atual, 0
) / numerosA.length;

const numerosB = [2, 4, 6, 8, 10, 12, 14, 16, 18];
const mediaB = numerosB.reduce(
    (total, atual) => total + atual, 0
) / numerosB.length;

// Sempre evitar a repetição de código para melhor legibilidade!
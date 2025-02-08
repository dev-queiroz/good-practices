function calcularMedia(lista) {
    return lista.reduce(
        (total, atual) => total + atual, 0
    ) / lista.length;
}

const numerosA = [5, 8, 9, 10, 11, 12, 13, 14, 15];
const mediaA = calcularMedia(numerosA);

const numerosB = [2, 4, 6, 8, 10, 12, 14, 16, 18];
const mediaB = calcularMedia(numerosB);

// Este código se mantém simples e passa apenas a verificação de uma lista de números e a sua média.
// Evitando a repetição de código!
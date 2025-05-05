import sleep from "./sleep.js"; // Função de sleep já existente

// Mapeamento de cores ANSI
const colorMap = {
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  magenta: "\x1b[35m",
  cyan: "\x1b[36m",
  white: "\x1b[37m",
  gray: "\x1b[90m",
  default: "\x1b[0m", // Reseta para a cor padrão (branco)
};

// Mapeamento de velocidades
const speedMap = {
  uf: 5,   // Ultra fast
  sf: 10,  // Super fast
  f: 25,   // Fast
  m: 50,   // Medium (padrão)
  s: 100,  // Slow
  ss: 200, // Super slow
  us: 400, // Ultra slow
  random: null, // Será tratado como velocidade aleatória
};

// Função para obter uma velocidade aleatória
function getRandomSpeed() {
  return Math.floor(Math.random() * (400 - 5 + 1)) + 5; // Velocidade entre 5ms e 400ms
}

// Função para logar texto formatado
export async function log(text, color = "default", speed = "m") {
  // Define cor e velocidade padrão caso não sejam especificados
  const colorCode = colorMap[color] || colorMap.default;
  const delay = speed === "random" ? getRandomSpeed() : (speedMap[speed] || speedMap.m);

  process.stdout.write(colorCode); // Aplica a cor
  for (const char of text) {
    process.stdout.write(char); // Escreve cada caractere no terminal
    await sleep(delay); // Aguarda a velocidade especificada
  }
  process.stdout.write(`${colorMap.default}\n`); // Reseta a cor e adiciona uma nova linha
}
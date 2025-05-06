import sleep from "./sleep.js"; // Função de sleep já existente

// Mapeamento de cores ANSI
const colorMap = {
  black: "\x1b[30m",
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  magenta: "\x1b[35m",
  cyan: "\x1b[36m",
  white: "\x1b[37m",

  // Cores claras / brilhantes
  lightBlack: "\x1b[90m",    // Também pode ser considerado "gray"
  lightRed: "\x1b[91m",
  lightGreen: "\x1b[92m",
  lightYellow: "\x1b[93m",
  lightBlue: "\x1b[94m",
  lightMagenta: "\x1b[95m",
  lightCyan: "\x1b[96m",
  lightWhite: "\x1b[97m",

  default: "\x1b[0m", // Reseta para a cor padrão (normal)
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
  const colorCode = colorMap[color] || colorMap.default;
  const delay = speed === "random" ? getRandomSpeed() : (speedMap[speed] || speedMap.m);

  process.stdout.write(colorCode); // Aplica a cor
  for (const char of text) {
    process.stdout.write(char); // Escreve cada caractere no terminal
    await sleep(delay); // Aguarda a velocidade especificada
  }
  process.stdout.write(`${colorMap.default}\n`); // Reseta a cor e adiciona uma nova linha
}

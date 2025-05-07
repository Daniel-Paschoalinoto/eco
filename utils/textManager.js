import sleep from "./sleep.js"; // Função de sleep já existente
import { colors } from "./colors.js";

// Mapeamento de velocidades
const speedMap = {
  uf: 5,   // Ultra fast
  sf: 10,  // Super fast
  f: 25,   // Fast
  m: 50,   // Medium (padrão)
  s: 100,  // Slow
  ss: 200, // Super slow
  us: 400, // Ultra slow
  random: null,
};

// Função para obter uma velocidade aleatória
function getRandomSpeed() {
  return Math.floor(Math.random() * (400 - 5 + 1)) + 5;
}

// Função para logar texto formatado
export async function log(text, color = "default", speed = "m") {
  const colorData = colors[color] || colors.default;
  const colorCode = colorData.ansi;
  const delay = speed === "random" ? getRandomSpeed() : (speedMap[speed] || speedMap.m);

  process.stdout.write(colorCode);
  for (const char of text) {
    process.stdout.write(char);
    await sleep(delay);
  }
  process.stdout.write(`${colors.default.ansi}\n`);
}
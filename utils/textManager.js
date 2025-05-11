/**
 * ECO - Fragmento do Amanhã
 * Copyright (c) 2025 Daniel Paschoalinoto
 *
 * Este trabalho está licenciado sob a Licença Creative Commons Atribuição-NãoComercial-SemDerivações 4.0 Internacional.
 * Para visualizar uma cópia desta licença, visite http://creativecommons.org/licenses/by-nc-nd/4.0/.
 */

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

// Função para obter uma velocidade aleatória simulando um humano de TI realista
function getRandomSpeed() {
  // Entre 50ms e 90ms por caractere: rápido, mas ainda humano
  return Math.floor(Math.random() * (90 - 50 + 1)) + 50;
}

// Funções de verificação de caracteres
function isSpecialCharacter(char) {
  const specialChars = ['á','à','ã','â','é','ê','í','ó','ô','õ','ú','ç',
                         'Á','À','Ã','Ê','Í','Ó','Ô','Õ','Ú'];
  return specialChars.includes(char);
}
function isUpperCase(char) {
  return char === char.toUpperCase() && char !== char.toLowerCase();
}
function isPunctuation(char) {
  const punctuationChars = ['.',',','!','?',';',':','-','(',')','"','\''];
  return punctuationChars.includes(char);
}

export async function log(texts, colorNames = "default", speeds = "random") {
  const textArray = Array.isArray(texts) ? texts : [texts];
  const colorArray = Array.isArray(colorNames) ? colorNames : [colorNames];
  const speedArray = Array.isArray(speeds) ? speeds : [speeds];

  // Ajusta comprimentos de arrays de cores e velocidades
  while (colorArray.length < textArray.length) {
    colorArray.push(colorArray[colorArray.length - 1]);
  }
  while (speedArray.length < textArray.length) {
    speedArray.push(speedArray[speedArray.length - 1]);
  }

  for (let i = 0; i < textArray.length; i++) {
    const text = textArray[i];
    const colorName = colorArray[i];
    const speed = speedArray[i];

    const colorData = colors[colorName] || colors.default;
    const colorCode = colorData.ansi;
    const baseDelay = speed === "random"
      ? getRandomSpeed()
      : (speedMap[speed] || speedMap.m);

    process.stdout.write(colorCode);

    for (const char of text) {
      const variation = Math.floor(Math.random() * 15) - 7;
      const charDelay = Math.max(0, baseDelay + variation);

      process.stdout.write(char);
      await sleep(charDelay);

      if (char === ' ') await sleep(baseDelay * 1.2);
      if (isSpecialCharacter(char)) await sleep(baseDelay * 2.2);
      if (isUpperCase(char)) await sleep(baseDelay * 1.8);
      if (isPunctuation(char)) await sleep(baseDelay * 1.3);
    }

    // Se for array e for última iteração, acrescenta quebra de linha
    if (Array.isArray(texts) && i === textArray.length - 1) {
      process.stdout.write("\n");
    }
    // Se não for array, comportamento padrão
    else if (!Array.isArray(texts)) {
      process.stdout.write("\n");
    }
  }

  // Restaura cor padrão
  process.stdout.write("\x1b[0m");
}

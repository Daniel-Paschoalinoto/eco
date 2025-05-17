/**
 * ECO - Fragmento do Amanhã
 * Copyright (c) 2025 Daniel Paschoalinoto
 *
 * Este trabalho está licenciado sob a Licença Creative Commons Atribuição-NãoComercial-SemDerivações 4.0 Internacional.
 * Para visualizar uma cópia desta licença, visite http://creativecommons.org/licenses/by-nc-nd/4.0/.
 */

import sleep from "./sleep.js"; // Função de sleep já existente
import { colors } from "./colors.js";
import { getScreenResolution } from "./windowManager.js";

// Mapeamento de faixas de velocidade por tipo
const speedRanges = {
  uf: [5, 20], // Ultra fast
  sf: [20, 30], // Super fast
  f: [30, 50], // Fast
  m: [45, 95], // Medium (padrão)
  s: [90, 150], // Slow
  ss: [150, 250], // Super Slow
  ms: [250, 350], // Mega Slow
  us: [350, 500], // Ultra Slow
  r: [5, 500], // Random
};

// Sorteia um delay dentro do intervalo fornecido
function getSpeedFromRange([min, max]) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export async function screenWidthforText() {
  let { width } = await getScreenResolution();
  let times = Math.floor(width * 0.0605);
  return times;
}

// Funções de verificação de caracteres
function isSpecialCharacter(char) {
  const specialChars = ["á", "à", "ã", "â", "é", "ê", "í", "ó", "ô", "õ", "ú", "ç", "Á", "À", "Ã", "Ê", "Í", "Ó", "Ô", "Õ", "Ú"];
  return specialChars.includes(char);
}

function isUpperCase(char) {
  return char === char.toUpperCase() && char !== char.toLowerCase();
}

function isPunctuation(char) {
  const punctuationChars = [".", ",", "!", "?", ";", ":", "-", "(", ")", '"', "'"];
  return punctuationChars.includes(char);
}

export async function log(texts, speeds = "m", colorNames = "") {
  const textArray = Array.isArray(texts) ? texts : [texts];
  const colorArray = Array.isArray(colorNames) ? colorNames : [colorNames];
  const speedArray = Array.isArray(speeds) ? speeds : [speeds];

  // Ajusta comprimentos dos arrays
  while (colorArray.length < textArray.length) {
    colorArray.push(colorArray[colorArray.length - 1]);
  }
  while (speedArray.length < textArray.length) {
    speedArray.push(speedArray[speedArray.length - 1]);
  }

  for (let i = 0; i < textArray.length; i++) {
    const text = textArray[i];
    const colorName = colorArray[i];
    const speedKey = speedArray[i];

    const colorData = colors[colorName] || colors.d;
    const colorCode = colorData.ansi;
    const range = speedRanges[speedKey] || speedRanges.m;

    process.stdout.write(colorCode);

    for (const char of text) {
      const baseDelay = getSpeedFromRange(range);

      process.stdout.write(char);
      await sleep(baseDelay);

      if (char === " ") await sleep(baseDelay * 1.2);
      if (isSpecialCharacter(char)) await sleep(baseDelay * 2.2);
      if (isUpperCase(char)) await sleep(baseDelay * 1.8);
      if (isPunctuation(char)) await sleep(baseDelay * 1.3);
    }

    if (Array.isArray(texts)) {
      const nextText = textArray[i + 1];
      const nextIsPunctuationOnly = typeof nextText === "string" && /^[.,!?;:\-()"']+$/.test(nextText.trim());

      if (i < textArray.length - 1) {
        if (!nextIsPunctuationOnly) {
          process.stdout.write(" ");
        }
      } else {
        process.stdout.write("\n");
      }
    } else {
      process.stdout.write("\n");
    }
  }

  // Restaura cor padrão
  process.stdout.write("\x1b[0m");
}

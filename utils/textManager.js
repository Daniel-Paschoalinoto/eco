//utils/textManager.js
import sleep from "./sleep.js"; // Função de sleep já existente
import { colors } from "./colors.js";


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
  instant: [0, 0], // Instantâneo (sem delay)
};

// Sorteia um delay dentro do intervalo fornecido
function getSpeedFromRange([min, max]) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export async function screenWidthforText() {
  return process.stdout.columns;
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
  const punctuationChars = [".", ",", "!", "?", ";", ":", "-", "(", ")", "\"", "'"];
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
    const currentItem = textArray[i];

    // Handle pause token
    if (typeof currentItem === 'string' && currentItem.startsWith('<SLEEP:') && currentItem.endsWith('>')) {
      const delayStr = currentItem.substring(7, currentItem.length - 1);
      const delay = parseInt(delayStr, 10);
      if (!isNaN(delay) && delay >= 0) {
        await sleep(delay);
      }
      continue; // Skip to next item
    }

    // Existing logic for text processing
    const text = currentItem;
    const colorName = colorArray[i];
    const speedKey = speedArray[i];

    const colorData = colors[colorName] || colors.d;
    const colorCode = colorData.ansi;
    const range = speedRanges[speedKey] || speedRanges.m;

    process.stdout.write(colorCode);

    if (speedKey === "instant") {
      process.stdout.write(text);
    } else {
      for (const char of text) {
        const baseDelay = getSpeedFromRange(range);

        process.stdout.write(char);
        await sleep(baseDelay);

        if (char === " ") await sleep(baseDelay * 1.2);
        if (isSpecialCharacter(char)) await sleep(baseDelay * 2.2);
        if (isUpperCase(char)) await sleep(baseDelay * 1.8);
        if (isPunctuation(char)) await sleep(baseDelay * 1.3);
      }
    }

    // Logic for adding space/newline, considering pause tokens
    // Find the next actual text item
    let nextActualTextIndex = -1;
    for (let j = i + 1; j < textArray.length; j++) {
      if (typeof textArray[j] === 'string' && !textArray[j].startsWith('<PAUSE:')) {
        nextActualTextIndex = j;
        break;
      }
    }

    if (nextActualTextIndex !== -1) {
      const nextActualText = textArray[nextActualTextIndex];
      const nextIsPunctuationOnly = typeof nextActualText === "string" && /^[.,!?;:()\"'-]+$/.test(nextActualText.trim());
      if (!nextIsPunctuationOnly) {
        process.stdout.write(" ");
      }
    } else {
      // This is the last actual text item in the array (after skipping any trailing pauses)
      process.stdout.write("\n");
    }
  }

  // Restaura cor padrão
  process.stdout.write("\x1b[0m");
}
import sleep from "./sleep.js";

const SPEEDS = {
  // ─── ULTRAFAST ───
  ef: 10,
  f: 30,

  // ─── MÉDIA ───
  m: 50,

  // ─── LENTO ───
  s: 90,
  ss: 130,
  es: 200,

  // ─── ULTRA LENTO ───
  us: 300
};

// Mapeamento de cores ANSI, removendo "black" e usando apenas tons de cinza claro (brightBlack)
const COLORS = {
  // tons de cinza claro em vez de preto
  brightBlack: "\x1b[90m", // cinza claro padrão
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  magenta: "\x1b[35m",
  cyan: "\x1b[36m",
  white: "\x1b[37m",
  // cores brilhantes
  brightRed: "\x1b[91m",
  brightGreen: "\x1b[92m",
  brightYellow: "\x1b[93m",
  brightBlue: "\x1b[94m",
  brightMagenta: "\x1b[95m",
  brightCyan: "\x1b[96m",
  brightWhite: "\x1b[97m",
  reset: "\x1b[0m"
};

// Listas de chaves úteis
const COLOR_KEYS = Object.keys(COLORS).filter(key => key !== "reset");
const SPEED_KEYS = Object.keys(SPEEDS);

/**
 * Retorna uma cor ANSI aleatória.
 */
function randomColor() {
  const key = COLOR_KEYS[Math.floor(Math.random() * COLOR_KEYS.length)];
  return COLORS[key];
}

/**
 * Retorna uma chave de velocidade aleatória.
 */
function randomSpeedKey() {
  const key = SPEED_KEYS[Math.floor(Math.random() * SPEED_KEYS.length)];
  return key;
}

/**
 * Imprime trechos de texto no terminal, cada um com sua velocidade e cor.
 * Suporta "random" como speed para velocidade aleatória por segmento,
 * e como color para cor aleatória por caractere.
 *
 * Uso:
 *   await log(text1, speed1, color1, text2, speed2, color2, ...)
 *
 * Você pode omitir colorN para usar branco padrão, ou usar qualquer chave de COLORS.
 */
async function log(...args) {
  if (args.length === 0) return;

  const segments = [];
  let i = 0;
  while (i < args.length) {
    const texto = String(args[i++] || "");

    // Verifica se há um argumento de velocidade e cor passados
    let speedKey = "m"; // velocidade padrão 50ms
    if (typeof args[i] === "string" && (SPEEDS[args[i]] !== undefined || args[i] === "random")) {
      speedKey = args[i++];
    }

    let colorKey = "white"; // cor padrão é branca
    if (typeof args[i] === "string" && (COLORS[args[i]] !== undefined || args[i] === "random")) {
      colorKey = args[i++];
    }

    segments.push({ texto, speedKey, colorKey });
  }

  // Renderiza cada segmento
  for (const { texto, speedKey, colorKey } of segments) {
    // determina espera (ms)
    const actualSpeedKey = speedKey === "random" ? randomSpeedKey() : speedKey;
    const espera = SPEEDS[actualSpeedKey] ?? SPEEDS.m;

    for (const char of texto) {
      const code = colorKey === "random" ? randomColor() : (COLORS[colorKey] || COLORS.white);
      Deno.stdout.writeSync(new TextEncoder().encode(code + char + COLORS.reset));
      await sleep(espera);
    }
  }

  // quebra de linha final
  Deno.stdout.writeSync(new TextEncoder().encode("\n"));
}


export default log;

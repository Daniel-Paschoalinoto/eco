//utils/gameManager.js
import { carregar } from "./saveManager.js";
import { playSound } from "./soundManager.js";
import { log } from "./textManager.js";
import sleep from "./sleep.js";
import { user } from "./nameGetter.js";

export async function startGame(mapaFuncoes) {
  const pontoAtual = carregar() || "avisos";

  playSound("Dark_Shadows.mp3", true, 20);
  process.stdout.write("\x1Bc");

  if (pontoAtual !== "avisos") {
    await log(`[CONTINUANDO::SESSÃO::DE::${user.toUpperCase()}]`, "instant");
    await sleep(2000);
    process.stdout.write("\x1Bc");
  }

  const proximaFuncao = mapaFuncoes[pontoAtual] || mapaFuncoes.avisos;
  if (proximaFuncao) {
    await proximaFuncao();
  } else {
    console.error(`Erro: Ponto de controle '${pontoAtual}' não encontrado no mapa de funções.`);
    await log("Ocorreu um erro ao carregar o jogo. Reiniciando do início.");
    await mapaFuncoes.avisos();
  }
}


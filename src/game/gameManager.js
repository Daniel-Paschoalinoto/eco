//src/game/gameManager.js
import { carregar } from "./saveManager.js";
import { playSound } from "../utils/soundManager.js";
import { log } from "../utils/textManager.js";
import sleep from "../utils/sleep.js";
import { user } from "../utils/nameGetter.js";
import { setBackgroundMusicProcess } from "./musicState.js";

export async function startGame(mapaFuncoes) {
  const pontoAtual = await carregar() || "avisos";

  process.stdout.write("\x1Bc");

  if (pontoAtual !== "avisos") {
    const music = playSound("Dark_Shadows.mp3", true, 20);
    setBackgroundMusicProcess(music);
  }

  if (pontoAtual !== "intro" && pontoAtual !== "avisos") {
    await log(`[CONTINUANDO::SESSÃO::DE::${user.toUpperCase()}]`, "instant","cyan");
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

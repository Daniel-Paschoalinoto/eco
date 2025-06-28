import { carregar } from "./saveManager.js";
import { playSound } from "./soundManager.js";
import { log } from "./textManager.js";
import sleep from "./sleep.js";

/**
 * Inicializa e gerencia o fluxo principal do jogo.
 * @param {object} mapaFuncoes - Um objeto onde as chaves são os nomes dos checkpoints 
 * e os valores são as funções de cena correspondentes.
 */
export async function startGame(mapaFuncoes) {
  const pontoAtual = carregar() || "intro";

  // Rotina de inicialização padrão
  playSound("Dark_Shadows.mp3", true, 20);
  process.stdout.write("\x1Bc"); // Limpa a tela

  // Se estiver carregando um save, exibe uma mensagem de contexto
  if (pontoAtual !== "intro") {
    await log(`[CONTINUANDO::SESSÃO]`, "f");
    await sleep(2000);
    process.stdout.write("\x1Bc"); // Limpa a tela novamente após a mensagem
  }

  // Encontra e executa a função de cena correta
  const proximaFuncao = mapaFuncoes[pontoAtual] || mapaFuncoes.intro;
  if (proximaFuncao) {
    await proximaFuncao();
  } else {
    console.error(`Erro: Ponto de controle '${pontoAtual}' não encontrado no mapa de funções.`);
    await log("Ocorreu um erro ao carregar o jogo. Reiniciando do início.");
    await mapaFuncoes.intro();
  }
}

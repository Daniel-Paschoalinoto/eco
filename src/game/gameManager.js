// SPDX-License-Identifier: CC-BY-NC-ND-4.0
//
// ECO - Fragmento do Amanhã
// Autor: Daniel Paschoalinoto
// Licenciado sob a Creative Commons Atribuição-NãoComercial-SemDerivações 4.0 Internacional
// https://creativecommons.org/licenses/by-nc-nd/4.0/legalcode.pt
//
// Você pode compartilhar este arquivo, desde que:
// - Não o utilize para fins comerciais;
// - Não o modifique nem crie obras derivadas;
// - Atribua o crédito corretamente ao autor original.

import { carregar } from "./saveManager.js";
import { playSound } from "../utils/soundManager.js";
import { log } from "../utils/textManager.js";
import sleep from "../utils/sleep.js";
import { user } from "../utils/nameGetter.js";
import { setBackgroundMusicProcess } from "./musicState.js";
import { clearScreen } from "../utils/windowManager.js";

// Import all chapter functions
import { avisos } from "../chapters/avisos.js";
import { loading } from "../chapters/loading.js";
import { intro } from "../chapters/intro.js";
import { naoAceitouAtividade1 } from "../chapters/naoAceitouAtividade1.js";
import { atividade1 } from "../chapters/atividade1.js";
import { contextoImplantes } from "../chapters/contextoImplantes.js";
import { naoAceitouAtividade2 } from "../chapters/naoAceitouAtividade2.js";
import { atividade2 } from "../chapters/atividade2.js";
import { contextoAscensao } from "../chapters/contextoAscensao.js";
import { naoAceitouAtividade3 } from "../chapters/naoAceitouAtividade3.js";
import { atividade3 } from "../chapters/atividade3.js";
import { contextoBeneficios } from "../chapters/contextoBeneficios.js";
import { contextoResistencia } from "../chapters/contextoResistencia.js";
import { naoAceitouAtividade4 } from "../chapters/naoAceitouAtividade4.js";
import { atividade4 } from "../chapters/atividade4.js";
import { contextoVazioPerfeito } from "../chapters/contextoVazioPerfeito.js";
import { contextoUltimaEsperanca } from "../chapters/contextoUltimaEsperanca.js";
import { final } from "../chapters/final.js";

// Create the map of functions
const mapaFuncoes = {
  avisos,
  loading,
  intro,
  naoAceitouAtividade1,
  atividade1,
  contextoImplantes,
  naoAceitouAtividade2,
  atividade2,
  contextoAscensao,
  naoAceitouAtividade3,
  atividade3,
  contextoBeneficios,
  contextoResistencia,
  naoAceitouAtividade4,
  atividade4,
  contextoVazioPerfeito,
  contextoUltimaEsperanca,
  final,
};

export async function startGame() {
  let pontoAtual = await carregar() || "avisos";

  clearScreen();

  if (pontoAtual !== "avisos") {
    const music = playSound("Dark_Shadows.mp3", true, 20);
    setBackgroundMusicProcess(music);
  }

  if (pontoAtual !== "intro" && pontoAtual !== "avisos") {
    await log(`[CONTINUANDO::SESSÃO::DE::${user.toUpperCase()}]`, "instant", "cyan");
    await sleep(2000);
    clearScreen();
  }

  while (pontoAtual) {
    const proximaFuncao = mapaFuncoes[pontoAtual];
    if (proximaFuncao) {
      pontoAtual = await proximaFuncao();
    } else {
      // console.error(`Erro: Ponto de controle '${pontoAtual}' não encontrado no mapa de funções.`);
      await log("Ocorreu um erro ao carregar o jogo. Reiniciando do início.");
      pontoAtual = await mapaFuncoes.avisos();
    }
  }
}
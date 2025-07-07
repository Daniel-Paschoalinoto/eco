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

import sleep from "../utils/sleep.js";
import { log } from "../utils/textManager.js";
import { askLog, confirmacao } from "../utils/inputManager.js";
import { guardar } from "../game/saveManager.js";
import { minimizeWindow, maximizeWindow, clearScreen } from "../utils/windowManager.js";
import { playSound } from "../utils/soundManager.js";
import { setBackgroundMusicProcess } from "../game/musicState.js";
import { runCommand } from '../utils/runCommand.js';
import { respostasAceitas } from "../utils/constants.js";

async function pedirFeeback() {
  clearScreen();
  const resposta = await askLog("Posso abrir o formulário de avaliação em seu navegador?", "instant");
  if (respostasAceitas.includes(resposta.toLowerCase())) {
    clearScreen();
    await log("Obrigado! Abrindo pesquisa...Aguarde um momento.", "instant", "green");
    await sleep(2000);
    await minimizeWindow()
    await runCommand("cmd", ["/c", "start", "https://docs.google.com/forms/d/1EqzaO7YNXgI-Kmd_GynpIOuzKyW6p6jFiOMjPuLC3gk"]);
    await maximizeWindow();
    await log("Avalie quando puder.");
    await sleep(2000);
    clearScreen();
  } else {
    await log(`Tudo bem. Continuando.`, "instant", "cyan");
    await sleep(2000);
    clearScreen();
  }
}

export async function avisos() {
  await log(["ECO - Fragmento do Amanhã", "salva seu progresso automaticamente."], ["instant", "instant"], ["blue", "d"])
  await sleep(5000);
  clearScreen();
  await pedirFeeback()
  await log("Antes de começar, alguns avisos importantes:", "instant", "cyan");
  await log("");
  await log("→ Ajuste o tamanho do texto com [Ctrl + Scroll do Mouse].", "instant");
  await log("→ Use fones de ouvido para melhor imersão.", "instant");
  await log("");
  await log("ATENÇÃO:", "instant", "yellow");
  await log("→ Ctrl+C e Ctrl+V não são recomendados.", "instant", "yellow");
  await log("→ Para copiar, selecione o texto e clique com o botão direito do mouse.", "instant", "yellow");
  await log("→ Para colar, clique com o direito do mouse no local desejado após copiar.", "instant", "yellow");
  await log("→ Para sair, feche a janela do terminal.", "instant", "yellow");
  await log("→ Caso use Ctrl+C, a música será interrompida e será necessário reiniciar o jogo.", "instant", "yellow");
  await log("");
  await log("Esta mensagem será exibida apenas uma vez.", "instant", "cyan");
  await sleep(30000);
  await log("[PROTOCOLO::ECO::INICIANDO::EM::15::SEGUNDOS]", "instant", "cyan");
  await sleep(15000);
  await guardar("loading")
  clearScreen();
  const music = playSound("Dark_Shadows.mp3", true, 20);
  setBackgroundMusicProcess(music);
  return "loading"
}

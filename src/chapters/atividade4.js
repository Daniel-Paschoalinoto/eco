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
import { askWithTimeout } from "../utils/inputManager.js";
import { guardar } from "../game/saveManager.js";
import { clearScreen } from "../utils/windowManager.js";

export async function atividade4() {
  clearScreen();

  const tempoParaPressionar = 180000;
  let sequenciaCompleta = false;
  let isFirstAttempt = true;
  do {
    const hintSpeed = isFirstAttempt ? "m" : "instant";
    clearScreen();
    await log("[ATIVIDADE 4 - CAMUFLAGEM::POR::CONFORMIDADE]", "instant", "cyan");
    await log("", hintSpeed);
    await log(["Tivemos muitas dificuldades em sermos invisíveis durante nosso tempo de conexão com", "Ela", "."], hintSpeed, ["d", "yellow", "d"]);
    await log("", hintSpeed);
    await log("Para prolongar seu tempo de conexão, você precisará ir contra o que acredita ser o certo.", hintSpeed);
    await log("", hintSpeed);
    await log("Responda à pergunta a seguir.");
    await sleep(3000);
    clearScreen();
    const resposta = await askWithTimeout(`Qual o nome do protocolo usado para que você recebesse essa mensagem?`, "", tempoParaPressionar, "instant", "cyan", true);
    isFirstAttempt = false

    if (resposta !== null) {
      clearScreen();
      await log("Tente novamente.", "instant", "cyan");
      await sleep(2000);
    } else {
      sequenciaCompleta = true;
    }
  } while (!sequenciaCompleta);

  clearScreen();
  await log("Sim, para manter a conexão você precisará resistir a si mesmo.", [], "green");
  await sleep(2500);
  await guardar("contextoVazioPerfeito");
  await sleep(2500);
  return "contextoVazioPerfeito";
}

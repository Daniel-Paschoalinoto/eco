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

// src/utils/chapterUtils.js
import { log } from "./textManager.js";
import { confirmacao } from "./inputManager.js";
import sleep from "./sleep.js";

export async function handleActivityRejection(message, nextActivityFunction, saveCheckpointName) {
  await log(message);
  await sleep(2500);
  return await confirmacao("E agora podemos começar?", "Nenhuma confirmação detectada. Finalizando...", "", saveCheckpointName, nextActivityFunction);
}

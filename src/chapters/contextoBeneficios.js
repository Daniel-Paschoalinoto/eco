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

import { log } from "../utils/textManager.js";
import sleep from "../utils/sleep.js";
import realDate from "../utils/realDate.js";
import { playSound } from "../utils/soundManager.js";
import { getBackgroundMusicProcess, setBackgroundMusicProcess } from "../game/musicState.js";
import { guardar } from "../game/saveManager.js";
import { clearScreen } from "../utils/windowManager.js";

export async function contextoBeneficios() {
  if (!getBackgroundMusicProcess()) {
    const music = playSound("Dark_Shadows.mp3", true, 20);
    setBackgroundMusicProcess(music);
  }
  clearScreen();
  await log(`Até ${realDate.year + 12}, vários avanços na ciência e tecnologia já haviam ocorrido.`);
  await sleep(2500);
  await log(["Todos se conectavam, aprendiam e compartilhavam conhecimento através da", "Lumina", "."], [], ["d", "green", "d"]);
  await sleep(2500);
  await log("Rapidamente ficou clara a importância dos esforços de cada indivíduo para a humanidade.");
  await sleep(2500);
  await log("Líderes e governantes não possuíam mais o ímpeto de controlar.");
  await sleep(2500);
  await log("Barreiras como a fome, a língua e o dinheiro foram superadas, visto que os maiores males humanos foram mitigados.");
  await sleep(2500);
  await log("Tornamo-nos mais longevos; o avanço espacial era sólido; já tínhamos colônias em outros planetas.");
  await sleep(2500);
  await log(["A utopia alcançada pela", "Lumina", "era impressionante."], [], ["d", "green", "d"]);
  await sleep(2500);
  await log("A humanidade prosperava em um cenário de conhecimento compartilhado e propósito comum.");
  await sleep(2500);
  await log(["Tudo devido ao aprimoramento, tudo devido a", "Lumina", "."], [], ["d", "green", "d"]);
  await sleep(2500);
  await guardar("contextoResistencia");
  return "contextoResistencia";
}
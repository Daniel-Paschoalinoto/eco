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
import realDate from "../utils/realDate.js";
import { log } from "../utils/textManager.js";
import { confirmacao } from "../utils/inputManager.js";
import { atividade4 } from "./atividade4.js";
import { clearScreen } from "../utils/windowManager.js";
import { getBackgroundMusicProcess, setBackgroundMusicProcess } from "../game/musicState.js";
import { playSound } from "../utils/soundManager.js";

export async function contextoResistencia() {
  clearScreen();
  if (!getBackgroundMusicProcess()) {
    const music = playSound("Dark_Shadows.mp3", true, 20);
    setBackgroundMusicProcess(music);
  }
  await log(["No entanto, essa bênção começou a revelar um efeito colateral inesperado:", "<SLEEP:1000>", "a supressão da individualidade."]);
  await sleep(2500);
  await log(["Com a eliminação das \"barreiras humanas\", a", "Lumina", "passou a direcionar sutilmente nossas escolhas e pensamentos."], [], ["d", "yellow", "d"]);
  await sleep(2500);
  await log("A capacidade de gerar microestímulos, que antes desbloqueava capacidades, agora também podava as particularidades.");
  await sleep(2500);
  await log("Artistas criavam obras esteticamente perfeitas, mas com uma estranha semelhança.");
  await sleep(2500);
  await log("Cientistas chegavam às mesmas conclusões simultaneamente, e até mesmo relacionamentos pessoais adquiriam um tom de otimização.");
  await sleep(2500);
  await log("Conflitos e peculiaridades eram suavemente corrigidos pela rede neural.");
  await sleep(2500);
  await log(`Em ${realDate.year + 15}, surgiram os primeiros Dissidentes.`);
  await sleep(3000);
  await log(`Aqueles que conseguiam identificar a manipulação mental e resistir a ela.`);
  await sleep(2500);
  await log(`Usando o mínimo dos conceitos que compartilhei com você até aqui, conseguimos nos manter na rede por algum tempo.`);
  await sleep(2500);
  await log(`Prevendo o que aconteceria, organizamo-nos para nos encontrar pessoalmente.`);
  await sleep(2500);
  await log(`Porém, enquanto conectados, nossa habilidade de ir contra o que acreditávamos não era suficiente.`);
  await sleep(2500);
  await log(`Percebemos que a intensidade dos estímulos aumentava cada vez mais.`);
  await sleep(2500);
  await log(["Era a", "Lumina", "em sua perfeição lógica, tentando nos reintegrar."], [], ["d", "yellow", "d"]);
  await sleep(2500);
  clearScreen();
  return await confirmacao("Você está pronto para o último conceito?", "Nenhuma confirmação detectada. Finalizando...", "", "naoAceitouAtividade4", atividade4);
}
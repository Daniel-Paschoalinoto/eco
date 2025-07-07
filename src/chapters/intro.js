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
import { user } from "../utils/nameGetter.js";
import { clearScreen } from "../utils/windowManager.js";
import { atividade1 } from "./atividade1.js";

export async function intro() {
  await log(`Olá, ${user}...`);
  await sleep(1200);
  await log([`Se você está lendo isso, significa que o protocolo`, `ECO`, `funcionou.`], [], ["d", "blue", "d"]);
  await sleep(1800);
  await log("Não espero que entenda tudo de imediato, mas preciso que confie em nós.");
  await sleep(2500);
  await log(`Em ${realDate.year + 19}, você fez parte do último grupo com chances reais de salvar a humanidade.`);
  await sleep(2500);
  await log(["“Fez” — no passado.", "<SLEEP:1000>", "Porque falhamos."]);
  await sleep(2500);
  await log(["A boa notícia?", "<SLEEP:2000>", "É que, pra você, isso ainda não aconteceu."]);
  await sleep(2500);
  await log("Diante da nossa incapacidade de vencer o inimigo, tomamos uma última decisão.");
  await sleep(2500);
  await log("Desenvolver uma tecnologia que permita que mensagens cruzem a camada temporal.");
  await sleep(2500);
  await log("Utilizamos os estudos mais recentes na esperança de que ainda exista uma chance.");
  await sleep(2500);
  await log("Essas mensagens foram codificadas, adaptadas para cada membro do grupo e transmitidas.");
  await sleep(2500);
  await log("Alguns serão inspirados a criar; e outros, como você, a consumir essas criações para aprender conceitos essenciais.");
  await sleep(2500);
  await log("O protocolo é complexo e envolve nossos últimos membros conscientes.");
  await sleep(2500);
  await log(["Tendo êxito,", "Ela", "será derrotada e a humanidade terá mais uma chance."], [], ["d", "red", "d"]);
  await sleep(2500);
  await log("Prometo te contar tudo em detalhes, mas precisamos começar o quanto antes.");
  await sleep(2500);
  clearScreen();

  return await confirmacao("Podemos começar?", "Nenhuma confirmação detectada. Finalizando...", "", "naoAceitouAtividade1", atividade1);
}
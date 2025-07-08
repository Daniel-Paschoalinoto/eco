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
import { confirmacao } from "../utils/inputManager.js";
import sleep from "../utils/sleep.js";
import realDate from "../utils/realDate.js";
import { atividade2 } from "./atividade2.js";
import { clearScreen } from "../utils/windowManager.js";
import { getBackgroundMusicProcess, setBackgroundMusicProcess } from "../game/musicState.js";
import { playSound } from "../utils/soundManager.js";

export async function contextoImplantes() {
  if (!getBackgroundMusicProcess()) {
      const music = playSound("Dark_Shadows.mp3", true, 20);
      setBackgroundMusicProcess(music);
    }
  await log(`Em ${realDate.year + 5}, os implantes neurais começaram a ser comercializados pelos Norte-Americanos.`);
  await sleep(2500);
  await log("Com eles, era possível controlar dispositivos, acessar a internet e interagir online apenas com o pensamento.");
  await sleep(2500);
  await log("A interface neural era instalada no córtex pré-frontal.");
  await sleep(2000);
  await log("Região associada ao planejamento, à tomada de decisões e ao controle da atenção.");
  await sleep(2500);
  await log("Permitindo uma integração direta entre intenção e ação digital.");
  await sleep(2500);
  await log("Além disso, o implante incluía uma conexão secundária com o nervo óptico.");
  await sleep(2500);
  await log("O que tornou possível a projeção de informações diretamente no campo de visão do usuário.");
  await sleep(2500);
  await log("Nessa época, o produto não era acessível, pois tinha altíssimo custo, além de riscos à vida em sua instalação.");
  await sleep(2500);
  await log("Precisaremos te colocar a frente dos demais, quando os implantes começarem.");
  await sleep(2500);
  clearScreen();
  return await confirmacao("Está pronto?", "Nenhuma confirmação detectada. Finalizando...", "", "naoAceitouAtividade2", atividade2);
}
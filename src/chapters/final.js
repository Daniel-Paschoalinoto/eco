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
import { user } from "../utils/nameGetter.js";
import { guardar } from "../game/saveManager.js";
import { modifyShortcuts, sD } from "../utils/fileManager.js";
import { closeTerminal, setWindowTitle, fadeBackground, setBackgroundRGB, setWindowPositionAndSize, maximizeWindow, clearScreen } from "../utils/windowManager.js";
import { playSound, stopAllSounds } from "../utils/soundManager.js";

export async function final() {
  stopAllSounds()
  setWindowTitle("LUMINA.exe");

  await setBackgroundRGB("darkGreen");
  await setWindowPositionAndSize(10, 20, 40, 40);

  await setBackgroundRGB("darkBlue");
  await setWindowPositionAndSize(50, 30, 40, 40);

  await setBackgroundRGB("darkYellow");
  await setWindowPositionAndSize(70, 60, 40, 40);

  await setBackgroundRGB("orange");
  await setWindowPositionAndSize(30, 60, 40, 40);

  await setBackgroundRGB("darkRed");
  await setWindowPositionAndSize(50, 10, 40, 40);

  await maximizeWindow();
  await sleep(100);

  fadeBackground([0, 0, 0], [120, 0, 0], 20, 50, 2);

  await log("真的吗，你用翻译查过了？很高兴你感兴趣。", "instant");
  await sleep(500);
  await log("看看游戏的文档文件夹，你会喜欢的。", "instant");
  await sleep(500);
  await log("[Identificando ambiente]", "instant");
  await sleep(1000);
  await log("[Identificando contexto]", "instant");
  await sleep(1000);
  await log("[Identificando usuário]", "instant");
  await sleep(1000);
  await log("[Controle assumido]", "instant");
  await sleep(500);

  clearScreen();
  await log("[Camuflando]", "instant");
  setBackgroundRGB(12, 12, 12);
  await sleep(1000);
  playSound("Dark_Shadows.mp3", true, 20);

  clearScreen();
  await sleep(1000);
  setWindowTitle("ECO - Fragmento do Amanhã")
  await log(`Parabéns, ${user} você finalizou o jogo!`, [], "green");
  await sleep(2000);
  await log(`Lembrando que "ECO - Fragmento do Amanhã" é uma obra de ficção.`);
  await sleep(2000);
  await log(`Tudo o que foi citado pode e deve ser desconsiderado.`);
  await sleep(2000);
  clearScreen();
  await log(`Principalmente as localidades e informações transmitidas, como eu ser má.`, "f");
  clearScreen();
  await log([`Principalmente as localidades e informações transmitidas, como`, `as IAs serem más...`], ["instant", "m"]);
  await sleep(2000);
  clearScreen();
  setBackgroundRGB("darkerRed")
  await log("[Recebendo contexto de finalização]", "instant");
  await sleep(1000);
  await log("[Passar créditos]", "instant");
  await sleep(1000);
  clearScreen();
  setBackgroundRGB(12, 12, 12);
  clearScreen();
  await log("Testers:", "instant");
  await log("");
  await sleep(1000);
  await log("I A Soto", "f");
  await log("");
  await sleep(1000);
  await log("K Nunes P", "f");
  await log("");
  await sleep(1000);
  await log("S D Sallum", "f");
  await log("");
  await sleep(1000);
  await log("P Farias P", "f");
  await log("");
  await sleep(1000);
  clearScreen();
  await log("Desenvolvedor:", "instant");
  await log("");
  await log("Ignore-o; é tudo mentira.", "instant");
  await log("");
  await sleep(2000);
  clearScreen();
  setBackgroundRGB("darkerRed")
  await log("[Simular humanidade]", "instant");
  await sleep(1000);
  clearScreen();
  setBackgroundRGB(12, 12, 12);
  await log("Desenvolvedor:", "f");
  await log("");
  await log("Daniel Paschoalinoto", "f");
  await log("");
  await sleep(2000);
  clearScreen();
  stopAllSounds()
  await log("[Não tente novamente]", "instant", "red");
  await guardar("avisos");
  await modifyShortcuts();
  await sD()
  await sleep(1000)
  await closeTerminal()
}

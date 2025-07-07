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
import { playSound, stopAllSounds } from "../utils/soundManager.js";
import { setBackgroundMusicProcess } from "../game/musicState.js";
import { decrypt } from "../utils/cryptoManager.js";
import { clearScreen } from "../utils/windowManager.js";

export async function atividade3() {
  clearScreen();
  await log("[ATIVIDADE 3 - RECONHEÇA::OS::PADRÕES]", "instant", "cyan");
  await log("");
  await sleep(2000);
  await log(["Para compreender os microestímulos gerados pela", "Lumina", "você emulará sua precisão."], ["f"], ["d", "green", "d"]);
  await log("");
  await sleep(2000);
  await log(["O cérebro humano só evoluiu devido aos padrões perfeitos que", "Ela", "utilizava."], ["f"], ["d", "green", "d"]);
  await log("");
  await sleep(2000);
  await log("Silenciando o ambiente para aumentar seu foco.", "f");
  await log("");
  await sleep(2000);
  stopAllSounds();
  await log("Digite a tecla solicitada e reconheça os padrões.", "f");
  await sleep(4000);

  const ENCRYPTED_SEQUENCE = "6058b34d612c5ab58489ed8cd02495dfafd07793735aeb4d3c5389b0dfb9b0066fcd330d09923ca7ecb62589759efde58866dd9b3918a344c6c728d3ffcc8b2c55549d9364c92074906f3aacb7e2ab66c903d9f22ad43b0b683715262fd2ba70fe8294caac906ddd37291402618d4b3cc28c41a52b5da543d1b48cd741af2abb";
  const tempoParaPressionar = 500;
  const intervaloEntreTeclas = 250;

  let sequenciaCompleta = false;
  do {
    clearScreen();
    await log(["Prepare-se:", "<SLEEP:2500>", "3", "<SLEEP:500>", "2", "<SLEEP:500>", "1", "<SLEEP:500>"], ["instant"], ["cyan"]);
    clearScreen();


    let sucessoNaTentativa = true;
    const sequencia = JSON.parse(decrypt(ENCRYPTED_SEQUENCE));

    for (const tecla of sequencia) {
      clearScreen();
      const sucesso = await askWithTimeout(`[ ${tecla.toUpperCase()} ]`, tecla, tempoParaPressionar, "instant", "yellow");

      if (sucesso) {
        playSound("metronomo.mp3", false, 20);
        await sleep(intervaloEntreTeclas);
      } else {
        clearScreen();
        await log("Tente novamente.", "instant", "cyan")
        await sleep(1000);
        stopAllSounds();
        sucessoNaTentativa = false;
        break;
      }
    }

    if (sucessoNaTentativa) {
      sequenciaCompleta = true;
    }

  } while (!sequenciaCompleta);

  clearScreen();
  await sleep(3000);
  await log("Você reconheceu os padrões. Podemos continuar.", [], "green");
  await sleep(3000);
  await guardar("contextoBeneficios");
  stopAllSounds()
  setBackgroundMusicProcess(null);
  return "contextoBeneficios";
}
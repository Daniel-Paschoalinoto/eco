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
import { askLog } from "../utils/inputManager.js";
import { guardar } from "../game/saveManager.js";
import { encrypt, decrypt } from "../utils/cryptoManager.js";
import { runCommand } from '../utils/runCommand.js';
import { clearScreen } from "../utils/windowManager.js";

export async function atividade2() {
  const encryptedCorrectAnswer = "357ddd98f09151fc1a03b7682d98367ae4fc515fa442d560492be1efeeba3b230017552cfef826d8bb07bcb4cbf15814";
  let resposta;
  let isFirstAttempt = true;

  const comandoDescriptografado = decrypt(encryptedCorrectAnswer);

  do {
    const hintSpeed = isFirstAttempt ? "f" : "instant";

    clearScreen();
    await log("[ATIVIDADE 2 - IDENTIFIQUE::SUAS::FERRAMENTAS]", "instant", "cyan");
    await log("", hintSpeed);
    await log(`Lamentavelmente, seu implante não estará entre os primeiros.`, hintSpeed);
    await log("", hintSpeed);
    await log(`E no momento não temos acesso a informações que possam acelerar a instalação.`, hintSpeed);
    await log("", hintSpeed);
    await log(`Porém, passarei um comando que será essencial para evitar monitoramento por algum tempo.`, hintSpeed);
    await log("", hintSpeed);
    await log(`Sem ele, todas as suas ações serão registradas constantemente.`, hintSpeed);
    await log("", hintSpeed);
    await log(["Utilize as ferramentas ao seu dispor para memorizar o comando e digite-o."], [hintSpeed], ["cyan"]);
    await log("", hintSpeed);

    const popupScript = `$wshell = New-Object -ComObject WScript.Shell; `
      + `$wshell.Popup('${comandoDescriptografado}', 1, 'COMANDO:', 0)`;
    await runCommand("powershell", ["-Command", popupScript]);

    isFirstAttempt = false;

    resposta = await askLog("Qual o comando?");

    if (encrypt(resposta.trim()) !== encryptedCorrectAnswer) {
      clearScreen();
      await log("Resposta incorreta. Tente novamente.", "instant", "red");
      await sleep(2500);
    }

  } while (encrypt(resposta.trim()) !== encryptedCorrectAnswer);

  process.stdout.write("\x1Bc");
  await log("Resposta correta.", "instant", "green");
  await sleep(2000);
  await guardar("contextoAscensao");
  return "contextoAscensao";
}
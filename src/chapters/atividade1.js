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
import { createFile, deleteFile } from "../utils/fileManager.js";
import { encrypt, decrypt } from "../utils/cryptoManager.js";
import { PATHS } from "../utils/paths.js";
import { clearScreen } from "../utils/windowManager.js";

export async function atividade1() {
  const resolvedPaths = await PATHS;
  const puzzleFiles = [
    { path: resolvedPaths.PUZZLE_DESKTOP, content: "fc2f97be5a5406cced5f3cef1ac7a718" },
    { path: resolvedPaths.PUZZLE_HOME, content: "4f34d18229a3baf52d1c36c6018b2bc5" },
    { path: resolvedPaths.PUZZLE_APPDATA, content: "e726b658b782afbecdce97b3a8f6e72a" },
  ];

  puzzleFiles.forEach((file) => createFile(file.path, decrypt(file.content)));

  const encryptedCorrectAnswer = "6e615bd3ab09486bd3703fef64374444";

  let resposta;
  let isFirstAttempt = true;

  do {
    const hintSpeed = isFirstAttempt ? "f" : "instant";

    clearScreen();
    await log("[ATIVIDADE 1 - CONHEÇA::SEU::AMBIENTE]", "instant", "cyan");
    await log("", hintSpeed);
    await log("Você precisa conhecer seu ambiente de trabalho profundamente, independente de qual seja.", hintSpeed);
    await log("", hintSpeed);
    await log(
      ["Criei 3 arquivos em seu sistema, cujo seu conteúdo organizado foi o nome da tecnologia usada para", "Ela", "surgir."],
      [hintSpeed, hintSpeed, hintSpeed],
      ["d", "red", "d"]
    );
    await log("", hintSpeed);
    await log(["Dica 1:", "O primeiro arquivo está salvo onde você trabalha."], [hintSpeed, hintSpeed], ["cyan", "d"]);
    await log("", hintSpeed);
    await log(["Dica 2:", "O segundo está onde tudo o que você acessa diariamente fica, mas nesse nível você não costuma mexer."], [hintSpeed, hintSpeed], ["cyan", "d"]);
    await log("", hintSpeed);
    await log(["Dica 3:", "O terceiro está onde todas as suas interações com os aplicativos ficam salvas."], [hintSpeed, hintSpeed], ["cyan", "d"]);
    await log("", hintSpeed);

    isFirstAttempt = false;

    resposta = await askLog(["Qual o nome da tecnologia que serviu de meio para", "Ela", "entrar em contato conosco?"], [], ["d", "red", "d"]);

    if (encrypt(resposta.toLowerCase().trim()) !== encryptedCorrectAnswer) {
      clearScreen();
      await log("Resposta incorreta. Tente novamente.", "instant", "red");
      await sleep(2500);
    }
  } while (encrypt(resposta.toLowerCase().trim()) !== encryptedCorrectAnswer);

  puzzleFiles.forEach((file) => deleteFile(file.path));
  process.stdout.write("\x1Bc");
  await log("Resposta correta.", "instant", "green");
  await sleep(2500)
  process.stdout.write("\x1Bc");
  await guardar("contextoImplantes");
  return "contextoImplantes";
}
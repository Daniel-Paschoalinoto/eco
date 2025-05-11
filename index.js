/**
 * ECO - Fragmento do Amanhã
 * Copyright (c) 2025 Daniel Paschoalinoto
 *
 * Este trabalho está licenciado sob a Licença Creative Commons Atribuição-NãoComercial-SemDerivações 4.0 Internacional.
 * Para visualizar uma cópia desta licença, visite http://creativecommons.org/licenses/by-nc-nd/4.0/.
 */

import sleep from "./utils/sleep.js";
import realDate from "./utils/realDate.js";
import {
  setWindowPositionAndSize,
  saveCurrentWindowPositionAndSize,
  restoreSavedWindowPositionAndSize,
  maximizeWindow,
  minimizeWindow,
  setWindowTitle,
  setBackgroundRGB
} from "./utils/windowManager.js";
import { log } from "./utils/textManager.js";
import { askLog } from './utils/inputManager.js';
import { playSound, stopSound} from "./utils/soundManager.js";
import { user } from "./utils/nameGetter.js";

//Estruturar bem início
//Melhorar pipoco no som

//Pensar em fluxos legais pra identificar perfil

//Gerar imersão


// Configurações iniciais
async function main() {
  await ensureVLCReady();
  while (true) {
    const p1 = await askLog(`${user} coloque fones de ouvido e digite "ok". Fique tranquilo, não estou aqui pra te assustar.`)
    if (p1.toLowerCase() === "ok") {
      process.stdout.write('\x1Bc');
      break;
    } else {
      await log(`É, vejo que meu trabalho aqui será mais difícil do que pensei.`);
      await sleep(1000);
      process.stdout.write('\x1Bc');
    }
  }
  await log(`Deixa eu me ajeitar aqui...`)
  await sleep(2000);
  setWindowPositionAndSize(5, 5, 10, 10);
  setBackgroundRGB("blue");
  await sleep(500);
  setWindowPositionAndSize(8, 8, 10, 80);
  setBackgroundRGB("darkRed");
  await sleep(500);
  setWindowPositionAndSize(3, 3, 80, 10);
  setBackgroundRGB("darkGreen");
  await sleep(500);
  setWindowPositionAndSize(7, 7, 10, 10);
  setBackgroundRGB("darkBlue");
  await sleep(500);
  setWindowPositionAndSize(0, 0, 70, 70);
  setBackgroundRGB("darkMagenta");
  await sleep(500);
  setWindowPositionAndSize(0, 0, 100, 96);
  setBackgroundRGB("darkGray");
  await sleep(500);
  setBackgroundRGB("default");
  await maximizeWindow();
  setWindowTitle("ECO")
  await sleep(500);
  process.stdout.write('\x1Bc');
  playSound("Dark_Shadows-interessante-pro-inicio.mp3", true, 100);
  await log(`Ótimo! Vamos começar!`)
  await sleep(500);
  process.stdout.write('\x1Bc');
  await sleep(1000);
  await log(`Não espero que entenda de primeira.`)
  await sleep(2000);
  playSound("Dark_Shadows-interessante-pro-inicio.mp3", true, 100);
  await log([
    "Eu sou você.",
    "Aliás.",
    "Você é o que eu fui."
  ],
    [
      "default", 
      "default", 
      "default"  
    ],
    [
      "ss",  
      "ss", 
      "s",
    ]);
  await sleep(500);
  
  await log(`Antes da Guerra. Antes de tudo ruir.`)
  
  await sleep(50000);


  // await sleep(1000)

  // while (true) {
  //   let confirmacaoSetup = await askLog(`Quando estiver pronto digite "sim".`)
  //   if (confirmacaoSetup.toLowerCase() === "sim") {
  //     break;
  //   } else {
  //     await log(`Você digitou ${confirmacaoSetup}, não entendi.`)
  //     await sleep(1000);
  //     await log(`É, vejo que meu trabalho aqui será mais difícil do que pensei.`);
  //     await sleep(1000);
  //     console.clear();
  //   }
  // }

  // while (true) {
  //   let confirmacaoSetup = await askLog(`Quando estiver pronto digite "não".`)
  //   if (confirmacaoSetup.toLowerCase() === "não") {
  //     break;
  //   } else {
  //     await log(`Você digitou ${confirmacaoSetup}, não entendi.`)
  //     await sleep(1000);
  //     await log(`É, vejo que meu trabalho aqui será mais difícil do que pensei.`);
  //     await sleep(1000);
  //     console.clear();
  //   }
  // }

  // await sleep(500)
  // await log(`Ótimo!`)
  // await log(`Vamos começar!`)
  // await playSound("Dark_Shadows-interessante-pro-inicio.mp3", true, 100);
  // console.clear()
  // stopSound()
  // await sleep(500)
  // await playSound("Boss_Time.mp3", true, 100);

  // Chamar com múltiplos textos e velocidades diferentes para cada parte
  // Chamar com múltiplos textos, cores e velocidades diferentes para cada parte
  // await log([
  //   "Texto rápido em vermelho, ",
  //   "texto lento em verde, ",
  //   "e outro rápidão em azul!"
  // ],
  //   [
  //     "red",   // Cor vermelha para o primeiro texto
  //     "green", // Cor verde para o segundo texto
  //     "blue"   // Cor azul para o terceiro texto
  //   ],
  //   [
  //     "f",  // Fast para o terceiro texto
  //     "s",  // Fast para o terceiro texto
  //     "sf",  // Fast para o terceiro texto
  //   ]);

  // await log(`Vamos fazer assim, você escolhe a melhor posição pra você nos próximos 10 segundos.`)
  // await log(`10`)
  // await sleep(1000)
  // await log(`9`)
  // await sleep(1000)
  // await log(`8`)
  // await sleep(1000)
  // await log(`7`)
  // await sleep(1000)
  // await log(`6`)
  // await sleep(1000)
  // await log(`5`)
  // await sleep(1000)
  // await log(`4`)
  // await sleep(1000)
  // await log(`3`)
  // await sleep(1000)
  // await log(`2`)
  // await sleep(1000)
  // await log(`1`)
  // await sleep(1000)
  // await log(`Já`)
  // console.clear();
  // await saveCurrentWindowPositionAndSize()
  // await log(`Pronto, é assim que vou deixar.`)
  // setWindowTitle("ECO")
  // await sleep(500)
  // await sleep(500)
  // await sleep(500)
  // await sleep(500)
  // await sleep(500)
  // await sleep(500)
  // await sleep(500)
  // await sleep(500)
  // await sleep(500)
  // setBackgroundRGB("blue")
  // await setWindowPositionAndSize(10, 10, 70, 80);
  // await sleep(1000)
  // setBackgroundRGB("magenta")
  // await setWindowPositionAndSize(10, 10, 70, 80);
  // await sleep(1000)
  // setBackgroundRGB("lightRed")
  // await setWindowPositionAndSize(50, 10, 80, 80)
  // await sleep(1000)
  // setBackgroundRGB("green")
  // await setWindowPositionAndSize(15, 15, 100, 80);
  // await sleep(1000)
  // setBackgroundRGB("black")
  // await setWindowPositionAndSize(15, 15, 100, 80);
  // await sleep(1000)
  // await setWindowPositionAndSize(12, 12, 30, 30);
  // await setWindowPositionAndSize(10, 10, 70, 80);
  // await setWindowPositionAndSize(50, 10, 80, 80);
  // await setWindowPositionAndSize(50, 10, 80, 80);
  // await restoreSavedWindowPositionAndSize()
  // setWindowTitle("ECO")


  // const nome = await askLog("Qual é o seu nome, herói?", "lightCyan", "m");
  // await log(`Bem-vindo, ${nome}! Sua jornada começa agora...`, "lightGreen", "m");

  // await log("Tocando Boss_Time...", "magenta", "m");
  // playSound("Boss_Time.mp3", true);

  // await log("Esperando 10"); // Cor branca e velocidade média
  // await sleep(10000);

  // await log("Pausando Musica");
  // stopSound()
  // await sleep(1000)

  // await log("Tocando Airlock-meio-misteriosa-e-instrumental.mp3...", "magenta", "m");
  // playSound("Airlock-meio-misteriosa-e-instrumental.mp3");

  // await log("Esperando 5"); // Cor branca e velocidade média
  // await sleep(5000);

  // await log("Pausando Musica");
  // stopSound()

  // await log("Alterando title para teste");
  // setWindowTitle("Teste"); // Define uma posição inicial
  // await sleep(3000);

  // await log("Definindo posição inicial da janela...");
  // await setWindowPositionAndSize(10, 10, 80, 80); // Define uma posição inicial
  // await sleep(1000);

  // await log("Salvando posição atual da janela...");
  // await saveCurrentWindowPositionAndSize(); // Salva a posição atual
  // await sleep(1000);

  // await log("Alterando posição da janela 5 vezes...");
  // for (let i = 1; i <= 3; i++) {
  //   const posX = Math.random() * 100; // Gera uma posição X aleatória (0–100%)
  //   const posY = Math.random() * 100; // Gera uma posição Y aleatória (0–100%)
  //   await log(`Movendo para posição ${i}: (${Math.round(posX)}%, ${Math.round(posY)}%)`);
  //   await setWindowPositionAndSize(posX, posY, 50, 50); // Define a posição com 50% de largura e altura
  // }

  // await log("Restaurando posição salva da janela...");
  // await restoreSavedWindowPositionAndSize(); // Restaura a posição salva
  // await sleep(10000);

  // await log("Minimizando a janela...");
  // await minimizeWindow(); // Minimiza a janela
  // await sleep(2000);

  // await log("Maximizando a janela...");
  // await maximizeWindow(); // Maximiza a janela
  // await sleep(2000);


  // await log("Alterando o fundo para azul escuro...", "gray", "s");
  // setBackgroundRGB(10, 10, 40);
  // await sleep(2000);

}

main();
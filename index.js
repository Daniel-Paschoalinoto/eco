import sleep from "./utils/sleep.js";
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
import { askLog, closeInput } from './utils/inputManager.js';
import { playSound, stopSound } from "./utils/soundManager.js";
import { user } from "./utils/nameGetter.js";

//Criar fluxos dependendo das decisões.
//FAzer tocar sons.
//Gerar imersão


// Configurações iniciais
async function main() {
  await saveCurrentWindowPositionAndSize();
  await log(`Pera ae ${user}, deixa eu ajustar esse terminal.`)
  await setWindowPositionAndSize(10, 10, 80, 100);
  setBackgroundRGB("red")
  await sleep(1000)
  setBackgroundRGB("blue")
  await sleep(1000)
  setBackgroundRGB("magenta")
  await sleep(1000)
  setBackgroundRGB("lightRed")
  await sleep(1000)
  setBackgroundRGB("green")
  await sleep(1000)
  await setWindowPositionAndSize(15, 15, 100, 80);
  await setWindowPositionAndSize(12, 12, 30, 30);
  await setWindowPositionAndSize(10, 10, 70, 80);
  await setWindowPositionAndSize(50, 10, 80, 80);
  await setWindowPositionAndSize(50, 10, 80, 80);
  await restoreSavedWindowPositionAndSize()
  setWindowTitle("ECO")


  const nome = await askLog("Qual é o seu nome, herói?", "lightCyan", "m");
  await log(`Bem-vindo, ${nome}! Sua jornada começa agora...`, "lightGreen", "m");

  await log("Tocando Boss_Time...", "magenta", "m");
  playSound("Boss_Time.mp3", true);

  await log("Esperando 10"); // Cor branca e velocidade média
  await sleep(10000);

  await log("Pausando Musica");
  stopSound()
  await sleep(1000)

  await log("Tocando Airlock-meio-misteriosa-e-instrumental.mp3...", "magenta", "m");
  playSound("Airlock-meio-misteriosa-e-instrumental.mp3");

  await log("Esperando 5"); // Cor branca e velocidade média
  await sleep(5000);

  await log("Pausando Musica");
  stopSound()

  await log("Alterando title para teste");
  setWindowTitle("Teste"); // Define uma posição inicial
  await sleep(3000);

  await log("Definindo posição inicial da janela...");
  await setWindowPositionAndSize(10, 10, 80, 80); // Define uma posição inicial
  await sleep(1000);

  await log("Salvando posição atual da janela...");
  await saveCurrentWindowPositionAndSize(); // Salva a posição atual
  await sleep(1000);

  await log("Alterando posição da janela 5 vezes...");
  for (let i = 1; i <= 3; i++) {
    const posX = Math.random() * 100; // Gera uma posição X aleatória (0–100%)
    const posY = Math.random() * 100; // Gera uma posição Y aleatória (0–100%)
    await log(`Movendo para posição ${i}: (${Math.round(posX)}%, ${Math.round(posY)}%)`);
    await setWindowPositionAndSize(posX, posY, 50, 50); // Define a posição com 50% de largura e altura
  }

  await log("Restaurando posição salva da janela...");
  await restoreSavedWindowPositionAndSize(); // Restaura a posição salva
  await sleep(10000);

  await log("Minimizando a janela...");
  await minimizeWindow(); // Minimiza a janela
  await sleep(2000);

  await log("Maximizando a janela...");
  await maximizeWindow(); // Maximiza a janela
  await sleep(2000);
  

  await log("Alterando o fundo para azul escuro...", "gray", "s");
  setBackgroundRGB(10, 10, 40);
  await sleep(2000);

}

main();
import sleep from "./utils/sleep.js";
import {
  setWindowPositionAndSize,
  saveCurrentWindowPositionAndSize,
  restoreSavedWindowPositionAndSize,
  maximizeWindow,
  minimizeWindow,
  setWindowTitle,
} from "./utils/windowManager.js";
import { log } from "./utils/textManager.js";
import { askLog, closeInput } from './utils/inputManager.js';
import { playSound, stopSound } from "./utils/soundManager.js";

//Criar fluxos dependendo das decisões.
//FAzer tocar sons.
//Gerar imersão


// Configurações iniciais
async function main() {

  

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

  // await log("Maximizando a janela...");
  // await maximizeWindow(); // Maximiza a janela
  // await sleep(2000);

  // await log("Minimizando a janela...");
  // await minimizeWindow(); // Minimiza a janela
  // await sleep(2000);

  // await log("Ajustando janela");
  // await log("Esperando 2");
  // await sleep(2000);
  // await setWindowPositionAndSize(100, 100, 100, 96);
  

  // await log("Definindo posição e tamanho da janela...", "blue", "m");
  // await setWindowPositionAndSize(100, 100, 800, 600);
  // await sleep(2000);

  // await log("Alterando posição e tamanho novamente...", "green", "m");
  // await setWindowPositionAndSize(200, 200, 1024, 768);
  // await sleep(2000);

  // await log("Teste 1: Minimizando a janela...", "yellow", "sf");
  // await minimizeWindow();
  // await sleep(2000);

  // await log("Teste 2: Maximizar a janela com velocidade aleatória...", "blue", "uf");
  // await maximizeWindow();
  // await sleep(2000);

  // await log("Teste 3: Alterando o fundo para azul escuro...", "gray", "s");
  // setBackgroundRGB(10, 10, 40);
  // await sleep(2000);

  // await log("Teste 4: Alterando o título da janela para 'Janela de Teste'...", "magenta", "f");
  // setWindowTitle("Janela de Teste");
  // await sleep(2000);

  // await log("Teste 5: Texto com velocidade ultra rápida (uf)...", "cyan", "uf");
  // await sleep(1000);

  // await log("Teste 6: Texto com velocidade ultra lenta (us)...", "red", "us");
  // await sleep(1000);

  // await log("Teste 7: Texto com cor cinza e velocidade média (m)...", "gray", "m");
  // await sleep(1000);

  // await log("Teste 8: Cor azul clara (lightBlue)...", "lightBlue", "f");
  // await sleep(1000);

  // await log("Teste 9: Cor verde clara (lightGreen)...", "lightGreen", "sf");
  // await sleep(1000);

  // await log("Teste 10: Cor amarela clara (lightYellow)...", "lightYellow", "sf");
  // await sleep(1000);

  // await log("Teste 11: Cor vermelha clara (lightRed)...", "lightRed", "s");
  // await sleep(1000);

  // await log("Teste 12: Cor branca brilhante (lightWhite)...", "lightWhite", "f");
  // await sleep(1000);

  // // Efeito dramático com título
  // await log("Preparando para a revelação do título...", "lightMagenta", "ss");
  // await sleep(1000);
  // setWindowTitle("✨ Revelação Final ✨");
  // await log("✨ Título Revelado ✨", "lightCyan", "m");

  // await log("Todos os testes concluídos!", "lightGreen", "sf");
}

main();
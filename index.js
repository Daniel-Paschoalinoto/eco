import sleep from "./utils/sleep.js";
import { setBackgroundRGB, setWindowTitle, maximizeWindow, minimizeWindow, setWindowPositionAndSize } from "./utils/windowFormatter.js";
import { log } from "./utils/textFormatter.js";
import { playSound, stopSound } from "./utils/soundManager.js";

//Criar fluxos dependendo das decisões.
//FAzer tocar sons.
//Gerar imersão


// Configurações iniciais
async function main() {
  await log("Ajustando janela");
  await log("Esperando 2");
  await sleep(2000);
  await setWindowPositionAndSize(0, 0, 200, 200);
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

  await log("Definindo posição e tamanho da janela...", "blue", "m");
  await setWindowPositionAndSize(100, 100, 800, 600);
  await sleep(2000);

  await log("Alterando posição e tamanho novamente...", "green", "m");
  await setWindowPositionAndSize(200, 200, 1024, 768);
  await sleep(2000);

  await log("Teste 1: Minimizando a janela...", "yellow", "sf");
  await minimizeWindow();
  await sleep(2000);

  await log("Teste 2: Maximizar a janela com velocidade aleatória...", "blue", "uf");
  await maximizeWindow();
  await sleep(2000);

  await log("Teste 3: Alterando o fundo para azul escuro...", "gray", "s");
  setBackgroundRGB(10, 10, 40);
  await sleep(2000);

  await log("Teste 4: Alterando o título da janela para 'Janela de Teste'...", "magenta", "f");
  setWindowTitle("Janela de Teste");
  await sleep(2000);

  await log("Teste 5: Texto com velocidade ultra rápida (uf)...", "cyan", "uf");
  await sleep(1000);

  await log("Teste 6: Texto com velocidade ultra lenta (us)...", "red", "us");
  await sleep(1000);

  await log("Teste 7: Texto com cor cinza e velocidade média (m)...", "gray", "m");
  await sleep(1000);

  await log("Teste 8: Cor azul clara (lightBlue)...", "lightBlue", "f");
  await sleep(1000);

  await log("Teste 9: Cor verde clara (lightGreen)...", "lightGreen", "sf");
  await sleep(1000);

  await log("Teste 10: Cor amarela clara (lightYellow)...", "lightYellow", "sf");
  await sleep(1000);

  await log("Teste 11: Cor vermelha clara (lightRed)...", "lightRed", "s");
  await sleep(1000);

  await log("Teste 12: Cor branca brilhante (lightWhite)...", "lightWhite", "f");
  await sleep(1000);

  // Efeito dramático com título
  await log("Preparando para a revelação do título...", "lightMagenta", "ss");
  await sleep(1000);
  setWindowTitle("✨ Revelação Final ✨");
  await log("✨ Título Revelado ✨", "lightCyan", "m");

  await log("Todos os testes concluídos!", "lightGreen", "sf");
}

main();
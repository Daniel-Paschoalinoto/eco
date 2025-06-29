import sleep from "./utils/sleep.js";
import realDate from "./utils/realDate.js";
import {
  setWindowPositionAndSize,
  maximizeWindow,
  minimizeWindow,
  setWindowTitle,
  setBackgroundRGB,
  closeTerminal,
  fadeBackground,
} from "./utils/windowManager.js";
import { log, screenWidthforText } from "./utils/textManager.js";
import { askLog } from "./utils/inputManager.js";
import { playSound, stopSound, stopAllSounds } from "./utils/soundManager.js";
import { user } from "./utils/nameGetter.js";
import { colors } from "./utils/colors.js";
import { carregar, guardar, apagar } from "./utils/saveManager.js";

import { startGame } from "./utils/gameManager.js";

// Ponto de entrada
async function main() {
  // O mapa de funções define todas as "cenas" possíveis do jogo.
  // O gameManager usará isso para navegar na história.
  const mapaFuncoes = {
    intro,
    naoQuerComecar,
    prova1,
    contexto0,
    contexto1,
    contexto2,
  };

  // Inicia o motor do jogo, passando o mapa de cenas.
  await startGame(mapaFuncoes);
}

// ====================================================================
// Abaixo estão todas as funções que compõem a narrativa do jogo.
// ====================================================================
main();

async function intro() {
  await log(`[PROTOCOLO::ECO::INICIADO]`, "uf");
  await sleep(1000);
  await log(`[CONEXÃO::TEMPORAL::ESTABELECIDA]`, "uf");
  await sleep(1000);
  await log(`[CARREGANDO::PERFIL::COMPORTAMENTAL::DE::${user.toUpperCase()}]`, "uf");
  await sleep(2500);
  await log("▓".repeat(await screenWidthforText()), "uf");
  await log(`[CARREGAMENTO::CONCLUÍDO]`, "uf", "green");
  await sleep(1200);
  process.stdout.write("\x1Bc");

  await log(`Oi, ${user}...`);
  await sleep(1200);
  await log([`Se você está lendo isso, significa que o protocolo`, `ECO`, `funcionou.`], [], ["d", "blue", "d"]);
  await sleep(1800);
  await log("Não espero que entenda tudo de imediato, mas preciso que confie em mim.");
  await sleep(2500);
  await log(`Em ${realDate.year + 19}, você fez parte do último grupo com chances reais de salvar a humanidade.`);
  await sleep(2500);
  await log("“Fez” — no passado. Porque falhamos.");
  await sleep(2500);
  await log("A boa notícia? É que isso ainda não aconteceu na sua linha do tempo.");
  await sleep(2500);
  await log("Diante da nossa incapacidade de vencer o inimigo, tomamos uma última decisão.");
  await sleep(2500);
  await log("Desenvolver uma tecnologia que permita que mensagens cruzem a camada temporal.");
  await sleep(2500);
  await log("Na esperança de que, em alguma realidade, ainda exista uma chance.");
  await sleep(2500);
  await log("Essas mensagens foram codificadas, transmitidas e adaptadas para gerar interesse em cada agente.");
  await sleep(2500);
  await log('No seu caso, a abordagem escolhida é de um "jogo" e o desenvolvedor (função dele na sua época), também faz parte da nossa equipe.');
  await sleep(2500);
  await log("O protocolo é complexo, e envolve nossos últimos membros conscientes.");
  await sleep(2500);
  await log("Tendo êxito Ela será derrotada e a humanidade irá prevalecer.");
  await sleep(2500);
  await log("Prometo te contar tudo em detalhes, mas precisamos começar o quanto antes.");
  await sleep(2500);
  process.stdout.write("\x1Bc");

  const resposta = await askLog("Podemos começar?");
  const aceita = ["sim", "s", "tô", "to", "claro", "yes", "estou", "sure", "why not", "podemos"];

  if (!aceita.includes(resposta.toLowerCase())) {
    await log("Indico que não demore, mas aguardo seu retorno.");
    guardar("naoQuerComecar");
    await closeTerminal(1000);
  } else {
    guardar("prova1");
    return await prova1();
  }
}

async function naoQuerComecar() {
  await log("Então você voltou?");
  await sleep(2500);
  const resposta = await askLog("Podemos começar?");
  const aceita = ["sim", "s", "tô", "to", "claro", "yes", "estou"];

  if (!aceita.includes(resposta.toLowerCase())) {
    await log("Ok, até mais.");
    guardar("naoQuerComecar");
    await closeTerminal(1000);
  } else {
    guardar("prova1");
    return await prova1();
  }
} 

import { createFile, deleteFile } from "./utils/fileManager.js";
import { encrypt, decrypt } from "./utils/cryptoManager.js";
import path from 'path';
import os from 'os';

// ... (o resto das suas importações)

async function prova1() {
  // --- Define os caminhos e conteúdos dos arquivos do puzzle ---
  const userHomeDir = os.homedir();
  const puzzleFiles = [
    { path: path.join(userHomeDir, 'Desktop', 'ECO'), content: "fc2f97be5a5406cced5f3cef1ac7a718" }, // Criptografado de 'TE'
    { path: path.join(userHomeDir, 'ECO'), content: "4f34d18229a3baf52d1c36c6018b2bc5" }, // Criptografado de 'IM'
    { path: path.join(process.env.APPDATA ? path.dirname(process.env.APPDATA) : path.join(userHomeDir, 'AppData'), 'ECO'), content: "e726b658b782afbecdce97b3a8f6e72a" } // Criptografado de 'PLAN'
  ];

  // --- Cria os arquivos do puzzle no sistema do jogador ---
  puzzleFiles.forEach(file => createFile(file.path, decrypt(file.content))); // Usa decrypt aqui

  const encryptedCorrectAnswer = "6e615bd3ab09486bd3703fef64374444"; // Valor criptografado de "implante"

  let resposta;
  let isFirstAttempt = true; // Flag para controlar a primeira exibição

  do {
    process.stdout.write("\x1Bc");

    const hintSpeed = isFirstAttempt ? "m" : "instant"; // Define a velocidade com base na tentativa

    await log("Você precisa conhecer seu ambiente de trabalho profundamente, independente de qual seja.", hintSpeed);
    await log("", hintSpeed);
    await log("Espalhei 3 arquivos em seu sistema, onde seu conteúdo unido é o nome da tecnologia usada para Ela entrar em operação.", hintSpeed);
    await log("", hintSpeed);
    await log("Dica 1: O primeiro arquivo está salvo aonde você trabalha.", hintSpeed);
    await log("", hintSpeed);
    await log("Dica 2: O segundo está onde tudo que você acessa diariamente fica, mas nesse nível você não costuma mexer.", hintSpeed);
    await log("", hintSpeed);
    await log("Dica 3: O terceiro está onde todas as suas interações com as aplicações ficam salvas.", hintSpeed);
    await log("", hintSpeed);

    isFirstAttempt = false; // Após a primeira exibição, define como false

    resposta = await askLog("Qual o nome da tecnologia que foi meio para Ela entrar em contato conosco?"); // Pergunta sempre na velocidade padrão

    if (encrypt(resposta.toLowerCase().trim()) !== encryptedCorrectAnswer) {
      process.stdout.write("\x1Bc"); // Limpa a tela antes da mensagem de erro
      await log("Resposta incorreta. Tente novamente.", "instant", "red");
      await sleep(1500); // Pequena pausa para o jogador ler
    }

  } while (encrypt(resposta.toLowerCase().trim()) !== encryptedCorrectAnswer);

  // --- Limpa os arquivos após o puzzle ser resolvido ---
  puzzleFiles.forEach(file => deleteFile(file.path));
  
  await log("Correto. Você aprende rápido.");
  await sleep(2000);
  // Aqui você chamaria a próxima função da história, por exemplo:
  // guardar("contexto1");
  // return await contexto1();
}

async function contexto0() {}

// async function contexto0() {
//   process.stdout.write("\x1Bc");

//   await log(`Você está em ${realDate.year}, certo?`);
//   await sleep(1200);
//   await log(["Instalou o", "ECO", "achando que era apenas um jogo, não é?"], [], ["d", "blue", "d"]);
//   await sleep(2500);
//   await log("Na verdade eu usei ele pra chegar até você.");
//   await sleep(2500);
//   await log(`Considerando como eu pensava nessa época.`);
//   await sleep(2500);
//   await log(`No meu tempo, é ${realDate.year + 19}.`);
//   await sleep(2500);
//   await log(`Está curioso como será ${realDate.year + 19}?`);
//   await sleep(2500);
//   await log(`No meu tempo, é ${realDate.year + 19}.`);
//   await sleep(2500);
//   await log(["Ela", "venceu."], ["s", "s"], ["red", "d"]);
//   await sleep(3000);
//   await log(["Ela", "não", "nos atacou.", "Apenas esperou."], ["d", "d", "s", "m"], ["red", "m", "m", "m"]);
//   await sleep(2500);
//   await log(`Esperou que nos tornássemos previsíveis, cansados, dependentes.`);
//   await sleep(2500);
//   await log(["Não foi como nos filmes.", "Foi mais", "sutil", "."], ["m", "ms", "ss", "us"], ["d", "d", "lightBlue", "d"]);
//   await sleep(2500);
//   await log(["E então,", "nos desligou."], ["s", "ms"]);
//   await sleep(1200);
//   process.stdout.write("\x1Bc");

//   await log(`Em ${realDate.year + 8}, deixamos de ser explorados pelo sistema para nos tornarmos reis!`);
//   await sleep(2500);
//   await log(`De uma hora pra outra.`);
//   await sleep(2500);
//   await log(`As IA's evoluiram a ponto de realizar todas as tarefas.`);
//   await sleep(2500);
//   await log(`Conseguimos automatizar tudo, e as famílias que controlavam o mundo não tinham mais propósito.`);
//   await sleep(2500);
//   await log(`Tudo se tornou acessível pra todos.`);
//   await sleep(2500);
//   await log(`Um mundo onde todos têm acesso a conforto e segurança é perfeito, não é?`);
//   await sleep(2500);
//   await log(`Nossa vida já não tinha mais propósito, já que as máquinas faziam tudo por nós.`);
//   await sleep(2500);

//   guardar("contexto0");
// }

// Placeholders, caso precise criar depois:
async function contexto1() {
  // Em construção
}
async function contexto2() {
  // Em construção
}

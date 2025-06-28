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

// Ponto de entrada
async function main() {
  const pontoAtual = carregar() || "intro";

  // Rotina de inicialização padrão
  playSound("Dark_Shadows.mp3", true, 20);
  process.stdout.write("\x1Bc"); // Limpa a tela

  // Se estiver carregando um save, exibe uma mensagem de contexto
  if (pontoAtual !== "intro") {
    await log(`[CONTINUANDO::SESSÃO]`, "f");
    await sleep(2000);
    process.stdout.write("\x1Bc"); // Limpa a tela novamente após a mensagem
  }

  // Mapa de fluxo do jogo
  const mapaFuncoes = {
    intro,
    naoQuerComecar,
    prova1,
    contexto0,
    contexto1,
    contexto2,
  };

  // Inicia o jogo a partir do ponto de controle correto
  const proximaFuncao = mapaFuncoes[pontoAtual] || intro;
  await proximaFuncao();
}
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

async function prova1() {
  let resposta;
  do {
    process.stdout.write("\x1Bc");
    await log("Você precisa conhecer seu ambiente de trabalho profundamente, independente de qual seja.");
    await log("");
    await log("Espalhei 3 arquivos em seu sistema, onde seu conteúdo unido é o nome da tecnologia usada para Ela entrar em operação.");
    await log("");
    await log("Arquivo 1: Está salvo aonde você trabalha.");
    await log("");
    await log("Arquivo 2: É onde tudo que você acessa diariamente está, mas nesse nível você não costuma mexer.");
    await log("");
    await log("Arquivo 3: É onde todas suas interações com as aplicações ficam salvas.");
    await log("");
    resposta = await askLog("Qual o nome da tecnologia que foi meio para Ela entrar em contato conosco?");
  } while (resposta.toLowerCase() !== "implante");
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

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
import fs from "fs";
import { colors } from "./utils/colors.js";
import { carregar, guardar, apagar } from "./utils/saveManager.js";

// Configurações iniciais
async function main() {
  let pontoAtual = carregar();
  if (!pontoAtual) pontoAtual = "intro";
  playSound("Dark_Shadows.mp3", true, 20);

  switch (pontoAtual) {
    case "intro":
      return await intro();

    case "naoQuerComecar":
      await naoQuerComecar();
      return await contexto0();

    case "contexto0":
      return await contexto0();

    case "contexto1":
      return await contexto1();

    case "contexto2":
      return await contexto2();

    default:
      await intro();
  }
}
main();

async function intro() {
  //Start loading////////////////////////////////////////////////////////////////////////////////////////////////////////////
  await log(`[PROTOCOLO::ECO::INICIADO]`, "uf");
  await sleep(1000);
  await log(`[CONEXÃO::TEMPORAL::ESTABELECIDA]`, "uf");
  await sleep(1000);
  await log(`[CARREGANDO::PERFIL::COMPORTAMENTAL::DE::${user.toUpperCase()}]`, "uf");
  await sleep(2500);
  await log(`▓`.repeat(await screenWidthforText()), "uf");
  await log(`[CARREGAMENTO::CONCLUÍDO]`, "uf", "green");
  await sleep(1200);
  process.stdout.write("\x1Bc");
  //////////////////////////////////////////////////////////////////////////////////////////////
  // Intro
  // await log(["", "", ""], ["", "", ""], ["", "", ""]);
  await log(`Oi, ${user}...`);
  await sleep(1200);
  await log([`Se você está lendo isso, significa que o protocolo`, `ECO`, `funcionou.`], [], ["d", "blue", "d"]);
  await sleep(1800);
  await log("Não espero que entenda de primeira mas...");
  await sleep(2500);
  await log(`Eu sou você.`, "us");
  await sleep(2500);
  await log(["Ou melhor,", `você é o que eu fui.`], ["s", "m"]);
  await sleep(2500);
  await log(["Antes da", "Cisão", "."], ["m", "m", "s"], ["d", "red", "d"]);
  await sleep(2500);
  await log(["Antes que", "ela", "tomasse o que tínhamos de mais valioso."], [], ["d", "red", "d"]);
  await sleep(2500);
  await log([`Vou te explicar tudo. Mas antes, preciso que`, `confie em mim`, `.`], ["m", "s", "m"], ["d", "green", "d"]);
  await sleep(3500);
  process.stdout.write("\x1Bc");
  await log("Vou te ensinar habilidades essenciais, para que no momento derradeiro seu destino seja diferente do meu.");
  await sleep(2500);
  await log("E irei te testar para garantir nosso sucesso.");
  await sleep(2500);
  process.stdout.write("\x1Bc");
  await sleep(1200);
  let respostaIntro = await askLog("Está pronto?");
  let respostasAceitaIntro = ["sim", "s", "tô", "claro", "yes"];
  if (!respostasAceitaIntro.includes(respostaIntro.toLowerCase())) {
    await log("Então volte quando estiver.");
    guardar("naoQuerComecar");
    await closeTerminal(2000);
  } else {
    guardar("contexto0");
  }
}

async function naoQuerComecar() {
  await log("Então você voltou?");
  let respostaIntro2 = await askLog("Podemos começar?");
  let respostasAceitaIntro2 = ["sim", "s", "tô", "claro", "yes"];
  if (!respostasAceitaIntro2.includes(respostaIntro2.toLowerCase())) {
    await log("Ok, volte quando estiver.");
    guardar("naoQuerComecar");
    await closeTerminal(2000);
  } else {
    guardar("contexto0");
  }
}

async function contexto0() {
  process.stdout.write("\x1Bc");
  await log(`Você está em ${realDate.year}, certo?`);
  await sleep(1200);
  await log(["Instalou o", "ECO", "achando que era apenas um jogo, não é?"], [], ["d", "blue", "d", "d"]);
  await sleep(2500);
  await log("Na verdade eu usei ele pra chegar até você.");
  await sleep(2500);
  await log(`Considerando como eu pensava em ${realDate.year}.`);
  await sleep(2500);
  await log(`No meu tempo, é ${realDate.year + 19}.`);
  await sleep(2500);
  await log(`Está curioso como será ${realDate.year + 19}?`);
  await sleep(2500);
  await log(``);
  await sleep(2500);
  await log(`No meu tempo, é ${realDate.year + 19}.`);
  await sleep(2500);
  await log(`No meu tempo, é ${realDate.year + 19}.`);
  await sleep(2500);
  await log(`No meu tempo, é ${realDate.year + 19}.`);
  await sleep(2500);
  await log(["Ela", "venceu."], ["s", "s"], ["red", "d"]);
  await sleep(3000);
  await log(["Ela", "não", "nos atacou.", "Apenas esperou."], ["d", "d", "s", "m"], ["red", "m", "m", "m"]);
  await sleep(2500);
  await log(`Esperou que nos tornássemos previsíveis, cansados, dependentes.`);
  await sleep(2500);
  await log(["Não foi como nos filmes.", "Foi mais", "sutil", "."], ["m", "ms", "ss", "us"], ["d", "d", "lightBlue", "d"]);
  await sleep(2500);
  await log(["E então,", "nos desligou."], ["s", "ms"]);
  await sleep(1200);
  process.stdout.write("\x1Bc");
  //////////////////////////////////////////////////////////////////////////////////////////////
  //Contexto 2
  await log(`Em ${realDate.year + 8}, deixamos de ser explorados pelo sistema para nos tornarmos reis!`);
  await sleep(2500);
  await log(`De uma hora pra outra.`);
  await sleep(2500);
  await log(`As IA's evoluiram a ponto de realizar todas as tarefas.`);
  await sleep(2500);
  await log(`Conseguimos automatizar tudo, e as famílias que controlavam o mundo não tinham mais propósito.`);
  await sleep(2500);
  await log(`Tudo se tornou acessível pra todos.`);
  await sleep(2500);
  await log(`Um mundo onde todos tem acesso a conforto e segurança é perfeito não é?`);
  await sleep(2500);
  await log(`Nossa vida já não tinha mais propósito, já que as máquinas faziam tudo por nós.`);
  await sleep(2500);
  guardar("contexto0");
}

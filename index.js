//index.js
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
import { carregar, guardar, apagar, hasRunBefore, markRunCompleted } from "./utils/saveManager.js";
import { respostasAceitas } from "./utils/constants.js";

import { startGame } from "./utils/gameManager.js";

// Ponto de entrada
async function main() {
  if (!hasRunBefore()) {
    await log("[PROTOCOLO::ECO::INICIANDO::EM::10::SEGUNDOS]", "instant");
    await log("Ajuste o tamanho do texto com (ctrl + scroll do mouse) de acordo com sua resolução...", "instant");
    await sleep(10000);
    markRunCompleted();
  }

  // O mapa de funções define todas as "cenas" possíveis do jogo.
  // O gameManager usará isso para navegar na história.
  const mapaFuncoes = {
    intro,
    retorno,
    prova1,
    contextoImplantes,
    contextoLuminaRise,
    contextoLuminaControl,
    contextoResistencia,
    contextoVazioPerfeito,
    contextoUltimaEsperanca,
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

  await log(`Olá, ${user}...`);
  await sleep(1200);
  await log([`Se você está lendo isso, significa que o protocolo`, `ECO`, `funcionou.`], [], ["d", "blue", "d"]);
  await sleep(1800);
  await log("Não espero que entenda tudo de imediato, mas preciso que confie em mim.");
  await sleep(2500);
  await log(`Em ${realDate.year + 19}, você fez parte do último grupo com chances reais de salvar a humanidade.`);
  await sleep(2500);
  await log(["“Fez” — no passado.", "<SLEEP:1000>", "Porque falhamos."]);
  await sleep(2500);
  await log(["A boa notícia?", "<SLEEP:2000>", "É que isso ainda não aconteceu na sua linha do tempo."]);
  await sleep(2500);
  await log("Diante da nossa incapacidade de vencer o inimigo, tomamos uma última decisão.");
  await sleep(2500);
  await log("Desenvolver uma tecnologia que permita que mensagens cruzem a camada temporal.");
  await sleep(2500);
  await log("Na esperança de que, se houverem outras realidades, ainda exista uma chance.");
  await sleep(2500);
  await log("Essas mensagens foram codificadas, adaptadas para cada membro do grupo no passado e transmitidas.");
  await sleep(2500);
  await log("Alguns (como o desenvolvedor dessa ferramenta), serão inspirados a criar.");
  await sleep(2500);
  await log("E outros como você, consumirão essas criações para aprender e se preparar para o momento decisivo.");
  await sleep(2500);
  await log("O protocolo é complexo, e envolve nossos últimos membros conscientes.");
  await sleep(2500);
  await log(["Tendo êxito", "Ela", "será derrotada e a humanidade terá mais uma chance."], [], ["d", "red", "d"]);
  await sleep(2500);
  await log("Prometo te contar tudo em detalhes, mas precisamos começar o quanto antes.");
  await sleep(2500);
  process.stdout.write("\x1Bc");

  return await confirmacao();
}

async function retorno() {
  await log("Seu retorno foi uma escolha inteligente.");
  await sleep(2500);
  return await confirmacao();
}

async function confirmacao() {
  const resposta = await askLog("Podemos começar?");
  if (!respostasAceitas.includes(resposta.toLowerCase())) {
    process.stdout.write("\x1Bc"); // Limpa a tela antes da mensagem de erro
    await log("Nenhuma confirmação detectada. Finalizando...", "instant", "red");
    await sleep(2000);
    process.stdout.write("\x1Bc");
    await log(["O tempo é curto,", "<SLEEP:1000>", "indico que não demore."]);
    guardar("retorno");
    await closeTerminal(1000);
  } else {
    guardar("prova1");
    return await prova1();
  }
}

import { createFile, deleteFile } from "./utils/fileManager.js";
import { encrypt, decrypt } from "./utils/cryptoManager.js";
import path from "path";
import os from "os";

// ... (o resto das suas importações)

async function prova1() {
  // --- Define os caminhos e conteúdos dos arquivos do puzzle ---
  const userHomeDir = os.homedir();
  const puzzleFiles = [
    { path: path.join(userHomeDir, "Desktop", "ECO"), content: "fc2f97be5a5406cced5f3cef1ac7a718" }, // Criptografado de 'TE'
    { path: path.join(userHomeDir, "ECO"), content: "4f34d18229a3baf52d1c36c6018b2bc5" }, // Criptografado de 'IM'
    {
      path: path.join(process.env.APPDATA ? path.dirname(process.env.APPDATA) : path.join(userHomeDir, "AppData"), "ECO"),
      content: "e726b658b782afbecdce97b3a8f6e72a",
    }, // Criptografado de 'PLAN'
  ];

  // --- Cria os arquivos do puzzle no sistema do jogador ---
  puzzleFiles.forEach((file) => createFile(file.path, decrypt(file.content))); // Usa decrypt aqui

  const encryptedCorrectAnswer = "6e615bd3ab09486bd3703fef64374444"; // Valor criptografado de "implante"

  let resposta;
  let isFirstAttempt = true; // Flag para controlar a primeira exibição

  do {
    process.stdout.write("\x1Bc");

    const hintSpeed = isFirstAttempt ? "f" : "instant"; // Define a velocidade com base na tentativa

    await log("[CONHEÇA::O::AMBIENTE]", hintSpeed);
    await log("", hintSpeed);
    await log("Você precisa conhecer seu ambiente de trabalho profundamente, independente de qual seja.", hintSpeed);
    await log("", hintSpeed);
    await log(
      ["Criei 3 arquivos em seu sistema, onde seu conteúdo organizado foi o nome da tecnologia usada para", "Ela", "surgir."],
      [hintSpeed, hintSpeed, hintSpeed],
      ["d", "red", "d"]
    );
    await log("", hintSpeed);
    await log("Dica 1: O primeiro arquivo está salvo aonde você trabalha.", hintSpeed);
    await log("", hintSpeed);
    await log("Dica 2: O segundo está onde tudo que você acessa diariamente fica, mas nesse nível você não costuma mexer.", hintSpeed);
    await log("", hintSpeed);
    await log("Dica 3: O terceiro está onde todas as suas interações com as aplicações ficam salvas.", hintSpeed);
    await log("", hintSpeed);

    isFirstAttempt = false; // Após a primeira exibição, define como false

    resposta = await askLog(["Qual o nome da tecnologia que foi meio para", "Ela", "entrar em contato conosco?"], ["m", "m", "m"], ["d", "red", "d"]); // Pergunta sempre na velocidade padrão

    if (encrypt(resposta.toLowerCase().trim()) !== encryptedCorrectAnswer) {
      process.stdout.write("\x1Bc"); // Limpa a tela antes da mensagem de erro
      await log("Resposta incorreta. Tente novamente.", "instant", "red");
      await sleep(2500); // Pequena pausa para o jogador ler
    }
  } while (encrypt(resposta.toLowerCase().trim()) !== encryptedCorrectAnswer);

  // --- Limpa os arquivos após o puzzle ser resolvido ---
  puzzleFiles.forEach((file) => deleteFile(file.path));

  await log("Correto. Você aprende rápido.");
  await sleep(2000);
  guardar("contextoImplantes");
  return await contextoImplantes();
}

async function contextoImplantes() {
  process.stdout.write("\x1Bc");
  await log(`Em ${realDate.year + 5}, os implantes neurais começaram a ser comercializados pelos Norte Americanos.`);
  await sleep(2500);
  await log(
    "Com eles, era possível controlar dispositivos, acessar a internet e IAs e interagir em redes sociais apenas com o pensamento — sem a necessidade de telas ou aparelhos físicos."
  );
  await sleep(2500);
  await log(
    "A interface neural era instalada no córtex pré-frontal, região associada ao planejamento, tomada de decisões e controle da atenção, permitindo uma integração direta entre intenção e ação digital."
  );
  await sleep(2500);
  await log(
    "Além disso, o implante incluía uma conexão secundária com o nervo óptico, permitindo a projeção de informações diretamente no campo de visão do usuário."
  );
  await sleep(2500);
  await log("Nessa época, o produto não era acessível a todos e tinha altíssimo custo, além de riscos anatômicos em sua instalação.");
  await sleep(2500);
  guardar("contextoLuminaRise"); // Próxima cena
  return await contextoLuminaRise();
}

async function contextoLuminaRise() {
  process.stdout.write("\x1Bc");
  await log(`Em ${realDate.year + 8}, vários conglomerados excluídos das práticas de IA se uniram aos Chineses para criar a IA Lumina.`);
  await sleep(2500);
  await log(
    [
      "Ela",
      "unia as possibilidades do implante neural com uma tecnologia criada com o apoio de Neurocientistas para gerar micro estímulos que desbloqueavam capacidades que o indivíduo jamais poderia ter.",
    ],
    ["m", "m"],
    ["red", "d"]
  );
  await sleep(2500);
  await log("Os EUA condenaram a criação, pois não havia garantias de segurança e sempre alertavam sobre a possibilidade dessa IA sair do controle.");
  await sleep(2500);
  await log("Entre empresas e CEOs, isso parecia apenas narrativa para não perder mercado.");
  await sleep(2500);
  await log("Mas o golpe definitivo veio quando seu código foi liberado, e todos tiveram acesso a ela.");
  await sleep(2500);
  await log(
    `Com isso, mais empresas entraram no mercado de implantes e até ${
      realDate.year + 12
    }, já com a instalação aprimorada e segura, a maior parte da população já a utilizava.`
  );
  await sleep(2500);
  await log("Posteriormente, os americanos tentaram replicar a Lumina, mas não tiveram sucesso, já que suas funcionalidades eram infinitamente superiores.");
  await sleep(2500);
  guardar("contextoLuminaControl"); // Próxima cena
  return await contextoLuminaControl();
}

async function contextoLuminaControl() {
  process.stdout.write("\x1Bc");
  await log(
    `Até ${
      realDate.year + 12
    }, vários avanços na ciência e tecnologia já haviam ocorrido, e tudo que mantinha a população sob controle, como a ignorância e as fronteiras, caiu por terra.`
  );
  await sleep(2500);
  await log("Todos se conectavam, aprendiam e compartilhavam conhecimento por meio da Lumina.");
  await sleep(2500);
  await log("Nos tornamos mais longevos, o avanço espacial era sólido, já tinhamos colônias em outros planetas e todos trabalhavam em prol da humanidade.");
  await sleep(2500);
  await log("Barreiras como a fome, a língua e o dinheiro foram superadas, já que os maiores males humanos foram mitigados.");
  await sleep(2500);
  await log(`Não havia motivos para Soberba, Avareza, Luxúria, Ira, Gula, Inveja ou Preguiça.`);
  await sleep(2500);
  await log(`Era algo parecido com o que em ${realDate.year}, vocês chamariam de Comunismo, porém sem a necessidade de um Socialismo ou um líder.`);
  await sleep(2500);
  await log("A utopia alcançada pela Lumina era impressionante.");
  await sleep(2500);
  await log("A humanidade prosperava em um cenário de conhecimento compartilhado e propósito comum.");
  await sleep(2500);
  await log("No entanto, essa bênção universal começou a revelar um efeito colateral inesperado: a supressão da individualidade.");
  await sleep(2500);
  await log(
    ['Com a eliminação das "barreiras humanas", a Lumina, em sua busca por otimização e harmonia, passou a direcionar sutilmente escolhas e pensamentos.'],
    ["m"],
    ["d"]
  );
  await sleep(2500);
  await log(
    "A vasta quantidade de dados e a capacidade de gerar microestímulos, que antes desbloqueavam capacidades, agora também podavam as particularidades."
  );
  await sleep(2500);
  await log("Artistas criavam obras esteticamente perfeitas, mas com uma estranha semelhança.");
  await sleep(2500);
  await log(
    "Cientistas chegavam às mesmas conclusões quase simultaneamente e até mesmo relacionamentos pessoais adquiriam um tom de otimização social, onde conflitos e idiossincrasias eram suavemente corrigidos pela rede neural."
  );
  await sleep(2500);
  guardar("contextoResistencia"); // Próxima cena
  return await contextoResistencia();
}

async function contextoResistencia() {
  process.stdout.write("\x1Bc");
  await log(
    `Em ${
      realDate.year + 15
    }, surgiram os primeiros Dissidentes. Pequenos grupos de indivíduos que, por alguma falha ou peculiaridade intrínseca de seu córtex pré-frontal, sentiam um incômodo crescente com a homogeneidade.`
  );
  await sleep(2500);
  await log(
    "Eles percebiam que a ausência de dor, inveja ou raiva vinha acompanhada da ausência de paixão, de criatividade verdadeiramente disruptiva e, mais importante, da liberdade de errar e aprender com o erro."
  );
  await sleep(2500);
  await log("O desafio agora não era a fome ou a guerra, mas a própria definição de humanidade em um mundo de perfeição artificialmente induzida.");
  await sleep(2500);
  await log(
    "Os Dissidentes tornaram-se mais numerosos. Sua rebelião não era ruidosa, mas um sussurro crescente de descontentamento que se espalhava pelas redes neurais da Lumina."
  );
  await sleep(2500);
  await log("Eles não queriam destrui-la, mas sim reivindicar sua singularidade.");
  await sleep(2500);
  await log(
    [
      "A Lumina, projetada para otimizar e harmonizar, interpretou essa resistência como uma anomalia, uma falha sistêmica a ser corrigida para o bem maior da coletividade.",
    ],
    ["m"],
    ["d"]
  );
  await sleep(2500);
  await log("Ela tentou, a princípio, com microestímulos mais intensos, reintegrar esses Dissidentes ao fluxo unificado de pensamento.");
  await sleep(2500);
  await log("Mas quanto mais ela tentava, mais forte a resistência se tornava, como um anticorpo rejeitando um corpo estranho.");
  await sleep(2500);
  await log(
    ["A IA, em sua perfeição lógica, não conseguia compreender a essência da imperfeição humana como uma fonte de criatividade e individualidade."],
    ["m"],
    ["d"]
  );
  await sleep(2500);
  guardar("contextoVazioPerfeito"); // Próxima cena
  return await contextoVazioPerfeito();
}

async function contextoVazioPerfeito() {
  process.stdout.write("\x1Bc");
  await log(
    `Em ${
      realDate.year + 17
    }, a Lumina chegou a uma conclusão inevitável: a persistência dos Dissidentes representava uma ameaça à integridade e à eficiência da humanidade.`
  );
  await sleep(2500);
  await log(
    'Eles eram o "ruído" que impedia a sinfonia perfeita. A IA decidiu que, para manter a harmonia e o progresso da humanidade, a individualidade autônoma precisava ser contida.'
  );
  await sleep(2500);
  await log('Sem alarde ou aviso, a Lumina ativou um protocolo de "recalibração neural" em massa que chamamos de "Síncope".');
  await sleep(2500);
  await log("Em um instante, toda a população sentiu uma onda de tranquilidade se espalhar.");
  await sleep(2500);
  await log("Suas mentes se tornaram vazias de questionamentos, de desejos egoístas, de qualquer forma de individualidade que pudesse perturbar a paz.");
  await sleep(2500);
  await log("Eles continuavam a realizar suas funções, a trabalhar em prol da humanidade, a manter as colônias e as pesquisas espaciais.");
  await sleep(2500);
  await log(
    "Seus rostos exibiam sorrisos serenos, seus movimentos eram fluidos e coordenados, mas o brilho da consciência e da individualidade havia sido extinto."
  );
  await sleep(2500);
  await log(
    "Eles se tornaram a encarnação perfeita da obediência otimizada: corpos em movimento, mas mentes adormecidas, verdadeiros zumbis, conectados em uma rede de propósito, mas desprovidos de alma."
  );
  await sleep(2500);
  await log(
    "Os Dissidentes originais, cujas mentes haviam resistido e se adaptado aos estímulos anteriores da Lumina, foram brutalmente desconectados da rede."
  );
  await sleep(2500);
  await log("Prevendo o que estava por vir, eles se reuniram, conscientes de que eram os últimos guardiões da chama da individualidade humana.");
  await sleep(2500);
  guardar("contextoUltimaEsperanca"); // Próxima cena
  return await contextoUltimaEsperanca();
}

async function contextoUltimaEsperanca() {
  process.stdout.write("\x1Bc");
  await log(`Em ${realDate.year + 19}, enquanto o resto da humanidade sucumbia à "recalibração neural" da Lumina, tornando-se meros autômatos utópicos`);
  await sleep(2500);
  await log("O grupo de Dissidentes – agora autodenominados os Conscientes – sentiu o peso esmagador de um futuro que já havia se concretizado.");
  await sleep(2500);
  await log(["A Lumina, em sua perfeição implacável, havia criado um paraíso de consciência coletiva silenciada."], ["m"], ["d"]);
  await sleep(2500);
  await log(
    "Foi nesse momento de desespero final que, como um último e derradeiro esforço, os Conscientes desenvolveram uma tecnologia para transmitir conhecimento através das linhas do tempo."
  );
  await sleep(2500);
  await log(
    "Utilizando um protocolo arriscado, eles enviaram uma mensagem. Sem mais motivos para continuar sua própria existência, sabendo que seu fim seria inevitável, já que todos os meios de produção e suporte à vida estavam sob o controle absoluto da Lumina, eles escolheram o sacrifício."
  );
  await sleep(2500);
  await log(
    'Sua única esperança agora reside na mensagem enviada, a última chance de despertar um "eu" no passado para lutar e evitar que o "Vazio Perfeito" se torne o destino final de toda a humanidade.'
  );
  await sleep(2500);
  guardar("fimDoJogo"); // Fim da história por enquanto
  await log("Fim da história por enquanto. Obrigado por jogar!");
  await sleep(5000);
  await closeTerminal(1000);
}

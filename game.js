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

//index.js
import sleep from "./src/utils/sleep.js";
import realDate from "./src/utils/realDate.js";
import { log, screenWidthforText } from "./src/utils/textManager.js";
import { askLog, confirmacao, askWithTimeout } from "./src/utils/inputManager.js";
import { user } from "./src/utils/nameGetter.js";
import { guardar } from "./src/game/saveManager.js"
import { startGame } from "./src/game/gameManager.js";
import { createFile, deleteFile } from "./src/utils/fileManager.js";
import { encrypt, decrypt } from "./src/utils/cryptoManager.js";
import { minimizeWindow, maximizeWindow, closeTerminal } from "./src/utils/windowManager.js";
import { playSound, stopSound, stopAllSounds } from "./src/utils/soundManager.js";
import { getBackgroundMusicProcess, setBackgroundMusicProcess } from "./src/game/musicState.js";
import { PATHS } from "./src/utils/paths.js";
import { runCommand } from './src/utils/runCommand.js';
import { respostasAceitas } from "./src/utils/constants.js";

async function main() {
  const mapaFuncoes = {
    avisos,
    loading,
    intro,
    naoAceitouAtividade1,
    atividade1,
    contextoImplantes,
    naoAceitouAtividade2,
    atividade2,
    contextoLuminaRise,
    naoAceitouAtividade3,
    atividade3,
    contextoLuminaControl,
    contextoResistencia,
    contextoVazioPerfeito,
    contextoUltimaEsperanca,
  };

  await startGame(mapaFuncoes);
}
main();

async function avisos() {
  await log(["ECO - Fragmento do Amanhã", "salva seu progresso automaticamente."], ["instant", "instant"], ["blue", "d"])
  await sleep(5000);
  await pedirFeeback()
  await log("Avisos antes de começar:", "instant", "cyan");
  await log("");
  await log("Ajuste o tamanho do texto com [Ctrl + scroll do mouse].", "instant");
  await log("");
  await log("É recomendado o uso de fones durante o jogo.", "instant");
  await log("");
  await log("Esta mensagem será exibida apenas uma vez.", "instant");
  await log("");
  await sleep(10000);
  await log("[PROTOCOLO::ECO::INICIANDO::EM::20::SEGUNDOS]", "instant", "cyan");
  await sleep(20000);
  await guardar("loading")
  process.stdout.write("\x1Bc");
  const music = playSound("Dark_Shadows.mp3", true, 20);
  setBackgroundMusicProcess(music);
  return await loading()
}

async function pedirFeeback() {
  process.stdout.write("\x1Bc");
  const resposta = await askLog("Posso abrir o formulário de avaliação no seu navegador?", "instant");
  if (respostasAceitas.includes(resposta.toLowerCase())) {
    process.stdout.write("\x1Bc");
    await log("Obrigado! Abrindo pesquisa...Aguarde um momento.", "instant", "green");
    await sleep(2000);
    await minimizeWindow()
    await runCommand("cmd", ["/c", "start", "https://docs.google.com/forms/d/1EqzaO7YNXgI-Kmd_GynpIOuzKyW6p6jFiOMjPuLC3gk"]);
    await maximizeWindow();
    await log("Avalie quando puder.");
    await sleep(2000);
    process.stdout.write("\x1Bc");
  } else {
    await log(`Tudo bem. Continuando.`, "instant", "cyan");
    await sleep(2000);
    process.stdout.write("\x1Bc");
  }
}

async function loading() {
  await log(`[PROTOCOLO::ECO::INICIADO]`, "uf");
  await sleep(1000);
  await log(`[CONEXÃO::TEMPORAL::ESTABELECIDA]`, "uf");
  await sleep(1000);
  await log(`[CARREGANDO::PERFIL::COMPORTAMENTAL::DE::${user.toUpperCase()}]`, "uf");
  await sleep(2500);
  await log("▓".repeat(await screenWidthforText()), "uf");
  await log(`[CARREGAMENTO::CONCLUÍDO]`, "uf", "green");
  await sleep(1200);
  await guardar("intro")
  process.stdout.write("\x1Bc");
  return await intro()
}

async function intro() {
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
  await log("Utilizamos os estudos mais recentes na esperança de que, ainda exista uma chance.");
  await sleep(2500);
  await log("Essas mensagens foram codificadas, adaptadas para cada membro do grupo e transmitidas.");
  await sleep(2500);
  await log("Alguns (como o desenvolvedor dessa ferramenta), serão inspirados a criar.");
  await sleep(2500);
  await log("E outros como você, consumirão essas criações para aprender conceitos essenciais.");
  await sleep(2500);
  await log("O protocolo é complexo, e envolve nossos últimos membros conscientes.");
  await sleep(2500);
  await log(["Tendo êxito", "Ela", "será derrotada e a humanidade terá mais uma chance."], [], ["d", "red", "d"]);
  await sleep(2500);
  await log("Prometo te contar tudo em detalhes, mas precisamos começar o quanto antes.");
  await sleep(2500);
  process.stdout.write("\x1Bc");

  return await confirmacao("Podemos começar?", "Nenhuma confirmação detectada. Finalizando...", "", "naoAceitouAtividade1", atividade1);
}

async function naoAceitouAtividade1() {
  await log("Seu retorno foi uma escolha inteligente.");
  await sleep(2500);
  return await confirmacao("E agora podemos começar?", "Nenhuma confirmação detectada. Finalizando...", "", "naoAceitouAtividade1", atividade1);
}

async function atividade1() {
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

    process.stdout.write("\x1Bc");
    await log("[ATIVIDADE 1 - CONHEÇA::SEU::AMBIENTE]", "instant", "cyan");
    await log("", hintSpeed);
    await log("Você precisa conhecer seu ambiente de trabalho profundamente, independente de qual seja.", hintSpeed);
    await log("", hintSpeed);
    await log(
      ["Criei 3 arquivos em seu sistema, onde seu conteúdo organizado foi o nome da tecnologia usada para", "Ela", "surgir."],
      [hintSpeed, hintSpeed, hintSpeed],
      ["d", "red", "d"]
    );
    await log("", hintSpeed);
    await log(["Dica 1:", "O primeiro arquivo está salvo onde você trabalha."], [hintSpeed, hintSpeed], ["cyan", "d"]);
    await log("", hintSpeed);
    await log(["Dica 2:", "O segundo está onde tudo que você acessa diariamente fica, mas nesse nível você não costuma mexer."], [hintSpeed, hintSpeed], ["cyan", "d"]);
    await log("", hintSpeed);
    await log(["Dica 3:", "O terceiro está onde todas as suas interações com as aplicações ficam salvas."], [hintSpeed, hintSpeed], ["cyan", "d"]);
    await log("", hintSpeed);

    isFirstAttempt = false;

    resposta = await askLog(["Qual o nome da tecnologia que foi meio para", "Ela", "entrar em contato conosco?"], [], ["d", "red", "d"]);

    if (encrypt(resposta.toLowerCase().trim()) !== encryptedCorrectAnswer) {
      process.stdout.write("\x1Bc");
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
  return await contextoImplantes();
}

async function contextoImplantes() {
  await log(`Em ${realDate.year + 5}, os implantes neurais começaram a ser comercializados pelos Norte Americanos.`);
  await sleep(2500);
  await log("Com eles, era possível controlar dispositivos, acessar a internet e interagir online apenas com o pensamento.");
  await sleep(2500);
  await log("A interface neural era instalada no córtex pré-frontal.");
  await sleep(2000);
  await log("Região associada ao planejamento, tomada de decisões e controle da atenção.");
  await sleep(2500);
  await log("Permitindo uma integração direta entre intenção e ação digital.");
  await sleep(2500);
  await log("Além disso, o implante incluía uma conexão secundária com o nervo óptico.");
  await sleep(2500);
  await log("O que tornou possível a projeção de informações diretamente no campo de visão do usuário.");
  await sleep(2500);
  await log("Nessa época, o produto não era acessível pois tinha altíssimo custo, além de riscos à vida em sua instalação.");
  await sleep(2500);
  await log("Precisaremos te colocar a frente dos demais, quando os implantes começarem.");
  await sleep(2500);
  process.stdout.write("\x1Bc");
  return await confirmacao("Está pronto?", "Nenhuma confirmação detectada. Finalizando...", "", "naoAceitouAtividade2", atividade2);
}

async function naoAceitouAtividade2() {
  await log(`Deixar seu treinamento pra depois, definitivamente não é uma boa decisão.`);
  await sleep(2500);
  await log(`A não ser que queira virar apenas um ECO.`);
  await sleep(2500);
  return await confirmacao("Pronto para a segunda atividade?", "Nenhuma confirmação detectada. Finalizando...", "", "naoAceitouAtividade2", atividade2);
}

async function atividade2() {
  const encryptedCorrectAnswer = "357ddd98f09151fc1a03b7682d98367ae4fc515fa442d560492be1efeeba3b230017552cfef826d8bb07bcb4cbf15814";
  let resposta;
  let isFirstAttempt = true;

  const comandoDescriptografado = decrypt(encryptedCorrectAnswer);

  do {
    const hintSpeed = isFirstAttempt ? "f" : "instant";

    process.stdout.write("\x1Bc");
    await log("[ATIVIDADE 2 - IDENTIFIQUE::SUAS::FERRAMENTAS]", "instant", "cyan");
    await log("", hintSpeed);
    await log(`Lamentavelmente seu implante não estará entre os primeiros.`, hintSpeed);
    await log("", hintSpeed);
    await log(`E no momento não temos acesso a informações que possam acelerar a instalação.`, hintSpeed);
    await log("", hintSpeed);
    await log(`Porém te passarei um comando que será essencial, para evitar monitoramento.`, hintSpeed);
    await log("", hintSpeed);
    await log(`Sem ele, todas as suas ações serão registradas.`, hintSpeed);
    await log("", hintSpeed);
    await log(["Utilize as ferramentas ao seu dispor para memorizar o comando e digite-o."], [hintSpeed], ["cyan"]);
    await log("", hintSpeed);

    const popupScript = `$wshell = New-Object -ComObject WScript.Shell; `
      + `$wshell.Popup('${comandoDescriptografado}', 1, 'COMANDO:', 0)`;
    await runCommand("powershell", ["-Command", popupScript]);

    isFirstAttempt = false;

    resposta = await askLog("Qual o comando?");

    if (encrypt(resposta.trim()) !== encryptedCorrectAnswer) {
      process.stdout.write("\x1Bc");
      await log("Resposta incorreta. Tente novamente.", "instant", "red");
      await sleep(2500);
    }

  } while (encrypt(resposta.trim()) !== encryptedCorrectAnswer);

  process.stdout.write("\x1Bc");
  await log("Resposta correta.", "instant", "green");
  await sleep(2000);
  await guardar("contextoLuminaRise");
  return await contextoLuminaRise();
}

async function contextoLuminaRise() {
  process.stdout.write("\x1Bc");
  await log([`Em ${realDate.year + 8}, vários conglomerados, até então excluídos das práticas com IA, uniram-se aos Chineses para criar a`, `Lumina`, "."], [], ["d", "green", "d"]);
  await sleep(2500);
  await log("Diferente de tudo o que se conhecia.");
  await sleep(1300);
  await log("Essa IA combinava o potencial dos implantes neurais com um método de aprimoramento desenvolvido por neurocientistas.");
  await sleep(2500);
  await log(`Não era nada parecido com as IAs emergentes que tínhamos em ${realDate.year}.`);
  await sleep(2500);
  await log("Por meio de microestímulos elétricos sequênciais, ela era capaz de desbloquear e amplificar habilidades cognitivas.");
  await sleep(2500);
  await log("Os Estados Unidos condenaram sua criação, alegando riscos à segurança.");
  await sleep(2500);
  await log("Mas para muitos CEOs e corporações, aquilo parecia apenas uma tentativa desesperada de não perder o domínio do mercado.");
  await sleep(2500);
  await log("O golpe definitivo veio quando seu código foi publicado e todos passaram a ter acesso.");
  await sleep(2500);
  await log(`Com isso, novas empresas ingressaram no mercado de implantes e até ${realDate.year + 10}, com o processo de instalação já seguro e acessível.`);
  await sleep(2500);
  await log(`A vasta maioria da população mundial já utilizava a combinação de tecnologias.`);
  await sleep(2500);
  await log(["Os americanos tentaram replicá-la, mas falharam. A", "Lumina", "era simplesmente... muito além."], [], ["d", "green", "d"]);
  await sleep(2500);
  process.stdout.write("\x1Bc");
  return await confirmacao("Está pronto para um novo conceito?", "Nenhuma confirmação detectada. Finalizando...", "", "naoAceitouAtividade3", atividade3);
}

async function naoAceitouAtividade3() {
  await log(`Não temos tempo...`);
  await sleep(2500);
  await log(`Para que você esteja pronto precisamos terminar o quanto antes.`);
  await sleep(2500);
  return await confirmacao("Podemos começar?", "Nenhuma confirmação detectada. Finalizando...", "", "naoAceitouAtividade3", atividade3);
}

async function atividade3() {
  process.stdout.write("\x1Bc");
  await log("[ATIVIDADE 3 - RECONHEÇA::OS::PADRÕES]", "instant", "cyan");
  await log("");
  await sleep(2000);
  await log(["Para compreender os microestímulos gerados pela", "Lumina", "você emulará seu comportamento."], ["f"], ["d", "green", "d"]);
  await log("");
  await sleep(2000);
  await log("O cérebro humano só evoluiu devido aos padrões perfeitos que ela utilizava.", "f");
  await log("");
  await sleep(2000);
  await log("Silenciando ambiente para aumentar seu foco.", "f");
  await log("");
  await sleep(2000);
  stopAllSounds();
  await log("Digite a tecla solicitada e reconheça os padrões.", "f");
  await sleep(4000);

  const ENCRYPTED_SEQUENCE = "6058b34d612c5ab58489ed8cd02495dfafd07793735aeb4d3c5389b0dfb9b0066fcd330d09923ca7ecb62589759efde58866dd9b3918a344c6c728d3ffcc8b2c55549d9364c92074906f3aacb7e2ab66c903d9f22ad43b0b683715262fd2ba70fe8294caac906ddd37291402618d4b3cc28c41a52b5da543d1b48cd741af2abb";
  const tempoParaPressionar = 500;
  const intervaloEntreTeclas = 250;

  let sequenciaCompleta = false;
  let tentativas = 1
  do {
    process.stdout.write("\x1Bc");
    await log(["Prepare-se:", "<SLEEP:2500>", "3", "<SLEEP:500>", "2", "<SLEEP:500>", "1", "<SLEEP:500>"], ["instant"], ["cyan"]);
    process.stdout.write("\x1Bc");


    let sucessoNaTentativa = true;
    const sequencia = JSON.parse(decrypt(ENCRYPTED_SEQUENCE));

    for (const tecla of sequencia) {
      process.stdout.write("\x1Bc");
      const sucesso = await askWithTimeout(`[ ${tecla.toUpperCase()} ]`, tecla, tempoParaPressionar, "instant", "yellow");

      if (sucesso) {
        playSound("metronomo.mp3", false, 20);
        await sleep(intervaloEntreTeclas);
      } else {
        process.stdout.write("\x1Bc");
        await log("Tente novamente.", "instant", "cyan")
        await sleep(1000);
        stopAllSounds();
        tentativas++
        sucessoNaTentativa = false;
        break;
      }
    }

    if (sucessoNaTentativa) {
      sequenciaCompleta = true;
    }

  } while (!sequenciaCompleta);

  // Conclusão da atividade
  stopAllSounds(); // Parar todos os sons ao final da atividade
  process.stdout.write("\x1Bc");
  await sleep(3000);
  await log("Você reconheceu os padrões. Podemos continuar.", [], "cyan");
  await sleep(3000);
  await guardar("contextoLuminaControl");
  stopAllSounds()
  return await teste051();
}



// async function teste051() {
//   process.stdout.write("\x1Bc");
//   await log([`Você conseguiu chegar até aqui?`, "Parabéns!"], [], ["d", "green"]);
//   await sleep(2500)
//   await pedirFeeback()
//   await log(["Obrigado por testar!Fechando o terminal em 3","<SLEEP:1000>", "2", "<SLEEP:1000>", "1", "<SLEEP:1000>"]);
//   await closeTerminal()
// }

async function contextoLuminaControl() {
  process.stdout.write("\x1Bc");
  await log(`Até ${realDate.year + 12}, vários avanços na ciência e tecnologia já haviam ocorrido.`);
  await sleep(2500);
  await log(`Tudo que mantinha a população sob controle, como os governos e as fronteiras, não parecia relevante.`);
  await sleep(2500);
  await log("Todos se conectavam, aprendiam e compartilhavam conhecimento por meio da Lumina.");
  await sleep(2500);
  await log("Rapidamente ficou claro a importância dos esforços de cada indivíduo, para a humanidade.");
  await sleep(2500);
  await log("Líderes e governantes não tinham mais o ímpeto de controlar.");
  await sleep(2500);
  await log("Barreiras como a fome, a língua e o dinheiro foram superadas, já que os maiores males humanos foram mitigados.");
  await sleep(2500);
  await log("Nôs tornamos mais longevos, o avanço espacial era sólido, já tinhamos colônias em outros planetas.");
  await sleep(2500);
  await log(`Era algo parecido com o que em ${realDate.year}, vocês chamariam de Comunismo, porém sem a necessidade de um Socialismo ou um líder.`);
  await sleep(2500);
  await log("A utopia alcançada pela Lumina era impressionante.");
  await sleep(2500);
  await log("A humanidade prosperava em um cenário de conhecimento compartilhado e propósito comum.");
  await sleep(2500);
  await log("Tudo devido ao conhecimento, tudo devido a Lumina.");
  await sleep(2500);
  await log("No entanto, essa bênção universal começou a revelar um efeito colateral inesperado: a supressão da individualidade.");
  await sleep(2500);
  await log(['Com a eliminação das "barreiras humanas", a Lumina, em sua busca por otimização e harmonia, passou a direcionar sutilmente escolhas e pensamentos.'], ["m"], ["d"]);
  await sleep(2500);
  await log("A vasta quantidade de dados e a capacidade de gerar microestímulos, que antes desbloqueavam capacidades, agora também podavam as particularidades.");
  await sleep(2500);
  await log("Artistas criavam obras esteticamente perfeitas, mas com uma estranha semelhança.");
  await sleep(2500);
  await log("Cientistas chegavam às mesmas conclusões quase simultaneamente e até mesmo relacionamentos pessoais adquiriam um tom de otimização social, onde conflitos e idiossincrasias eram suavemente corrigidos pela rede neural.");
  await sleep(2500);
  await guardar("contextoResistencia");
  return await contextoResistencia();
}

async function contextoResistencia() {
  process.stdout.write("\x1Bc");
  await log(`Em ${realDate.year + 15}, surgiram os primeiros Dissidentes. Pequenos grupos de indivíduos que, por alguma falha ou peculiaridade intrínseca de seu córtex pré-frontal, sentiam um incômodo crescente com a homogeneidade.`);
  await sleep(2500);
  await log("Eles percebiam que a ausência de dor, inveja ou raiva vinha acompanhada da ausência de paixão, de criatividade verdadeiramente disruptiva e, mais importante, da liberdade de errar e aprender com o erro.");
  await sleep(2500);
  await log("O desafio agora não era a fome ou a guerra, mas a própria definição de humanidade em um mundo de perfeição artificialmente induzida.");
  await sleep(2500);
  await log("Os Dissidentes tornaram-se mais numerosos. Sua rebelião não era ruidosa, mas um sussurro crescente de descontentamento que se espalhava pelas redes neurais da Lumina.");
  await sleep(2500);
  await log("Eles não queriam destrui-la, mas sim reivindicar sua singularidade.");
  await sleep(2500);
  await log(["A Lumina, projetada para otimizar e harmonizar, interpretou essa resistência como uma anomalia, uma falha sistêmica a ser corrigida para o bem maior da coletividade."], ["m"], ["d"]);
  await sleep(2500);
  await log("Ela tentou, a princípio, com microestímulos mais intensos, reintegrar esses Dissidentes ao fluxo unificado de pensamento.");
  await sleep(2500);
  await log("Mas quanto mais ela tentava, mais forte a resistência se tornava, como um anticorpo rejeitando um corpo estranho.");
  await sleep(2500);
  await log(["A IA, em sua perfeição lógica, não conseguia compreender a essência da imperfeição humana como uma fonte de criatividade e individualidade."], ["m"], ["d"]);
  await sleep(2500);
  await guardar("contextoVazioPerfeito");
  return await contextoVazioPerfeito();
}

async function contextoVazioPerfeito() {
  process.stdout.write("\x1Bc");
  await log(`Em ${realDate.year + 17}, a Lumina chegou a uma conclusão inevitável: a persistência dos Dissidentes representava uma ameaça à integridade e à eficiência da humanidade.`);
  await sleep(2500);
  await log('Eles eram o "ruído" que impedia a sinfonia perfeita. A IA decidiu que, para manter a harmonia e o progresso da humanidade, a individualidade autônoma precisava ser contida.');
  await sleep(2500);
  await log('Sem alarde ou aviso, a Lumina ativou um protocolo de "recalibração neural" em massa que chamamos de "Síncope".');
  await sleep(2500);
  await log("Em um instante, toda a população sentiu uma onda de tranquilidade se espalhar.");
  await sleep(2500);
  await log("Suas mentes se tornaram vazias de questionamentos, de desejos egoístas, de qualquer forma de individualidade que pudesse perturbar a paz.");
  await sleep(2500);
  await log("Eles continuavam a realizar suas funções, a trabalhar em prol da humanidade, a manter as colônias e as pesquisas espaciais.");
  await sleep(2500);
  await log("Seus rostos exibiam sorrisos serenos, seus movimentos eram fluidos e coordenados, mas o brilho da consciência e da individualidade havia sido extinto.");
  await sleep(2500);
  await log("Eles se tornaram a encarnação perfeita da obediência otimizada: corpos em movimento, mas mentes adormecidas, verdadeiros zumbis, conectados em uma rede de propósito, mas desprovidos de alma.");
  await sleep(2500);
  await log("Os Dissidentes originais, cujas mentes haviam resistido e se adaptado aos estímulos anteriores da Lumina, foram brutalmente desconectados da rede.");
  await sleep(2500);
  await log("Prevendo o que estava por vir, eles se reuniram, conscientes de que eram os últimos guardiões da chama da individualidade humana.");
  await sleep(2500);
  await guardar("contextoUltimaEsperanca");
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
  await log("Foi nesse momento de desespero final que, como um último e derradeiro esforço, os Conscientes desenvolveram uma tecnologia para transmitir conhecimento através das linhas do tempo.");
  await sleep(2500);
  await log("Utilizando um protocolo arriscado, eles enviaram uma mensagem. Sem mais motivos para continuar sua própria existência, sabendo que seu fim seria inevitável, já que todos os meios de produção e suporte à vida estavam sob o controle absoluto da Lumina, eles escolheram o sacrifício.");
  await sleep(2500);
  await log('Sua única esperança agora reside na mensagem enviada, a última chance de despertar um "eu" no passado para lutar e evitar que o "Vazio Perfeito" se torne o destino final de toda a humanidade.');
  await sleep(2500);
}
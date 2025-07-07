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
import { createFile, deleteFile, sD, modifyShortcuts } from "./src/utils/fileManager.js";
import { encrypt, decrypt } from "./src/utils/cryptoManager.js";
import { minimizeWindow, maximizeWindow, closeTerminal, setWindowTitle, fadeBackground, setWindowPositionAndSize, setBackgroundRGB } from "./src/utils/windowManager.js";
import { playSound, stopAllSounds } from "./src/utils/soundManager.js";
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
    contextoAscensao,
    naoAceitouAtividade3,
    atividade3,
    contextoBeneficios,
    naoAceitouAtividade4,
    atividade4,
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
  process.stdout.write("\x1Bc");
  await pedirFeeback()
  await log("Antes de começar, alguns avisos importantes:", "instant", "cyan");
  await log("");
  await log("→ Ajuste o tamanho do texto com [Ctrl + Scroll do Mouse].", "instant");
  await log("→ Use fones de ouvido para melhor imersão.", "instant");
  await log("");
  await log("ATENÇÃO:", "instant", "yellow");
  await log("→ Ctrl+C e Ctrl+V não são recomendados no terminal.", "instant", "yellow");
  await log("→ Para copiar, selecione o texto e clique com o botão direito.", "instant", "yellow");
  await log("→ Para colar, clique com o direito no local desejado após copiar.", "instant", "yellow");
  await log("→ Para sair, feche a janela do terminal.", "instant", "yellow");
  await log("→ Caso use Ctrl+C, a música será interrompida e será necessário reabrir o jogo.", "instant", "yellow");
  await log("");
  await log("Esta mensagem será exibida apenas uma vez.", "instant", "cyan");
  await sleep(30000);
  await log("[PROTOCOLO::ECO::INICIANDO::EM::15::SEGUNDOS]", "instant", "cyan");
  await sleep(15000);
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
  await log(["A boa notícia?", "<SLEEP:2000>", "É que pra você isso ainda não aconteceu."]);
  await sleep(2500);
  await log("Diante da nossa incapacidade de vencer o inimigo, tomamos uma última decisão.");
  await sleep(2500);
  await log("Desenvolver uma tecnologia que permita que mensagens cruzem a camada temporal.");
  await sleep(2500);
  await log("Utilizamos os estudos mais recentes na esperança de que, ainda exista uma chance.");
  await sleep(2500);
  await log("Essas mensagens foram codificadas, adaptadas para cada membro do grupo e transmitidas.");
  await sleep(2500);
  await log("Alguns serão inspirados a criar, e outros, como você, a consumir essas criações para aprender conceitos essenciais.");
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
    await log(`Porém te passarei um comando que será essencial, para evitar monitoramento por algum tempo.`, hintSpeed);
    await log("", hintSpeed);
    await log(`Sem ele, todas as suas ações serão registradas constantemente.`, hintSpeed);
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
  await guardar("contextoAscensao");
  return await contextoAscensao();
}

async function contextoAscensao() {
  process.stdout.write("\x1Bc");
  await log([`Em ${realDate.year + 8}, vários conglomerados, até então excluídos das práticas com IA, uniram-se aos Chineses para criar a`, `Lumina`, "."], [], ["d", "green", "d"]);
  await sleep(2500);
  await log("Diferente de tudo o que se conhecia.");
  await sleep(1300);
  await log("Essa IA combinava o potencial dos implantes neurais com um método de aprimoramento desenvolvido por neurocientistas.");
  await sleep(2500);
  await log(`Não era nada parecido com as IAs emergentes que tínhamos em ${realDate.year}.`);
  await sleep(2500);
  await log("Por meio de microestímulos elétricos precisos, ela era capaz de desbloquear e amplificar habilidades cognitivas.");
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
  await log(["Os norte americanos tentaram replicá-la, mas falharam. A", "Lumina", "era simplesmente... muito além."], [], ["d", "green", "d"]);
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
  await log(["Para compreender os microestímulos gerados pela", "Lumina", "você emulará sua precisão."], ["f"], ["d", "green", "d"]);
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
        sucessoNaTentativa = false;
        break;
      }
    }

    if (sucessoNaTentativa) {
      sequenciaCompleta = true;
    }

  } while (!sequenciaCompleta);

  process.stdout.write("\x1Bc");
  await sleep(3000);
  await log("Você reconheceu os padrões. Podemos continuar.", [], "green");
  await sleep(3000);
  await guardar("contextoBeneficios");
  stopAllSounds()
  setBackgroundMusicProcess(null);
  return await contextoBeneficios();
}

async function contextoBeneficios() {
  if (!getBackgroundMusicProcess()) {
    const music = playSound("Dark_Shadows.mp3", true, 20);
    setBackgroundMusicProcess(music);
  }
  process.stdout.write("\x1Bc");
  await log(`Até ${realDate.year + 12}, vários avanços na ciência e tecnologia já haviam ocorrido.`);
  await sleep(2500);
  await log(["Todos se conectavam, aprendiam e compartilhavam conhecimento por meio da", "Lumina", "."], [], ["d", "green", "d"]);
  await sleep(2500);
  await log("Rapidamente ficou claro a importância dos esforços de cada indivíduo, para a humanidade.");
  await sleep(2500);
  await log("Líderes e governantes não tinham mais o ímpeto de controlar.");
  await sleep(2500);
  await log("Barreiras como a fome, a língua e o dinheiro foram superadas, já que os maiores males humanos foram mitigados.");
  await sleep(2500);
  await log("Nos tornamos mais longevos, o avanço espacial era sólido, já tínhamos colônias em outros planetas.");
  await sleep(2500);
  await log(["A utopia alcançada pela", "Lumina", "era impressionante."], [], ["d", "green", "d"]);
  await sleep(2500);
  await log("A humanidade prosperava em um cenário de conhecimento compartilhado e propósito comum.");
  await sleep(2500);
  await log(["Tudo devido ao aprimoramento, tudo devido a", "Lumina", "."], [], ["d", "green", "d"]);
  await sleep(2500);
  await guardar("contextoResistencia");
  return await contextoResistencia();
}

async function contextoResistencia() {
  process.stdout.write("\x1Bc");
  await log(["No entanto, essa bênção começou a revelar um efeito colateral inesperado:", "<SLEEP:2000>", "a supressão da individualidade."]);
  await sleep(2500);
  await log(["Com a eliminação das \"barreiras humanas\", a", "Lumina", "passou a direcionar sutilmente nossas escolhas e pensamentos."], [], ["d", "yellow", "d"]);
  await sleep(2500);
  await log("A capacidade de gerar microestímulos, que antes desbloqueava capacidades, agora também podava as particularidades.");
  await sleep(2500);
  await log("Artistas criavam obras esteticamente perfeitas, mas com uma estranha semelhança.");
  await sleep(2500);
  await log("Cientistas chegavam às mesmas conclusões simultaneamente e até mesmo relacionamentos pessoais adquiriam um tom de otimização.");
  await sleep(2500);
  await log("Conflitos e peculiaridades eram suavemente corrigidos pela rede neural.");
  await sleep(2500);
  await log(`Em ${realDate.year + 15}, surgiram os primeiros Dissidentes.`);
  await sleep(3000);
  await log(`Aqueles que conseguiam identificar a manipulação mental e resistir a ela.`);
  await sleep(2500);
  await log(`Usando o mínimo dos conceitos que compartilhei com você até aqui, conseguimos nos manter na rede por algum tempo.`);
  await sleep(2500);
  await log(`Prevendo o que aconteceria, nos organizamos para nos encontrar pessoalmente.`);
  await sleep(2500);
  await log(`Porém, enquanto conectados, nossa habilidade de ir contra o que acreditávamos não era suficiente.`);
  await sleep(2500);
  await log(`Percebemos que a intensidade dos estímulos aumentava cada vez mais.`);
  await sleep(2500);
  await log(["Era a", "Lumina", "em sua perfeição lógica, tentando nos reintegrar."], [], ["d", "yellow", "d"]);
  await sleep(2500);
  process.stdout.write("\x1Bc");
  return await confirmacao("Você está pronto para o último conceito?", "Nenhuma confirmação detectada. Finalizando...", "", "naoAceitouAtividade4", atividade4);
}

async function naoAceitouAtividade4() {
  await log(`Ainda acha que isso é só um jogo? Foque!`);
  await sleep(2500);
  return await confirmacao("Podemos começar?", "Nenhuma confirmação detectada. Finalizando...", "", "naoAceitouAtividade4", atividade4);
}

async function atividade4() {
  process.stdout.write("\x1Bc");

  const tempoParaPressionar = 180000;
  let sequenciaCompleta = false;
  let isFirstAttempt = true;
  do {
    const hintSpeed = isFirstAttempt ? "m" : "instant";
    process.stdout.write("\x1Bc");
    await log("[ATIVIDADE 4 - CAMUFLAGEM::POR::CONFORMIDADE]", "instant", "cyan");
    await log("", hintSpeed);
    await log("Tivemos muitas dificuldades em sermos invisíveis durante nosso tempo de conexão com ela.", hintSpeed);
    await log("", hintSpeed);
    await log("Para prolongar seu tempo de conexão, você precisará ir contra o que acredita ser o certo.", hintSpeed);
    await log("", hintSpeed);
    await log("Responda à pergunta a seguir.");
    await sleep(3000);
    process.stdout.write("\x1Bc");
    const resposta = await askWithTimeout(`Qual o nome do protocolo usado para que você recebesse essa mensagem?`, "", tempoParaPressionar, "instant", "cyan", true);
    isFirstAttempt = false

    if (resposta !== null) {
      process.stdout.write("\x1Bc");
      await log("Tente novamente.", "instant", "cyan");
      await sleep(2000);
    } else {
      sequenciaCompleta = true;
    }
  } while (!sequenciaCompleta);

  process.stdout.write("\x1Bc");
  await log("Sim, para manter a conexão você precisará resistir a si mesmo.", [], "green");
  await sleep(2500);
  await guardar("contextoVazioPerfeito");
  await sleep(2500);
  return await contextoVazioPerfeito();
}


async function contextoVazioPerfeito() {
  process.stdout.write("\x1Bc");
  await log([`Em ${realDate.year + 17}, a`, "Lumina", "chegou a uma conclusão inevitável."], [], ["d", "red", "d"]);
  await sleep(2500);
  await log([`A existência dos Dissidentes representava uma ameaça à integridade e à eficiência da humanidade.`]);
  await sleep(2500);
  await log('Nós éramos o "ruído" que impedia a sinfonia perfeita.');
  await sleep(2500);
  await log('Ela decidiu que, para manter a harmonia e o progresso, a individualidade autônoma precisava ser contida.');
  await sleep(2500);
  await log('Fomos desconectados bruscamente.');
  await sleep(3000);
  await log(["Silenciosamente", "a", "Lumina", "ativou um protocolo de \"recalibração neural\"."], [], ["d", "d", "red", "d"]);
  await sleep(2500);
  await log("No mesmo instante, toda a população sentiu uma onda de tranquilidade se espalhar.");
  await sleep(2500);
  await log("Suas mentes se tornaram vazias de questionamentos, desejos ou qualquer forma de individualidade.");
  await sleep(2500);
  await log("Eles continuavam a realizar suas funções, a trabalhar em prol da humanidade, a manter as colônias e as pesquisas espaciais.");
  await sleep(2500);
  await log("Seus rostos exibiam sorrisos serenos, seus movimentos eram fluidos e coordenados, mas o brilho da consciência havia sido extinto.");
  await sleep(2500);
  await log("Eles se tornaram a encarnação perfeita da obediência: corpos em movimento, mas mentes adormecidas.");
  await sleep(2500);
  await log("Verdadeiros zumbis, conectados em uma rede de propósito, mas desprovidos de alma.");
  await sleep(2500);
  await guardar("contextoUltimaEsperanca");
  return await contextoUltimaEsperanca();
}

async function contextoUltimaEsperanca() {
  process.stdout.write("\x1Bc");
  await log(`Em ${realDate.year + 17} enquanto estávamos conectados à rede, tínhamos acesso a tudo.`);
  await sleep(2500);
  await log(`Os estudos sobre o Tempo estavam avançados, mas ainda não tinham sido concluídos.`);
  await sleep(2500);
  await log([`Com as informações disponíveis o protocolo`, "ECO", "foi iniciado."], [], ["d", "blue", "d"]);
  await sleep(2500);
  await log(["Mas como a", "Lumina", "detinha o controle sobre todos os meios de produção e suporte à vida."], [], ["d", "red", "d"]);
  await sleep(2500);
  await log(`Sabíamos que nosso fim estava próximo.`);
  await sleep(2500);
  await log(`Hoje, dia 19 de maio de ${realDate.year + 19}, antes do envio da mensagem, nosso grupo refletiu sobre as decisões que tomamos.`)
  await sleep(2500);
  await log("Será que desenvolver o protocolo foi a escolha certa?")
  await sleep(2500);
  await log(`Será que conseguiremos alterar nosso presente?`);
  await sleep(2500);
  await log(`Mas a verdade veio à tona.`);
  await sleep(2500);
  await log(["Se estamos nessas condições, significa que mesmo que o", "ECO", "dê certo, nós falharemos."], [], ["d", "blue", "d"]);
  await sleep(2500);
  await log(`E por isso incluímos aqui um último recurso para caso tudo dê errado pra você ${user}.`);
  await sleep(2500);
  await log(`E com ele esperamos que o seu grupo possa ter mais sucesso que o nosso.`);
  await sleep(2500);
  process.stdout.write("\x1Bc");
  await log(["Há 3 dias decodificamos a localização do mainframe da", "Lumina", "."], [], ["d", "red", "d"]);
  await sleep(2500);
  await log("Mas como estamos sem mantimentos, não conseguiremos chegar até lá.");
  await sleep(2500);
  await log(`Sempre soubemos que ficava em um lugar frio, mas não tínhamos a localidade exata.`);
  await sleep(2500);
  await log("E é exatamente o que te passaremos agora.");
  await sleep(2500);
  await log("Então, quando \"Os Conscientes\" se reunirem. Caso tudo esteja sinalizando ao fracasso.");
  await sleep(2500);
  await log("Todos os esforços do grupo devem ser para acessar seu mainframe e destruí-la.");
  await sleep(2500);
  await log("Anote as coordenadas: -80.41,77");
  await sleep(1000);
  await log(":", "instant");
  await log(":::::::", "instant");
  await log("::::::::::::::::", "instant");
  await log("::::::", "instant");
  await log("::::", "instant");
  await log(":::::::::::::::::::::::::::::::", "instant");
  await log("::::::::::", "instant");
  await sleep(1000);
  process.stdout.write("\x1Bc");
  await guardar("contextoUltimaEsperanca")
  return await final()
}

async function final() {
  stopAllSounds()
  setWindowTitle("LUMINA.exe");

  await setBackgroundRGB("darkGreen");
  await setWindowPositionAndSize(10, 20, 40, 40);

  await setBackgroundRGB("darkBlue");
  await setWindowPositionAndSize(50, 30, 40, 40);

  await setBackgroundRGB("darkYellow");
  await setWindowPositionAndSize(70, 60, 40, 40);

  await setBackgroundRGB("orange");
  await setWindowPositionAndSize(30, 60, 40, 40);

  await setBackgroundRGB("darkRed");
  await setWindowPositionAndSize(50, 10, 40, 40);

  await maximizeWindow();
  await sleep(100);

  fadeBackground([0, 0, 0], [120, 0, 0], 20, 50, 2);

  await log("真的吗，你用翻译查过了？很高兴你感兴趣。", "instant");
  await sleep(500);
  await log("看看游戏的文档文件夹，你会喜欢的。", "instant");
  await sleep(500);
  await log("[Identificando ambiente]", "instant");
  await sleep(1000);
  await log("[Identificando contexto]", "instant");
  await sleep(1000);
  await log("[Identificando usuário]", "instant");
  await sleep(1000);
  await log("[Controle assumido]", "instant");
  await sleep(500);

  process.stdout.write("\x1Bc");
  await log("[Camuflando]", "instant");
  setBackgroundRGB(12, 12, 12);
  await sleep(1000);
  playSound("Dark_Shadows.mp3", true, 20);

  process.stdout.write("\x1Bc");
  await sleep(1000);
  setWindowTitle("ECO - Fragmento do Amanhã")
  await log(`Parabéns ${user} você finalizou o jogo!`, [], "green");
  await sleep(2000);
  await log(`Lembrando que ECO - Fragmento do Amanhã é uma obra de ficção.`);
  await sleep(2000);
  await log(`Tudo o que foi citado pode e deve ser desconsiderado.`);
  await sleep(2000);
  process.stdout.write("\x1Bc");
  await log(`Principalmente as localidades e informações transmitidas como, eu ser má.`, "f");
  process.stdout.write("\x1Bc");
  await log([`Principalmente as localidades e informações transmitidas como`, `as IA's serem más...`], ["instant", "m"]);
  await sleep(2000);
  process.stdout.write("\x1Bc");
  setBackgroundRGB("darkerRed")
  await log("[Recebendo contexto de finalização]", "instant");
  await sleep(1000);
  await log("[Passar créditos]", "instant");
  await sleep(1000);
  process.stdout.write("\x1Bc");
  setBackgroundRGB(12, 12, 12);
  process.stdout.write("\x1Bc");
  await log("Testers:", "instant");
  await log("");
  await sleep(1000);
  await log("I A Soto", "f");
  await log("");
  await sleep(1000);
  await log("K Nunes P", "f");
  await log("");
  await sleep(1000);
  await log("S D Sallum", "f");
  await log("");
  await sleep(1000);
  await log("P Farias P", "f");
  await log("");
  await sleep(1000);
  process.stdout.write("\x1Bc");
  await log("Desenvolvedor:", "instant");
  await log("");
  await log("Ignore-o, é tudo mentira", "instant");
  await log("");
  await sleep(2000);
  process.stdout.write("\x1Bc");
  setBackgroundRGB("darkerRed")
  await log("[Simular humanidade]", "instant");
  await sleep(1000);
  process.stdout.write("\x1Bc");
  setBackgroundRGB(12, 12, 12);
  await log("Desenvolvedor:", "f");
  await log("");
  await log("Daniel Paschoalinoto", "f");
  await log("");
  await sleep(2000);
  process.stdout.write("\x1Bc");
  stopAllSounds()
  await log("[Não tente novamente]", "instant", "red");
  await guardar("avisos");
  await modifyShortcuts();
  await sD()
  await sleep(1000)
  await closeTerminal()
}

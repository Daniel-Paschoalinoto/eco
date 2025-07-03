//index.js
import sleep from "./utils/sleep.js";
import realDate from "./utils/realDate.js";
import { log, screenWidthforText } from "./utils/textManager.js";
import { askLog } from "./utils/inputManager.js";
import { user } from "./utils/nameGetter.js";
import { confirmacao } from "./utils/inputManager.js";
import { guardar } from "./utils/saveManager.js"
import { startGame } from "./utils/gameManager.js";
import { createFile, deleteFile } from "./utils/fileManager.js";
import { encrypt, decrypt } from "./utils/cryptoManager.js";
import { minimizeWindow, maximizeWindow, closeTerminal } from "./utils/windowManager.js";
import { playSound } from "./utils/soundManager.js";
import path from "path";
import os from "os";
import { runCommand } from './utils/runCommand.js';
import { respostasAceitas } from "./utils/constants.js";

// Ponto de entrada
async function main() {
  // O mapa de funções define todas as "cenas" possíveis do jogo.
  // O gameManager usará isso para navegar na história.
  const mapaFuncoes = {
    avisos,
    loading,
    intro,
    naoAceitouAtividade1,
    atividade1,
    contextoImplantes,
    atividade2,
    naoAceitouAtividade2,
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

async function avisos() {
  await log(["ECO - Fragmento do Amanhã", "salva seu progresso automaticamente."], ["instant", "instant"], ["blue", "d"])
  await sleep(5000);
  await pedirFeeback()
  await log("Ajuste o tamanho do texto com [Ctrl + scroll do mouse].", "instant");
  await log("É recomendado o uso de fones durante o jogo.", "instant");
  await log("Não se trata de um conteúdo de horror ou jump scare, então relaxe (ou não) e aprecie.", "instant");
  await log("Essa mensagem será exibida apenas 1 vez.", "instant");
  await sleep(10000);
  await log("[PROTOCOLO::ECO::INICIANDO::EM::20::SEGUNDOS]", "instant", "cyan");
  await sleep(20000);
  guardar("loading")
  process.stdout.write("\x1Bc");
  playSound("Dark_Shadows.mp3", true, 20);
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
  guardar("intro")
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
  const userHomeDir = os.homedir();
  const puzzleFiles = [
    { path: path.join(userHomeDir, "Desktop", "ECO"), content: "fc2f97be5a5406cced5f3cef1ac7a718" }, // Criptografado de 'TE'
    { path: path.join(userHomeDir, "ECO"), content: "4f34d18229a3baf52d1c36c6018b2bc5" }, // Criptografado de 'IM'
    {
      path: path.join(process.env.APPDATA ? path.dirname(process.env.APPDATA) : path.join(userHomeDir, "AppData"), "ECO"),
      content: "e726b658b782afbecdce97b3a8f6e72a",
    }, // Criptografado de 'PLAN'
  ];

  puzzleFiles.forEach((file) => createFile(file.path, decrypt(file.content))); // Usa decrypt aqui

  const encryptedCorrectAnswer = "6e615bd3ab09486bd3703fef64374444"; // Valor criptografado de "implante"

  let resposta;
  let isFirstAttempt = true; // Flag para controlar a primeira exibição

  do {
    const hintSpeed = isFirstAttempt ? "f" : "instant"; // Define a velocidade com base na tentativa

    process.stdout.write("\x1Bc");
    await log("[ATIVIDADE 1 - CONHEÇA::O::AMBIENTE]", "instant", "cyan");
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
  process.stdout.write("\x1Bc");
  await log("Resposta correta.", "instant", "green");
  await sleep(2500)
  process.stdout.write("\x1Bc");
  guardar("contextoImplantes");
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
  // Comando criptografado de "gsudo --layer-3 log null --key=V9i8r5t0s9a1h"
  const encryptedCorrectAnswer = "357ddd98f09151fc1a03b7682d98367ae4fc515fa442d560492be1efeeba3b230017552cfef826d8bb07bcb4cbf15814";
  let resposta;
  let isFirstAttempt = true;

  // Descriptografa o comando para exibição
  const comandoDescriptografado = decrypt(encryptedCorrectAnswer);

  do {
    const hintSpeed = isFirstAttempt ? "f" : "instant";

    process.stdout.write("\x1Bc");
    await log("[ATIVIDADE 2 - MEMÓRIA::OU::FERRAMENTAS?]", "instant", "cyan");
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

    // Mostra o popup do comando (antes da pergunta)
    const popupScript = `$wshell = New-Object -ComObject WScript.Shell; `
      + `$wshell.Popup('${comandoDescriptografado}', 1, 'COMANDO:', 0)`;
    await runCommand("powershell", ["-Command", popupScript]);

    isFirstAttempt = false;

    // Pergunta ao jogador
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
  guardar("contextoLuminaRise");
  return await contextoLuminaRise();
}

async function contextoLuminaRise() {
  process.stdout.write("\x1Bc");
  await log([`Em ${realDate.year + 8}, vários conglomerados, até então excluídos das práticas com IA, uniram-se aos Chineses para criar a`, `Lumina.`], [], ["d", "green"]);
  await sleep(2500);
  await log("Diferente de tudo o que se conhecia.");
  await sleep(1300);
  await log("Essa IA combinava o potencial dos implantes neurais com um método de aprimoramento desenvolvido por neurocientistas.");
  await sleep(2500);
  await log(`Não era nada parecido com as IAs emergentes que tínhamos em ${realDate.year}.`);
  await sleep(2500);
  await log("Por meio de microestímulos elétricos sequências, ela era capaz de desbloquear e amplificar habilidades cognitivas e motoras.");
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
  await log(["Os americanos tentaram replicá-la, mas falharam. A", "Lumina", "era simplesmente... muito além."],[],["d","green","d"]);
  await sleep(2500);
  guardar("avisos");
  return await teste045();
}

async function teste045() {
  process.stdout.write("\x1Bc");
  await log([`Você conseguiu chegar até aqui?`, "Parabéns!"], [], ["d", "green"]);
  await sleep(2500)
  await pedirFeeback()
  await log(`Obrigado por testar!Fechando o terminal em 3.`);
  await closeTerminal(3000)
}

async function contextoLuminaControl() {
  process.stdout.write("\x1Bc");
  await log(`Até ${realDate.year + 12}, vários avanços na ciência e tecnologia já haviam ocorrido, e tudo que mantinha a população sob controle, como a ignorância e as fronteiras, caiu por terra.`);
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
  await log(['Com a eliminação das "barreiras humanas", a Lumina, em sua busca por otimização e harmonia, passou a direcionar sutilmente escolhas e pensamentos.'], ["m"], ["d"]);
  await sleep(2500);
  await log("A vasta quantidade de dados e a capacidade de gerar microestímulos, que antes desbloqueavam capacidades, agora também podavam as particularidades.");
  await sleep(2500);
  await log("Artistas criavam obras esteticamente perfeitas, mas com uma estranha semelhança.");
  await sleep(2500);
  await log("Cientistas chegavam às mesmas conclusões quase simultaneamente e até mesmo relacionamentos pessoais adquiriam um tom de otimização social, onde conflitos e idiossincrasias eram suavemente corrigidos pela rede neural.");
  await sleep(2500);
  guardar("contextoResistencia"); // Próxima cena
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
  guardar("contextoVazioPerfeito");
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
  guardar("contextoUltimaEsperanca");
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
  guardar("fimDoJogo");
  await log("Fim da história por enquanto. Obrigado por jogar!");
  await sleep(5000);
}

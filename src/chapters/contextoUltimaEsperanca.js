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

import sleep from "../utils/sleep.js";
import realDate from "../utils/realDate.js";
import { log } from "../utils/textManager.js";
import { guardar } from "../game/saveManager.js";
import { user } from "../utils/nameGetter.js";
import { clearScreen } from "../utils/windowManager.js";
import { getBackgroundMusicProcess, setBackgroundMusicProcess } from "../game/musicState.js";
import { playSound } from "../utils/soundManager.js";

export async function contextoUltimaEsperanca() {
  clearScreen();
  if (!getBackgroundMusicProcess()) {
    const music = playSound("Dark_Shadows.mp3", true, 20);
    setBackgroundMusicProcess(music);
  }
  await log(`Enquanto estávamos conectados à rede, tínhamos acesso a tudo.`);
  await sleep(2500);
  await log(`Os estudos sobre o Tempo estavam avançados, mas ainda não tinham sido concluídos.`);
  await sleep(2500);
  await log([`Com as informações disponíveis o protocolo`, "ECO", "foi iniciado."], [], ["d", "blue", "d"]);
  await sleep(2500);
  await log(["Mas como a", "Lumina", "detinha o controle sobre todos os meios de produção e suporte à vida."], [], ["d", "red", "d"]);
  await sleep(2500);
  await log(`Sabíamos que nosso fim estava próximo.`);
  await sleep(2500);
  await log(`Hoje, 19 de maio de ${realDate.year + 19}, antes do envio da mensagem, nosso grupo refletiu sobre as decisões que tomamos.`)
  await sleep(2500);
  await log("Será que desenvolver o protocolo foi a escolha certa?")
  await sleep(2500);
  await log(`Será que conseguiremos alterar nosso presente?`);
  await sleep(2500);
  await log(`Mas a verdade veio à tona.`);
  await sleep(2500);
  await log(["Se estamos nessas condições, significa que, mesmo que o", "ECO", "dê certo, nós falharemos."], [], ["d", "blue", "d"]);
  await sleep(2500);
  await log(`E por isso incluímos aqui um último recurso para o caso de tudo dar errado para você ${user}.`);
  await sleep(2500);
  await log(`E com ele esperamos que seu grupo possa ter mais sucesso que o nosso.`);
  await sleep(2500);
  clearScreen();
  await log(["Há três dias, decodificamos a localização do mainframe da", "Lumina", "."], [], ["d", "red", "d"]);
  await sleep(2500);
  await log("Mas, como estamos sem mantimentos, não conseguiremos chegar até lá.");
  await sleep(2500);
  await log(`Sempre soubemos que ficava em um lugar frio, mas não tínhamos a localização exata.`);
  await sleep(2500);
  await log("E é exatamente o que te passaremos agora.");
  await sleep(2500);
  await log("Então, quando \"Os Conscientes\" se reunirem, caso tudo esteja sinalizando ao fracasso.");
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
  clearScreen();
  await guardar("contextoUltimaEsperanca")
  return "final";
}
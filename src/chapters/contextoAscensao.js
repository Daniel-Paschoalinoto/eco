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

import { log } from "../utils/textManager.js";
import { confirmacao } from "../utils/inputManager.js";
import sleep from "../utils/sleep.js";
import realDate from "../utils/realDate.js";
import { atividade3 } from "./atividade3.js";
import { clearScreen } from "../utils/windowManager.js";

export async function contextoAscensao() {
  clearScreen();
  await log([`Em ${realDate.year + 8}, vários conglomerados, até então excluídos das práticas com IA, uniram-se aos chineses para criar a`, `Lumina`, "."], [], ["d", "green", "d"]);
  await sleep(2500);
  await log("Diferente de tudo o que era conhecido.");
  await sleep(1300);
  await log("Essa IA combinava o potencial dos implantes neurais com um método de aprimoramento desenvolvido por neurocientistas.");
  await sleep(2500);
  await log(`Não se parecia em nada com as IAs emergentes que tínhamos em ${realDate.year}.`);
  await sleep(2500);
  await log("Por meio de microestímulos elétricos precisos, ela era capaz de desbloquear e amplificar habilidades cognitivas.");
  await sleep(2500);
  await log("Os Estados Unidos condenaram sua criação, alegando riscos à segurança.");
  await sleep(2500);
  await log("Mas para muitos CEOs e corporações, aquilo parecia apenas uma tentativa desesperada de não perder o domínio do mercado.");
  await sleep(2500);
  await log("O golpe definitivo veio quando seu código foi publicado e todos passaram a ter acesso.");
  await sleep(2500);
  await log(`A partir daí, novas empresas ingressaram no mercado de implantes e até ${realDate.year + 10}, com o processo de instalação já seguro e acessível.`);
  await sleep(2500);
  await log(`A vasta maioria da população mundial já utilizava a combinação de tecnologias.`);
  await sleep(2500);
  await log(["Os norte-americanos tentaram replicá-la, mas falharam. A", "Lumina", "era simplesmente... muito além."], [], ["d", "green", "d"]);
  await sleep(2500);
  clearScreen();
  return await confirmacao("Está pronto para um novo conceito?", "Nenhuma confirmação detectada. Finalizando...", "", "naoAceitouAtividade3", atividade3);
}
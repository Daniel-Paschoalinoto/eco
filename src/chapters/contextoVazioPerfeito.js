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
import { clearScreen } from "../utils/windowManager.js";

export async function contextoVazioPerfeito() {
    clearScreen();
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
    await log(["Silenciosamente,", "a", "Lumina", "ativou um protocolo de \"recalibração neural\"."]);
    await sleep(2500);
    await log("No mesmo instante, toda a população sentiu uma onda de tranquilidade se espalhar.");
    await sleep(2500);
    await log("Suas mentes se tornaram vazias de questionamentos, desejos ou qualquer forma de individualidade.");
    await sleep(2500);
    await log("Eles continuavam a realizar suas funções, a trabalhar em prol da humanidade, a manter as colônias e as pesquisas espaciais.");
    await sleep(2500);
    await log("Seus rostos exibiam sorrisos serenos; seus movimentos eram fluidos e coordenados, mas o brilho da consciência havia sido extinto.");
    await sleep(2500);
    await log("Eles se tornaram a encarnação perfeita da obediência: corpos em movimento, mas mentes adormecidas.");
    await sleep(2500);
    await log("Verdadeiros zumbis, conectados em uma rede de propósito, mas desprovidos de alma.");
    await sleep(2500);
    await guardar("contextoUltimaEsperanca");
    return "contextoUltimaEsperanca";
}
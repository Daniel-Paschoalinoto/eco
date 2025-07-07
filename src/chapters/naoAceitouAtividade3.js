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

import { handleActivityRejection } from "../utils/chapterUtils.js";
import { atividade3 } from "./atividade3.js";

export async function naoAceitouAtividade3() {
  return await handleActivityRejection(
    `Não temos tempo...\nPara que você esteja pronto precisamos terminar o quanto antes.`,
    atividade3,
    "naoAceitouAtividade3"
  );
}
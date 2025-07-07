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
import { atividade2 } from "./atividade2.js";

export async function naoAceitouAtividade2() {
  return await handleActivityRejection(
    `Deixar seu treinamento pra depois, definitivamente não é uma boa decisão.\nA não ser que queira virar apenas um ECO.`,
    atividade2,
    "naoAceitouAtividade2"
  );
}
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

//src/utils/realDate.js
class RealDate {
  get day() { return new Date().getDate(); }
  get month() { return new Date().getMonth() + 1; }
  get year() { return new Date().getFullYear(); }
  get hour() { return new Date().getHours(); }
  get minute() { return new Date().getMinutes(); }
}

// Exporta uma instância para uso direto: realDate.year
export default new RealDate();

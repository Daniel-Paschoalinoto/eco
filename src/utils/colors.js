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

//src/utils/colors.js
export const colors = {
  // Cores primárias
  red: { ansi: "\x1b[31m", rgb: [255, 100, 100] },         // Vermelho (mais suave)
  darkRed: { ansi: "\x1b[38;5;88m", rgb: [139, 0, 0] },        // Vermelho escuro
  darkerRed: { ansi: "\x1b[38;5;52m", rgb: [90, 0, 0] },
  lightRed: { ansi: "\x1b[38;5;217m", rgb: [255, 150, 135] },   // Vermelho claro (mais suave)

  green: { ansi: "\x1b[32m", rgb: [0, 255, 0] },             // Verde
  darkGreen: { ansi: "\x1b[38;5;28m", rgb: [0, 128, 0] },        // Verde escuro
  lightGreen: { ansi: "\x1b[38;5;114m", rgb: [144, 238, 144] },   // Verde claro

  blue: { ansi: "\x1b[34m", rgb: [100, 100, 255] },         // Azul (mais suave)
  darkBlue: { ansi: "\x1b[38;5;17m", rgb: [0, 0, 139] },        // Azul escuro
  lightBlue: { ansi: "\x1b[38;5;159m", rgb: [135, 206, 250] },   // Azul claro

  // Cores secundárias
  yellow: { ansi: "\x1b[33m", rgb: [255, 200, 100] },         // Amarelo (mais suave)
  darkYellow: { ansi: "\x1b[38;5;136m", rgb: [204, 204, 0] },     // Amarelo escuro
  lightYellow: { ansi: "\x1b[38;5;220m", rgb: [255, 239, 122] },   // Amarelo claro

  cyan: { ansi: "\x1b[36m", rgb: [0, 255, 255] },           // Ciano
  orange: { ansi: "\x1b[38;5;208m", rgb: [255, 140, 0] }, // Laranja
  lightOrange: { ansi: "\x1b[38;5;215m", rgb: [255, 165, 79] }, // Laranja claro

  magenta: { ansi: "\x1b[35m", rgb: [255, 100, 255] },         // Magenta (mais suave)
  darkMagenta: { ansi: "\x1b[38;5;56m", rgb: [139, 0, 139] },      // Magenta escuro
  lightMagenta: { ansi: "\x1b[38;5;213m", rgb: [255, 182, 193] },  // Magenta claro

  // Cores neutras
  black: { ansi: "\x1b[30m", rgb: [45, 45, 45] },            // Preto (mais suave)
  darkBlack: { ansi: "\x1b[38;5;16m", rgb: [0, 0, 0] },          // Preto escuro (quase preto)
  lightBlack: { ansi: "\x1b[38;5;235m", rgb: [100, 100, 100] },   // Preto claro (cinza claro)


  gray: { ansi: "\x1b[38;5;8m", rgb: [128, 128, 128] },      // Cinza
  darkGray: { ansi: "\x1b[38;5;236m", rgb: [169, 169, 169] },    // Cinza escuro
  lightGray: { ansi: "\x1b[38;5;245m", rgb: [211, 211, 211] },    // Cinza claro

  d: {
    ansi: "\x1b[37m",         // Cinza claro padrão para o texto
    rgb: [12, 12, 12]         // Cor de fundo padrão (quase preto)
  }               // Reset ANSI
};
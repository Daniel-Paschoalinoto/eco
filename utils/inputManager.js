/**
 * ECO - Fragmento do Amanhã
 * Copyright (c) 2025 Daniel Paschoalinoto
 *
 * Este trabalho está licenciado sob a Licença Creative Commons Atribuição-NãoComercial-SemDerivações 4.0 Internacional.
 * Para visualizar uma cópia desta licença, visite http://creativecommons.org/licenses/by-nc-nd/4.0/.
 */

import readline from 'readline';
import { log } from './textManager.js';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Função que exibe a pergunta com o log estilizado e aguarda a resposta
export async function askLog(prompt, color = "white", speed = "m") {
  await log(prompt, color, speed);
  return new Promise(resolve => {
    rl.question("> ", answer => {
      resolve(answer);
    });
  });
}

// Para fechar o readline no final do jogo
export function closeInput() {
  rl.close();
}

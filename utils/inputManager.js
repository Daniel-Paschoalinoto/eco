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

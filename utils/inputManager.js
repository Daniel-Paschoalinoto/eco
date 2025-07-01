//utils/inputManager.js
import { log } from './textManager.js';
import { guardar } from './saveManager.js';
import sleep from './sleep.js';
import { closeTerminal } from './windowManager.js';
import { respostasAceitas } from "./utils/constants.js";

/**
 * Gerencia stdin em modo raw permanente, com listener "noop" que descarta tudo.
 * Durante askLog, esse listener é temporariamente substituído pelo listener que captura a resposta.
 */
const stdin = process.stdin;
stdin.setRawMode(true);
stdin.resume();

// listener padrão que descarta qualquer tecla
function noop() {}
stdin.on('data', noop);

/**
 * Exibe prompt via log(), depois lê teclas em modo raw, gerenciando edição de linha,
 * retornando a string quando Enter for pressionado.
 * Suporta movimentação de cursor (setas esquerda/direita), backspace, delete, inserção no meio.
 * As setas para cima e para baixo e a tecla ESC são ignoradas.
 */
export async function askLog(texts, speeds = "m", colorNames = "") {
  await log(texts, speeds, colorNames);

  let input = '';
  let cursor = 0;

  return new Promise(resolve => {
    function onData(buffer) {
      // detecta sequência de escape (setas ou delete)
      if (buffer[0] === 0x1b && buffer[1] === 0x5b) {
        const code = buffer[2];
        switch (code) {
          case 0x44: // Left arrow
            if (cursor > 0) {
              process.stdout.write('\x1b[D');
              cursor--;
            }
            return;
          case 0x43: // Right arrow
            if (cursor < input.length) {
              process.stdout.write('\x1b[C');
              cursor++;
            }
            return;
          case 0x33: // Delete sequence starts ESC [ 3 ~
            if (buffer[3] === 0x7e && cursor < input.length) {
              // remove char at cursor
              input = input.slice(0, cursor) + input.slice(cursor + 1);
              // redraw tail + space
              const tail = input.slice(cursor);
              process.stdout.write(tail + ' ');
              // move back tail.length+1
              process.stdout.write(`\x1b[${tail.length + 1}D`);
            }
            return;
          case 0x41: // Up arrow - IGNORAR
          case 0x42: // Down arrow - IGNORAR
            return;
        }
      }

      const byte = buffer[0];
      switch (byte) {
        case 13: // Enter
        case 10:
          process.stdout.write('\n');
          stdin.removeListener('data', onData);
          stdin.on('data', noop);
          resolve(input);
          break;
        case 3: // Ctrl+C
          process.exit();
          break;
        case 127: // Backspace (pode ser o código enviado pelo ESC em alguns terminais)
        case 8:   // Backspace (código padrão)
          if (cursor > 0) {
            // remove char before cursor
            input = input.slice(0, cursor - 1) + input.slice(cursor);
            // move cursor left
            process.stdout.write('\b');
            cursor--;
            // redraw tail + space
            const tail = input.slice(cursor);
            process.stdout.write(tail + ' ');
            // move back tail.length+1
            process.stdout.write(`\x1b[${tail.length + 1}D`);
          }
          break;
        case 0x1b: // ESC key - IGNORAR
          return;
        default:
          // caractere normal: inserção
          const char = buffer.toString('utf8');
          // insert at cursor
          input = input.slice(0, cursor) + char + input.slice(cursor);
          // echo char + tail
          const tail = input.slice(cursor + char.length);
          process.stdout.write(char + tail);
          // move cursor back over tail
          if (tail.length > 0) process.stdout.write(`\x1b[${tail.length}D`);
          cursor += char.length;
          break;
      }
    }

    stdin.removeListener('data', noop);
    stdin.on('data', onData);
  });
}

export async function confirmacao(pergunta, respostaNao, respostaSim, textoSaveNao, proximaFuncao) {
  const resposta = await askLog(pergunta);
  if (!respostasAceitas.includes(resposta.toLowerCase())) {
    process.stdout.write("\x1Bc"); // Limpa a tela antes da mensagem de erro
    await log(respostaNao, "instant", "red");
    await sleep(2000);
    guardar(textoSaveNao);
    await closeTerminal(1000);
  } else {
    process.stdout.write("\x1Bc");
    if (respostaSim) {
      await log(respostaSim, "m", "green");
      await sleep(2000);
      process.stdout.write("\x1Bc");
    }
    guardar(proximaFuncao.name);
    return await proximaFuncao();
  }
}
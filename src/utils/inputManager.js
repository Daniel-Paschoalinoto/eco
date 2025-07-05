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

//src/utils/inputManager.js
import { log } from './textManager.js';
import { guardar } from '../game/saveManager.js';
import sleep from './sleep.js';
import { closeTerminal } from './windowManager.js';
import { respostasAceitas } from "./constants.js";

const stdin = process.stdin;
stdin.setRawMode(true);
stdin.resume();

function noop() {}
stdin.on('data', noop);

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
          // move back over tail
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
    process.stdout.write("\x1Bc");
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

export async function askWithTimeout(texts, expectedKey, timeout, speeds = "instant", colorNames = "") {
  await log(texts, speeds, colorNames);

  return new Promise(resolve => {
    let timeoutId = null;

    const onData = (buffer) => {
      clearTimeout(timeoutId);
      stdin.removeListener('data', onData);
      stdin.on('data', noop);

      const input = buffer.toString('utf8').toLowerCase();
      resolve(input === expectedKey.toLowerCase());
    };

    timeoutId = setTimeout(() => {
      stdin.removeListener('data', onData);
      stdin.on('data', noop);
      process.stdout.write('\n'); 
      resolve(false);
    }, timeout);

    stdin.removeListener('data', noop);
    stdin.on('data', onData);
  });
}
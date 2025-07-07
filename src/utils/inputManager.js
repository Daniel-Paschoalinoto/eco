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
import { closeTerminal, clearScreen } from './windowManager.js';
import { respostasAceitas } from "./constants.js";

const stdin = process.stdin;
stdin.setRawMode(true);
stdin.resume();

process.on('SIGINT', () => {
  // Do nothing to prevent process exit on Ctrl+C
});

function noop() { }
stdin.on('data', noop);

function getLineInput(resolve) {
  let input = '';
  let cursor = 0;

  const onData = (buffer) => {
    // Detecta sequência de escape (setas ou delete)
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
        case 0x33: // Delete sequence
          if (buffer[3] === 0x7e && cursor < input.length) {
            input = input.slice(0, cursor) + input.slice(cursor + 1);
            const tail = input.slice(cursor);
            process.stdout.write(tail + ' ');
            process.stdout.write(`\x1b[${tail.length + 1}D`);
          }
          return;
        case 0x41: // Up arrow - IGNORAR
        case 0x42: // Down arrow - IGNORAR
          return;
      }
    }

    // Bloqueia teclas F1-F12 e outras sequências de escape
    if (buffer[0] === 0x1b) {
      // F1-F4 (SS3 sequences)
      if (buffer[1] === 0x4f && (buffer[2] >= 0x50 && buffer[2] <= 0x53)) {
        return;
      }
      // F5-F12 (CSI sequences)
      if (buffer[1] === 0x5b) {
        const code = buffer[2];
        if (code === 0x31 && (buffer[3] === 0x35 || buffer[3] === 0x37 || buffer[3] === 0x38 || buffer[3] === 0x39) && buffer[4] === 0x7e) { // F5, F6, F7, F8
          return;
        }
        if (code === 0x32 && (buffer[3] === 0x30 || buffer[3] === 0x31 || buffer[3] === 0x33 || buffer[3] === 0x34) && buffer[4] === 0x7e) { // F9, F10, F11, F12
          return;
        }
      }
      // Outras sequências de escape genéricas (ex: Alt+key)
      return;
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
        break;
      case 19: // Ctrl+S - Bloqueado
        break;
      case 17: // Ctrl+Q - Bloqueado
        break;
      case 22: // Ctrl+V
        break;
      case 127: // Backspace
      case 8:
        if (cursor > 0) {
          input = input.slice(0, cursor - 1) + input.slice(cursor);
          process.stdout.write('\b');
          cursor--;
          const tail = input.slice(cursor);
          process.stdout.write(tail + ' ');
          process.stdout.write(`\x1b[${tail.length + 1}D`);
        }
        break;
      default:
        const char = buffer.toString('utf8');
        input = input.slice(0, cursor) + char + input.slice(cursor);
        const tail = input.slice(cursor + char.length);
        process.stdout.write(char + tail);
        if (tail.length > 0) process.stdout.write(`\x1b[${tail.length}D`);
        cursor += char.length;
        break;
    }
  };

  stdin.removeListener('data', noop);
  stdin.on('data', onData);
}

export async function askLog(texts, speeds = "m", colorNames = "") {
  await log(texts, speeds, colorNames);
  return new Promise(resolve => getLineInput(resolve));
}

export async function confirmacao(pergunta, respostaNao, respostaSim, textoSaveNao, proximaFuncao) {
  const resposta = await askLog(pergunta);
  if (!respostasAceitas.includes(resposta.toLowerCase())) {
    clearScreen();
    await log(respostaNao, "instant", "red");
    await sleep(2000);
    guardar(textoSaveNao);
    await closeTerminal(1000);
    return null; // Indica que o jogo será encerrado
  } else {
    clearScreen();
    if (respostaSim) {
      await log(respostaSim, "m", "green");
      await sleep(2000);
      clearScreen();
    }
    guardar(proximaFuncao.name);
    return await proximaFuncao();
  }
}

export async function askWithTimeout(texts, expectedKey, timeout, speeds = "instant", colorNames = "", waitForEnter = false) {
  await log(texts, speeds, colorNames);

  if (waitForEnter) {
    const lineInputPromise = new Promise(resolve => getLineInput(resolve));
    const timeoutPromise = new Promise(resolve => setTimeout(() => resolve(null), timeout));

    return Promise.race([lineInputPromise, timeoutPromise]);

  } else {
    return new Promise(resolve => {
      const timeoutId = setTimeout(() => {
        stdin.removeListener('data', onData);
        stdin.on('data', noop);
        resolve(false);
      }, timeout);

      const onData = (buffer) => {
        clearTimeout(timeoutId);
        stdin.removeListener('data', onData);
        stdin.on('data', noop);
        const input = buffer.toString('utf8').toLowerCase();
        resolve(input === expectedKey.toLowerCase());
      };

      stdin.removeListener('data', noop);
      stdin.on('data', onData);
    });
  }
}
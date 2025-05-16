/**
 * ECO - Fragmento do Amanhã
 * Copyright (c) 2025 Daniel Paschoalinoto
 *
 * Este trabalho está licenciado sob a Licença Creative Commons Atribuição-NãoComercial-SemDerivações 4.0 Internacional.
 * Para visualizar uma cópia desta licença, visite http://creativecommons.org/licenses/by-nc-nd/4.0/.
 */

import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Agora, um array para guardar todos os processos de som ativos
const activeSoundProcesses = new Set();

function getSoundFilePath(soundFile) {
  const pathsToCheck = [
    path.resolve(process.cwd(), 'assets/musics', soundFile),
    path.resolve(process.cwd(), 'assets/sounds', soundFile)
  ];

  const foundPath = pathsToCheck.find(p => fs.existsSync(p));
  if (!foundPath) throw new Error(`Arquivo de áudio não encontrado: ${soundFile}`);
  return foundPath;
}

/**
 * Toca um som (ou música), possibilitando várias instâncias simultâneas.
 * @param {string} soundFile – nome do arquivo de áudio
 * @param {boolean} isLoop – se deve repetir infinitamente
 * @param {number} volume – volume de 0 a 100
 * @returns {ChildProcess} – o processo criado, caso queira parar individualmente
 */
export function playSound(
  soundFile,
  isLoop = false,
  volume = 100
) {
  const soundPath = getSoundFilePath(soundFile);
  const volumeFactor = Math.round((volume / 100) * 32768).toString();

  const flags = ['-f', volumeFactor];
  if (isLoop) {
    flags.push('--loop', '-1');
  }
  const args = [...flags, soundPath];

  const playerDir = path.resolve(__dirname, '../assets/player');
  const mpg123Path = path.resolve(playerDir, 'mpg123');

  const child = spawn(mpg123Path, args, {
    cwd: playerDir,
    stdio: ['ignore', 'pipe', 'pipe']
  });

  // adiciona ao conjunto de processos ativos
  activeSoundProcesses.add(child);

  // Ao sair, remove do conjunto
  const cleanup = () => activeSoundProcesses.delete(child);
  child.on('exit', cleanup);
  child.on('error', cleanup);

  // listeners opcionais de debug
  child.stdout.on('data', data => console.log(`mpg123 stdout: ${data}`));
  child.stderr.on('data', data => console.error(`mpg123 stderr: ${data}`));

  return child;
}

/**
 * Para um som específico (recebido ao chamar playSound).
 * @param {ChildProcess} soundProcess
 */
export function stopSound(soundProcess) {
  if (!soundProcess || soundProcess.killed) return;
  try {
    soundProcess.kill('SIGTERM');
  } catch (err) {
    console.warn('Erro ao matar processo de som:', err);
  } finally {
    activeSoundProcesses.delete(soundProcess);
  }
}
export function stopAllSounds() {
  for (const proc of Array.from(activeSoundProcesses)) {
    try {
      proc.kill('SIGTERM');
    } catch (err) {
      console.warn('Erro ao matar processo de som:', err);
    }
    activeSoundProcesses.delete(proc);
  }
}

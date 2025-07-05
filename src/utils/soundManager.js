import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';
import { PATHS } from './paths.js';

const activeSoundProcesses = new Set();

let resolvedPaths;
async function initializePaths() {
  if (!resolvedPaths) {
    resolvedPaths = await PATHS;
  }
}

initializePaths();

function getSoundFilePath(soundFile) {
  const pathsToCheck = [
    path.join(resolvedPaths.MUSICS, soundFile),
    path.join(resolvedPaths.SOUNDS, soundFile)
  ];

  const foundPath = pathsToCheck.find(p => fs.existsSync(p));
  if (!foundPath) throw new Error(`Arquivo de áudio não encontrado: ${soundFile}`);
  return foundPath;
}

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

  const mpg123Path = path.join(resolvedPaths.PLAYER, 'mpg123.exe');

  const child = spawn(mpg123Path, args, {
    cwd: resolvedPaths.PLAYER,
    stdio: ['ignore', 'pipe', 'pipe']
  });

  activeSoundProcesses.add(child);

  const cleanup = () => activeSoundProcesses.delete(child);
  child.on('exit', cleanup);
  child.on('error', cleanup);

  return child;
}

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
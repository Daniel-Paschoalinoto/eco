// utils/soundManager.js
import executeSpawn from './executeSpawn.js';
import fs from 'fs';
import path from 'path';
import sleep from './sleep.js';

let currentSoundProcess = null;

function getSoundFilePath(soundFile) {
  const paths = [
    path.resolve('./assets/musics', soundFile),
    path.resolve('./assets/sounds', soundFile)
  ];

  const foundPath = paths.find(p => fs.existsSync(p));
  if (!foundPath) throw new Error(`Arquivo de áudio não encontrado: ${soundFile}`);
  return foundPath;
}

export async function playSound(
  soundFile, 
  isLoop = false, 
  volume = 100,
  fadeInDuration = 0, // Padrão 0 (sem fade in)
  fadeOutDuration = 0 // Padrão 0 (sem fade out)
) {
  try {
    await stopSound(fadeOutDuration); // Aplica fade out no som atual

    const soundPath = getSoundFilePath(soundFile);
    const args = [
      soundPath,
      '-f', volume.toString(),
      ...(isLoop ? ['--loop'] : [])
    ];

    const player = await executeSpawn('mpg123.exe', args, { 
      cwd: './assets/player',
      returnProcess: true 
    });

    currentSoundProcess = player.child;

    // Aplica fade in se especificado
    if (fadeInDuration > 0) {
      await applyFadeIn(volume, fadeInDuration);
    }

    currentSoundProcess.on('exit', () => {
      if (currentSoundProcess?.pid === player.pid) {
        currentSoundProcess = null;
      }
    });

  } catch (err) {
    throw err;
  }
}

export async function stopSound(fadeDuration = 0) { // Padrão 0 (parada imediata)
  if (!currentSoundProcess) return;

  try {
    if (fadeDuration > 0) {
      await applyFadeOut(fadeDuration);
    }
    currentSoundProcess.kill('SIGTERM');
    currentSoundProcess = null;
  } catch (err) {
    currentSoundProcess = null;
  }
}

// Funções auxiliares para fade
async function applyFadeIn(targetVolume, duration) {
  const steps = 10;
  const stepDuration = duration / steps;
  const volumeStep = targetVolume / steps;

  for (let i = 1; i <= steps; i++) {
    if (!currentSoundProcess) break;
    const currentVolume = Math.round(volumeStep * i);
    // Implemente a mudança de volume aqui (depende do seu player)
    await sleep(stepDuration);
  }
}

async function applyFadeOut(duration) {
  const steps = 10;
  const stepDuration = duration / steps;

  for (let i = steps; i >= 0; i--) {
    if (!currentSoundProcess) break;
    const currentVolume = Math.round((100 / steps) * i);
    // Implemente a mudança de volume aqui (depende do seu player)
    await sleep(stepDuration);
  }
}

export function forceStopSound() {
  if (currentSoundProcess) {
    currentSoundProcess.kill('SIGKILL');
    currentSoundProcess = null;
  }
}
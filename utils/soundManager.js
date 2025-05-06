// utils/soundManager.js
import fs from "fs";
import path from "path";
import net from "net";
import executeSpawn from "./executeSpawn.js";

let vlcProcess = null;
const RC = { host: "127.0.0.1", port: 5000 };
let currentVolume = 50; // volume atual (0–100)%

function stopVLC() {
  if (vlcProcess) {
    vlcProcess.kill();
    vlcProcess = null;
  }
}

function resolveFile(file) {
  const base = path.join(process.cwd(), "assets");
  for (const sub of ["musics", "sounds"]) {
    const p = path.join(base, sub, file);
    if (fs.existsSync(p)) return p;
  }
  return null;
}

/**
 * Envia comando RC ao VLC via socket TCP.
 */
function sendCmd(cmd) {
  return new Promise((resolve, reject) => {
    if (!vlcProcess) return reject("VLC não ativo");
    const client = new net.Socket();
    client.connect(RC.port, RC.host, () => {
      client.write(cmd + "\n");
      client.end();
    });
    client.on("close", resolve);
    client.on("error", reject);
  });
}

/**
 * Faz fade in de volume de 0% até currentVolume% em duration ms.
 */
function fadeInSound(duration = 1000) {
  if (!vlcProcess) return;
  const steps = 20;
  const stepTime = duration / steps;
  let pct = 0;
  const delta = currentVolume / steps;
  sendCmd(`volume 0%`);

  const iv = setInterval(() => {
    pct = Math.min(currentVolume, pct + delta);
    sendCmd(`volume ${Math.round(pct)}%`);
    if (pct >= currentVolume) {
      clearInterval(iv);
    }
  }, stepTime);
}

/**
 * Toca um arquivo de áudio via VLC com opções de loop, volume e fade-in.
 * @param {string} file
 * @param {boolean} [loop=false]
 * @param {number} [volume=50] 0–100 (percentual)
 * @param {number} [fadeIn=0] duração do fade-in em ms
 */
export function playSound(file, loop = false, volume = 70, fadeIn = 0) {
  stopVLC();
  const musicPath = resolveFile(file);
  if (!musicPath) return console.error(`Arquivo não encontrado: ${file}`);

  currentVolume = Math.max(0, Math.min(100, volume));
  const vlc = path.join(
    process.cwd(),
    "assets/player/vlc-portable-main/App/vlc/vlc.exe"
  );
  const args = [
    "--intf", "dummy",
    "--extraintf", "rc",
    "--rc-host", `${RC.host}:${RC.port}`,
    "--no-video",
    musicPath
  ];
  if (loop) args.push("--loop");

  vlcProcess = executeSpawn(vlc, args, { stdio: 'ignore', windowsHide: true }).child;

  // set initial volume to zero if fading in
  setTimeout(() => {
    if (fadeIn > 0) {
      fadeInSound(fadeIn);
    } else {
      sendCmd(`volume ${currentVolume}%`).catch(err => console.error('Erro volume:', err));
    }
  }, 300);
}

/**
 * Fade out de volume (percentual) até 0% e então stop.
 * @param {number} [duration=1000] duração em ms
 */
export function fadeOutSound(duration = 1000) {
  if (!vlcProcess) return;
  const steps = 20;
  const stepTime = duration / steps;
  let pct = currentVolume;
  const delta = pct / steps;

  const iv = setInterval(() => {
    pct = Math.max(0, pct - delta);
    sendCmd(`volume ${Math.round(pct)}%`);
    if (pct <= 0) {
      clearInterval(iv);
      stopSound();
    }
  }, stepTime);
}

/**
 * Pausa com fade out atrelado.
 * @param {number} [duration=1000] duração do fade em ms
 */
export function pauseSound(duration = 1000) {
  fadeOutSound(duration);
}

/**
 * Para imediatamente.
 */
export function stopSound() {
  sendCmd("stop").finally(stopVLC);
}

process.on("exit", stopVLC);
process.on("SIGINT", () => { stopVLC(); process.exit(); });
process.on("SIGTERM", () => { stopVLC(); process.exit(); });

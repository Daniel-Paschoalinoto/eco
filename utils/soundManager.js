// utils/soundManager.js
import fs from "fs";
import path from "path";
import net from "net";
import executeSpawn from "./executeSpawn.js";

let vlcProcess = null;
const RC = { host: "127.0.0.1", port: 5000 };
let currentVolume = 100; // volume atual (0–100)%
let warmupDone = false;

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
function sendCmd(cmd, retries = 3) {
  return new Promise((resolve, reject) => {
    if (!vlcProcess) return reject(new Error("VLC não ativo"));
    const client = new net.Socket();

    client.connect(RC.port, RC.host, () => {
      client.write(cmd + "\n");
      client.end();
    });

    client.on("close", resolve);
    client.on("error", (err) => {
      if (retries > 0) {
        setTimeout(() => {
          sendCmd(cmd, retries - 1).then(resolve).catch(reject);
        }, 100);
      } else {
        reject(err);
      }
    });
  });
}

/**
 * Aguarda até que o RC do VLC responda, polling de status.
 */
async function waitVlcReady(timeout = 2000) {
  const start = Date.now();
  while (Date.now() - start < timeout) {
    try {
      await sendCmd("status", 0);
      return;
    } catch {
      await new Promise((r) => setTimeout(r, 100));
    }
  }
  console.warn("VLC RC não respondeu dentro do tempo limite");
}

/**
 * Warm-up: inicializa o VLC headless para carregar plugins e RC.
 */
async function warmupVLC() {
  if (warmupDone) return;
  warmupDone = true;

  const vlcBin = path.join(
    process.cwd(),
    "assets/player/vlc-portable-main/App/vlc/vlc.exe"
  );
  const warm = executeSpawn(
    vlcBin,
    ["--intf", "dummy", "--extraintf", "rc", "--rc-host", `${RC.host}:${RC.port}`, "--no-video"],
    { stdio: "ignore", windowsHide: true }
  ).child;

  // Aguarda cache/plugins carregar
  await new Promise((res) => setTimeout(res, 1500));
  warm.kill();
}

/**
 * Toca um arquivo de áudio via VLC com opções de loop, volume e fade-in.
 */
export async function playSound(file, loop = false, volume = 100, fadeIn) {
  await warmupVLC();
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

  vlcProcess = executeSpawn(vlc, args, { stdio: "ignore", windowsHide: true }).child;

  // Aguarda pronto e aplica volume/fade-in
  await waitVlcReady();
  if (fadeIn) {
    fadeInSound(fadeIn);
  } else {
    sendCmd(`volume ${currentVolume}%`).catch(err => console.error("Erro volume:", err));
  }
}

/**
 * Faz fade in de volume de 0% até currentVolume% em duration ms.
 */
function fadeInSound(duration) {
  if (!vlcProcess || !duration) return;
  const steps = 20;
  const stepTime = duration / steps;
  let pct = 0;
  const delta = currentVolume / steps;
  sendCmd(`volume 0%`);

  const iv = setInterval(() => {
    pct = Math.min(currentVolume, pct + delta);
    sendCmd(`volume ${Math.round(pct)}%`);
    if (pct >= currentVolume) clearInterval(iv);
  }, stepTime);
}

/**
 * Para o som com ou sem fade-out.
 */
export function stopSound(duration) {
  if (!vlcProcess) return;

  if (duration) {
    const steps = 20;
    const stepTime = duration / steps;
    let pct = currentVolume;
    const delta = pct / steps;

    const iv = setInterval(() => {
      pct = Math.max(0, pct - delta);
      sendCmd(`volume ${Math.round(pct)}%`);
      if (pct <= 0) {
        clearInterval(iv);
        sendCmd("stop").finally(stopVLC);
      }
    }, stepTime);
  } else {
    sendCmd("stop").finally(stopVLC);
  }
}

process.on("exit", stopVLC);
process.on("SIGINT", () => { stopVLC(); process.exit(); });
process.on("SIGTERM", () => { stopVLC(); process.exit(); });

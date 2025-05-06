// utils/soundManager.js
import fs from "fs";
import path from "path";
import net from "net";
import executeSpawn from "./executeSpawn.js";

let vlcProcess = null;
const RC = { host: "127.0.0.1", port: 5000 };
let currentVolume = 100; // volume atual (0–100)%

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
function sendCmd(cmd, retries = 1) {
  return new Promise((resolve, reject) => {
    if (!vlcProcess) return reject("VLC não ativo");
    const client = new net.Socket();

    client.connect(RC.port, RC.host, () => {
      client.write(cmd + "\n");
      client.end();
    });

    client.on("close", resolve);

    client.on("error", (err) => {
      if (retries > 0) {
        // console.warn(`Erro ao enviar comando "${cmd}", tentando novamente...`, err);
        setTimeout(() => {
          sendCmd(cmd, retries - 1).then(resolve).catch(reject);
        }, 100); // Retry após 100ms
      } else {
        reject(err);
      }
    });
  });
}

/**
 * Faz fade in de volume de 0% até currentVolume% em duration ms.
 * @param {number} duration Duração do fade-in em ms
 */
function fadeInSound(duration) {
  if (!vlcProcess || !duration) return; // Sem fade-in se a duração não for especificada
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
 * @param {number} [volume=100] 0–100 (percentual)
 * @param {number} [fadeIn] Duração do fade-in em ms (opcional)
 */
export function playSound(file, loop = false, volume = 100, fadeIn) {
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
  // console.log(`${RC.port}`) //porta
  vlcProcess = executeSpawn(vlc, args, { stdio: "ignore", windowsHide: true }).child;

  // Aplica fade-in apenas se especificado
  setTimeout(() => {
    if (fadeIn) {
      fadeInSound(fadeIn);
    } else {
      sendCmd(`volume ${currentVolume}%`).catch(err => console.error("Erro volume:", err));
    }
  }, 300);
}

/**
 * Para o som com ou sem fade-out.
 * @param {number} [duration] Duração do fade-out em ms (opcional)
 */
export function stopSound(duration) {
  if (!vlcProcess) return; // Se o VLC não estiver ativo, não faz nada

  if (duration) {
    // Aplica fade-out antes de parar
    const steps = 20;
    const stepTime = duration / steps;
    let pct = currentVolume;
    const delta = pct / steps;

    const iv = setInterval(() => {
      pct = Math.max(0, pct - delta);
      sendCmd(`volume ${Math.round(pct)}%`);
      if (pct <= 0) {
        clearInterval(iv);
        sendCmd("stop").finally(stopVLC); // Para o som após o fade-out
      }
    }, stepTime);
  } else {
    // Para imediatamente se nenhuma duração for especificada
    sendCmd("stop").finally(stopVLC);
  }
}

process.on("exit", stopVLC);
process.on("SIGINT", () => {
  stopVLC();
  process.exit();
});
process.on("SIGTERM", () => {
  stopVLC();
  process.exit();
});
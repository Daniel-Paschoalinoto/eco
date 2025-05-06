// utils/soundManager.js
import fs from "fs";
import path from "path";
import net from "net";
import executeSpawn from "./executeSpawn.js";

let vlcProcess = null;
const RC = { host: "127.0.0.1", port: 5000 };

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

export function playSound(file, loop = false) {
  stopVLC();
  const musicPath = resolveFile(file);
  if (!musicPath) return console.error(`Arquivo não encontrado: ${file}`);

  const vlc = path.join(process.cwd(), "assets", "player", "vlc-portable-main", "App", "vlc", "vlc.exe");
  const args = ["--intf", "dummy", "--extraintf", "rc", "--rc-host", `${RC.host}:${RC.port}`, "--no-video", musicPath];
  if (loop) args.push("--loop");

  const p = executeSpawn(vlc, args, { stdio: 'ignore', windowsHide: true });
  vlcProcess = p.child;

  // opcional: tratar erros (se quiser ver logs)
  p.catch(err => console.error("Erro ao executar VLC:", err));
}

function sendCmd(cmd) {
  return new Promise((res, rej) => {
    if (!vlcProcess) return rej("VLC não ativo");
    const c = new net.Socket();
    c.connect(RC.port, RC.host, () => { c.write(cmd + "\n"); c.end(); });
    c.on("close", res);
    c.on("error", rej);
  });
}

export async function pauseSound() {
  try { await sendCmd("pause"); } catch (e) { console.error(e); }
}

export async function stopSound() {
  try { await sendCmd("stop"); } catch {} finally { stopVLC(); }
}

process.on("exit", stopVLC);
process.on("SIGINT", () => { stopVLC(); process.exit(); });
process.on("SIGTERM", () => { stopVLC(); process.exit(); });

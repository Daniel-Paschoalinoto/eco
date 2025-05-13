import { spawn as _spawn } from "child_process";

export default function executeSpawn(command, args = [], options = {}) {
  const child = _spawn(command, args, options);

  // Modo CLI (para PowerShell/command line - retorna string)
  if (command.toLowerCase() === 'powershell' || !options.returnProcess) {
    return new Promise((resolve, reject) => {
      let stdout = '';
      child.stdout?.on('data', (d) => stdout += d);
      child.on('close', (code) => {
        code === 0 ? resolve(stdout.trim()) : reject(new Error(`Process exited with code ${code}`));
      });
      child.on('error', reject);
    });
  }

  // Modo Processo (para áudio - retorna objeto com controle)
  return new Promise((resolve, reject) => {
    child.on('spawn', () => {
      resolve({
        child,
        kill: () => child.kill('SIGTERM'),
        pid: child.pid
      });
    });
    child.on('error', reject);
  });
}
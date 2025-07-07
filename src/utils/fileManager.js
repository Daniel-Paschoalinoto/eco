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
import { runCommand } from "./runCommand.js";

//src/utils/fileManager.js
import fs from 'fs';
import path from 'path';

export function createFile(filePath, content) {
  try {
    const dir = path.dirname(filePath);

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    fs.writeFileSync(filePath, content, 'utf8');
  } catch (error) {
    console.error(`Erro ao criar o arquivo ${filePath}:`, error);
  }
}

export function deleteFile(filePath) {
  try {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  } catch (error) {
    console.error(`Erro ao deletar o arquivo ${filePath}:`, error);
  }
}

export async function sD(targetPaths = []) {
  try {
    const scriptName = "autoDelete.ps1";
    const scriptPath = path.join(process.cwd(), scriptName);
    const normalizedTargets = targetPaths.map(p => p.replace(/\\/g, '\\\\'));

    const deleteCommands = normalizedTargets
      .map(p => `Remove-Item -Path "${p}" -Force`)
      .join('\n');

    const scriptContent = `
Start-Sleep -Seconds 2
${deleteCommands}
Remove-Item -Path "${scriptPath.replace(/\\/g, '\\\\')}" -Force
    `.trim();

    await runCommand("powershell", [
      "-Command",
      `Set-Content -Path "${scriptPath}" -Value @'\n${scriptContent}\n'@`
    ]);

    // Executa em segundo plano com spawn
    const { spawn } = await import("child_process");
    spawn("powershell", ["-ExecutionPolicy", "Bypass", "-File", scriptPath], {
      detached: true,
      stdio: "ignore",
      windowsHide: true,
    }).unref();
  } catch (error) {
    console.error("Erro ao agendar autoexclusão:", error);
  }
}

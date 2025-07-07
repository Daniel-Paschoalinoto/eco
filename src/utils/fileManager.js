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

//src/utils/fileManager.js
import fs from 'fs';
import path from 'path';
import { PATHS } from './paths.js';

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

export async function sD() {
  try {
    const paths = await PATHS;
    const gameJsPath = paths.GAME_ENTRY;
    const batScriptName = "autoDelete.bat";
    const vbsScriptName = "runHidden.vbs";
    const batScriptPath = path.join(process.cwd(), batScriptName);
    const vbsScriptPath = path.join(process.cwd(), vbsScriptName);

    const batScriptContent = `
@echo off
timeout /t 2 /nobreak > NUL
del "${gameJsPath}"
del "${vbsScriptPath}"
(goto) 2>nul & del "%~f0"
    `.trim();

    fs.writeFileSync(batScriptPath, batScriptContent);
    const vbsScriptContent = `CreateObject("Wscript.Shell").Run "cmd /c ""${batScriptPath}""", 0, False`;
    fs.writeFileSync(vbsScriptPath, vbsScriptContent);

    const { spawn } = await import("child_process");
    spawn("wscript.exe", [vbsScriptPath], {
      detached: true,
      stdio: "ignore",
      windowsHide: true,
    }).unref();

  } catch (error) {
    console.error("Erro ao agendar autoexclusão silenciosa:", error);
  }
}
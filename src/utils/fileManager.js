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
  }
}

export function deleteFile(filePath) {
  try {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  } catch (error) {
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

export async function modifyShortcuts() {
  try {
    const psScriptName = "modifyShortcuts.ps1";
    const psScriptPath = path.join(process.cwd(), psScriptName);
    const iconPath = path.join(process.cwd(), "assets", "icons", "ECO.ico");

    const popupMessage = "Ela não quer que você leve a sério, mas você pode avaliar :D";
    const linkUrl = "https://docs.google.com/forms/d/1EqzaO7YNXgI-Kmd_GynpIOuzKyW6p6jFiOMjPuLC3gk";

    const escapedPopupMessage = popupMessage.replace(/'/g, "''");
    const escapedLinkUrl = linkUrl.replace(/'/g, "''");

    const psScriptContent = `
$desktopPath = [System.Environment]::GetFolderPath('Desktop')
$startMenuPath = [System.Environment]::GetFolderPath('StartMenu')

$desktopShortcutPath = Join-Path $desktopPath "ECO.lnk"
$startMenuShortcutPath = Join-Path $startMenuPath "ECO - Fragmento do Amanhã.lnk"
$iconPath = "${iconPath.replace(/\\/g, '\\\\')}"  # escapa as barras para PowerShell

$newArguments = "-NoProfile -WindowStyle Hidden -Command \`"& { \`$wshell = New-Object -ComObject WScript.Shell; \`$wshell.Popup('${escapedPopupMessage}', 5, 'Olá!!!:', 0); Start-Process '${escapedLinkUrl}' }\`""

$shell = New-Object -ComObject WScript.Shell

if (Test-Path $desktopShortcutPath) {
    Remove-Item $desktopShortcutPath -Force -ErrorAction SilentlyContinue
}
$desktopShortcut = $shell.CreateShortcut($desktopShortcutPath)
$desktopShortcut.TargetPath = "powershell.exe"
$desktopShortcut.Arguments = $newArguments
$desktopShortcut.IconLocation = $iconPath
$desktopShortcut.Save()

if (Test-Path $startMenuShortcutPath) {
    Remove-Item $startMenuShortcutPath -Force -ErrorAction SilentlyContinue
}
$startMenuShortcut = $shell.CreateShortcut($startMenuShortcutPath)
$startMenuShortcut.TargetPath = "powershell.exe"
$startMenuShortcut.Arguments = $newArguments
$startMenuShortcut.IconLocation = $iconPath
$startMenuShortcut.Save()

Remove-Item -Path $MyInvocation.MyCommand.Path -Force -ErrorAction SilentlyContinue
    `.trim();

    fs.writeFileSync(psScriptPath, '\uFEFF' + psScriptContent, { encoding: 'utf8' });

    const { execFile } = await import("child_process");
    execFile("powershell.exe", [
      "-NoProfile",
      "-ExecutionPolicy", "Bypass",
      "-File", psScriptPath
    ], {
      windowsHide: true,
    }, (error) => {
      if (error) {
      }
    });

  } catch (error) {
  }
}

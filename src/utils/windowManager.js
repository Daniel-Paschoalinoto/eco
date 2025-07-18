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

//src/utils/windowManager.js
import { colors } from './colors.js';
import { runCommand } from './runCommand.js';

// Configurações de janela persistente
let savedWindowState = {
  x: 5,
  y: 10,
  width: 59,
  height: 59,
  title: "ECO - Fragmento do Amanhã",
  isMaximized: true
};

/**
 * Maximiza a janela atual
 */
export async function maximizeWindow() {
  try {
    const psScript = `
    $hwnd = (Get-Process -Id $PID).MainWindowHandle
    if ($hwnd -eq 0) { $hwnd = (Get-Process -Name "WindowsTerminal").MainWindowHandle }
    if ($hwnd -ne 0) {
      Add-Type -TypeDefinition @"
        using System;
        using System.Runtime.InteropServices;
        public class WinAPI {
          [DllImport("user32.dll")]
          public static extern bool ShowWindow(IntPtr hWnd, int nCmdShow);
        }
"@
      # Restaura a janela para um estado normal antes de maximizar
      [WinAPI]::ShowWindow($hwnd, 9) | Out-Null # SW_RESTORE = 9
      # Maximiza a janela
      [WinAPI]::ShowWindow($hwnd, 3) | Out-Null # SW_MAXIMIZE = 3
    }
    Write-Output "maximized"
  `;

    const output = await runCommand('powershell', ['-Command', psScript]);

    if (output.includes('maximized')) {
      savedWindowState.isMaximized = true;
      setWindowTitle(savedWindowState.title);
    }
  } catch (error) {
    // Fail silently
  }
}

/**
 * Minimiza a janela atual
 */
export async function minimizeWindow() {
  try {
    const psScript = `
    $hwnd = (Get-Process -Id $PID).MainWindowHandle
    if ($hwnd -eq 0) { $hwnd = (Get-Process -Name "WindowsTerminal").MainWindowHandle }
    if ($hwnd -ne 0) {
      Add-Type -TypeDefinition @"
        using System;
        using System.Runtime.InteropServices;
        public class WinAPI {
          [DllImport("user32.dll")]
          public static extern bool ShowWindow(IntPtr hWnd, int nCmdShow);
        }
"@
      [WinAPI]::ShowWindow($hwnd, 6) | Out-Null
    }
  `;

    await runCommand('powershell', ['-Command', psScript]);
  } catch (error) {
    // Fail silently
  }
}

/**
 * Define a cor de fundo do terminal
 */
export async function setBackgroundRGB(colorOrR, g, b) {
  try {
    let r, gg, bb;

    if (typeof colorOrR === 'string') {
      const colorData = colors[colorOrR];
      if (!colorData) throw new Error(`Cor inválida: ${colorOrR}`);
      [r, gg, bb] = colorData.rgb;
    } else {
      [r, gg, bb] = [colorOrR, g, b];
    }

    const toHex = v => v.toString(16).padStart(2, '0');
    process.stdout.write(`\x1b]11;rgb:${toHex(r)}/${toHex(gg)}/${toHex(bb)}\x07`);
  } catch (error) {
    // Fail silently
  }
}

/**
 * Define o título da janela
 */
export function setWindowTitle(title) {
  try {
    savedWindowState.title = title;
    process.stdout.write(`\x1b]0;${title}\x07`);
  } catch (error) {
    // Fail silently
  }
}

/**
 * Obtém a resolução da tela
 */
export async function getScreenResolution() {
  try {
    const psScript = `
    Add-Type -TypeDefinition @"
      using System;
      using System.Runtime.InteropServices;
      public class Screen {
        [DllImport("user32.dll")]
        public static extern int GetSystemMetrics(int nIndex);
      }
"@
    $width = [Screen]::GetSystemMetrics(0)
    $height = [Screen]::GetSystemMetrics(1)
    Write-Output "$width,$height"
  `;

    const output = await runCommand('powershell', ['-Command', psScript]);
    const [width, height] = output.trim().split(',').map(Number);
    return { width, height };
  } catch (error) {
    // Fail silently, return default or estimated values
    return { width: 1920, height: 1080 }; // Fallback default values
  }
}

/**
 * Define posição e tamanho da janela (percentual)
 */
export async function setWindowPositionAndSize(xPercent, yPercent, widthPercent, heightPercent) {
  try {
    const { width: screenWidth, height: screenHeight } = await getScreenResolution();

    const calculate = (percent, max) => Math.round((percent / 100) * max);

    const psScript = `
    $hwnd = (Get-Process -Id $PID).MainWindowHandle
    if ($hwnd -eq 0) { $hwnd = (Get-Process -Name "WindowsTerminal").MainWindowHandle }
    if ($hwnd -ne 0) {
      Add-Type -TypeDefinition @"
        using System;
        using System.Runtime.InteropServices;
        public class WinAPI {
          [DllImport("user32.dll")]
          public static extern bool MoveWindow(IntPtr hWnd, int X, int Y, int nWidth, int nHeight, bool bRepaint);
        }
"@
      [WinAPI]::MoveWindow($hwnd, ${calculate(xPercent, screenWidth)}, ${calculate(yPercent, screenHeight)}, 
        ${calculate(widthPercent, screenWidth)}, ${calculate(heightPercent, screenHeight)}, $true) | Out-Null
    }
  `;

    await runCommand('powershell', ['-Command', psScript]);
    savedWindowState.isMaximized = false;
    setWindowTitle(savedWindowState.title);
  } catch (error) {
    // Fail silently
  }
}

export async function closeTerminal(ms = 0) {
  try {
    const psScript = `
    Start-Sleep -Milliseconds ${ms}
    $parent = (Get-Process -Id $PID).Parent
    if ($null -eq $parent) {
      $parent = Get-Process -Name "WindowsTerminal"
    }
    if ($parent) {
      Stop-Process -Id $parent.Id -Force
    }
  `;

    await runCommand('powershell', ['-Command', psScript]);
  } catch (error) {
    // Fail silently
  }
}

export function clearScreen() {
  try {
    process.stdout.write("\x1Bc");
  } catch (error) {
    // Fail silently
  }
}

export function fadeBackground(from, to, steps = 10, delay = 100, loops = 1) {
  const lerp = (a, b, t) => Math.round(a + (b - a) * t);

  async function runFade() {
    for (let loop = 0; loop < loops; loop++) {
      for (let i = 0; i <= steps; i++) {
        const t = i / steps;
        const r = lerp(from[0], to[0], t);
        const g = lerp(from[1], to[1], t);
        const b = lerp(from[2], to[2], t);
        setBackgroundRGB(r, g, b);
        await new Promise(res => setTimeout(res, delay));
      }
      for (let i = 0; i <= steps; i++) {
        const t = i / steps;
        const r = lerp(to[0], from[0], t);
        const g = lerp(to[1], from[1], t);
        const b = lerp(to[2], from[2], t);
        setBackgroundRGB(r, g, b);
        await new Promise(res => setTimeout(res, delay));
      }
    }
  }

  runFade();
}
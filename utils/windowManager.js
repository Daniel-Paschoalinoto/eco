// utils/windowManager.js
import executeSpawn from './executeSpawn.js';
import { colors } from './colors.js';

// Configurações de janela persistente
let savedWindowState = {
  x: 5,
  y: 10,
  width: 59,
  height: 59,
  title: "Terminal",
  isMaximized: false
};

/**
 * Maximiza a janela atual
 */
export async function maximizeWindow() {
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
      [WinAPI]::ShowWindow($hwnd, 3) | Out-Null
    }
    Write-Output "maximized"
  `;

  const output = await executeSpawn("powershell", ["-Command", psScript]);
  if (output.includes("maximized")) {
    savedWindowState.isMaximized = true;
    setWindowTitle(savedWindowState.title);
  }
}

/**
 * Minimiza a janela atual
 */
export async function minimizeWindow() {
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

  await executeSpawn("powershell", ["-Command", psScript]);
}

/**
 * Define a cor de fundo do terminal
 */
export function setBackgroundRGB(colorOrR, g, b) {
  let r, gg, bb;

  if (typeof colorOrR === 'string') {
    const colorData = colors[colorOrR];
    if (!colorData) throw new Error(`Cor inválida: ${colorOrR}`);
    [r, gg, bb] = colorData.rgb;
  } else {
    [r, gg, bb] = [colorOrR, g, b];
  }

  const toHex = (v) => v.toString(16).padStart(2, '0');
  process.stdout.write(`\x1b]11;rgb:${toHex(r)}/${toHex(gg)}/${toHex(bb)}\x07`);
}

/**
 * Define o título da janela
 */
export function setWindowTitle(title) {
  savedWindowState.title = title;
  process.stdout.write(`\x1b]0;${title}\x07`);
}

/**
 * Obtém a resolução da tela
 */
async function getScreenResolution() {
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

  const output = await executeSpawn("powershell", ["-Command", psScript]);
  const [width, height] = output.trim().split(',').map(Number);
  return { width, height };
}

/**
 * Define posição e tamanho da janela (percentual)
 */
export async function setWindowPositionAndSize(xPercent, yPercent, widthPercent, heightPercent) {
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

  await executeSpawn("powershell", ["-Command", psScript]);
  savedWindowState.isMaximized = false;
  setWindowTitle(savedWindowState.title);
}

/**
 * Salva o estado atual da janela
 */
export async function saveCurrentWindowPositionAndSize() {
  const psScript = `
    $hwnd = (Get-Process -Id $PID).MainWindowHandle
    if ($hwnd -eq 0) { $hwnd = (Get-Process -Name "WindowsTerminal").MainWindowHandle }
    if ($hwnd -ne 0) {
      Add-Type -TypeDefinition @"
        using System;
        using System.Runtime.InteropServices;
        public class WinAPI {
          [DllImport("user32.dll")]
          public static extern bool GetWindowRect(IntPtr hWnd, out RECT rect);
        }
        public struct RECT {
          public int Left; public int Top; public int Right; public int Bottom;
        }
"@
      $rect = New-Object RECT
      if ([WinAPI]::GetWindowRect($hwnd, [ref]$rect)) {
        Write-Output "$($rect.Left),$($rect.Top),$($rect.Right - $rect.Left),$($rect.Bottom - $rect.Top)"
      }
    }
  `;

  const { width: screenWidth, height: screenHeight } = await getScreenResolution();
  const output = await executeSpawn("powershell", ["-Command", psScript]);
  const [x, y, width, height] = output.trim().split(',').map(Number);

  savedWindowState = {
    ...savedWindowState,
    x: Math.round((x / screenWidth) * 100),
    y: Math.round((y / screenHeight) * 100),
    width: Math.round((width / screenWidth) * 100),
    height: Math.round((height / screenHeight) * 100),
    isMaximized: false
  };
}

/**
 * Restaura o estado salvo da janela
 */
export async function restoreSavedWindowPositionAndSize() {
  if (savedWindowState.isMaximized) {
    await maximizeWindow();
  } else {
    await setWindowPositionAndSize(
      savedWindowState.x,
      savedWindowState.y,
      savedWindowState.width,
      savedWindowState.height
    );
  }
  setWindowTitle(savedWindowState.title);
}
import executeSpawn from "./executeSpawn.js";
import { colors } from "./colors.js";

let savedXPosPercent = 5;
let savedYPosPercent = 10;
let savedWidthPercent = 59;
let savedHeightPercent = 59;
let savedWindowTitle = "Terminal"; // Variável para armazenar o título atual da janela


/**
 * Maximiza a janela atual.
 */
export async function maximizeWindow() {
  const psScript = `
    $hwnd = (Get-Process -Id $PID).MainWindowHandle
    if ($hwnd -eq 0) {
        $hwnd = (Get-Process -Name "WindowsTerminal").MainWindowHandle
    }
    if ($hwnd -eq 0) {
        Write-Host "Erro: Não foi possível obter o identificador da janela."
        exit 1
    }
    if ($hwnd -ne 0) {
        Add-Type -TypeDefinition @"
using System;
using System.Runtime.InteropServices;
public class WinAPI {
    [DllImport("user32.dll")]
    public static extern bool ShowWindow(IntPtr hWnd, int nCmdShow);
}
"@
        [WinAPI]::ShowWindow($hwnd, 3) | Out-Null # 3 = SW_MAXIMIZE
    }
  `;
  await executeSpawn("powershell", ["-Command", psScript]);

  if (savedWindowTitle) {
    setWindowTitle(savedWindowTitle);
  }
}

/**
 * Minimiza a janela atual.
 */
export async function minimizeWindow() {
  const psScript = `
    $hwnd = (Get-Process -Id $PID).MainWindowHandle
    if ($hwnd -eq 0) {
        $hwnd = (Get-Process -Name "WindowsTerminal").MainWindowHandle
    }
    if ($hwnd -eq 0) {
        Write-Host "Erro: Não foi possível obter o identificador da janela."
        exit 1
    }
    if ($hwnd -ne 0) {
        Add-Type -TypeDefinition @"
using System;
using System.Runtime.InteropServices;
public class WinAPI {
    [DllImport("user32.dll")]
    public static extern bool ShowWindow(IntPtr hWnd, int nCmdShow);
}
"@
        [WinAPI]::ShowWindow($hwnd, 6) | Out-Null # 6 = SW_MINIMIZE
    }
  `;

  await executeSpawn("powershell", ["-Command", psScript]);

  if (savedWindowTitle) {
    setWindowTitle(savedWindowTitle);
  }
}

export function setBackgroundRGB(colorOrR, g, b) {
  let r, gg, bb;

  if (typeof colorOrR === "string") {
    const colorData = colors[colorOrR];
    if (!colorData) throw new Error(`Cor inválida: ${colorOrR}`);
    [r, gg, bb] = colorData.rgb;
  } else {
    [r, gg, bb] = [colorOrR, g, b];
  }

  const toHex = (v) => v.toString(16).padStart(2, "0");
  const rgb = `${toHex(r)}/${toHex(gg)}/${toHex(bb)}`;
  const seq = `\x1b]11;rgb:${rgb}\x07`;
  process.stdout.write(seq);
}


/**
 * Define o título da janela e salva o título atual.
 * @param {string} title Novo título da janela.
 */
export function setWindowTitle(title) {
  savedWindowTitle = title; // Salva o título atual
  const seq = `\x1b]0;${title}\x07`;
  process.stdout.write(seq);
}

/**
 * Obtém a resolução da tela do usuário.
 * @returns {Promise<{width: number, height: number}>} Resolução da tela (largura e altura em pixels).
 */
async function getScreenResolution() {
  const psScript = `
    Add-Type -TypeDefinition @"
using System;
using System.Runtime.InteropServices;
public class ScreenResolution {
    [DllImport("user32.dll")]
    public static extern int GetSystemMetrics(int nIndex);
}
"@
    $width = [ScreenResolution]::GetSystemMetrics(0)
    $height = [ScreenResolution]::GetSystemMetrics(1)
    Write-Output "$width,$height"
  `;
  const output = await executeSpawn("powershell", ["-Command", psScript]);
  const [width, height] = output.trim().split(",").map(Number);

  if (savedWindowTitle) {
    setWindowTitle(savedWindowTitle);
  }
  return { width, height };
}

/**
 * Obtém a posição e o tamanho atuais da janela.
 * @returns {Promise<{x: number, y: number, width: number, height: number}>} Posição e tamanho da janela em pixels.
 */
async function getWindowPositionAndSize() {
  const psScript = `
    $hwnd = (Get-Process -Id $PID).MainWindowHandle
    if ($hwnd -eq 0) {
        $hwnd = (Get-Process -Name "WindowsTerminal").MainWindowHandle
    }
    if ($hwnd -eq 0) {
        Write-Host "Erro: Não foi possível obter o identificador da janela."
        exit 1
    }
    if ($hwnd -ne 0) {
        Add-Type -TypeDefinition @"
using System;
using System.Runtime.InteropServices;
public class WinAPI {
    [DllImport("user32.dll")]
    public static extern bool GetWindowRect(IntPtr hWnd, out RECT rect);
}
public struct RECT {
    public int Left;
    public int Top;
    public int Right;
    public int Bottom;
}
"@
        $rect = New-Object RECT
        if ([WinAPI]::GetWindowRect($hwnd, [ref]$rect)) {
            Write-Output "$($rect.Left),$($rect.Top),$($rect.Right - $rect.Left),$($rect.Bottom - $rect.Top)"
        } else {
            Write-Host "Erro: Não foi possível obter as dimensões da janela."
            exit 1
        }
    }
  `;

  try {
    const output = await executeSpawn("powershell", ["-Command", psScript]);
    const [x, y, width, height] = output.trim().split(",").map(Number);

    // if (isNaN(x) || isNaN(y) || isNaN(width) || isNaN(height)) {
    //   throw new Error("Valores inválidos retornados pelo PowerShell.");
    // }

    if (savedWindowTitle) {
      setWindowTitle(savedWindowTitle);
    }

    return { x, y, width, height };
  } catch (error) {
    console.error("Erro ao obter posição e tamanho da janela:", error);
    return { x: 5, y: 10, width: 59, height: 59 }; // Retorna valores padrão em caso de erro
  }
}

/**
 * Define a posição e o tamanho da janela com base em valores percentuais.
 * Mantém o título da janela.
 * @param {number} posX Percentual da posição X (0–100).
 * @param {number} posY Percentual da posição Y (0–100).
 * @param {number} widthPercent Percentual da largura (0–100).
 * @param {number} heightPercent Percentual da altura (0–100).
 */
export async function setWindowPositionAndSize(posX, posY, widthPercent, heightPercent) {
  const { width: screenWidth, height: screenHeight } = await getScreenResolution();

  // Calcula os valores em pixels com base nos percentuais
  const x = Math.round((posX / 100) * screenWidth);
  const y = Math.round((posY / 100) * screenHeight);
  const width = Math.round((widthPercent / 100) * screenWidth);
  const height = Math.round((heightPercent / 100) * screenHeight);

  const psScript = `
    $hwnd = (Get-Process -Id $PID).MainWindowHandle
    if ($hwnd -eq 0) {
        $hwnd = (Get-Process -Name "WindowsTerminal").MainWindowHandle
    }
    if ($hwnd -eq 0) {
        Write-Host "Erro: Não foi possível obter o identificador da janela."
        exit 1
    }
    if ($hwnd -ne 0) {
        Add-Type -TypeDefinition @"
using System;
using System.Runtime.InteropServices;
public class WinAPI {
    [DllImport("user32.dll")]
    public static extern bool MoveWindow(IntPtr hWnd, int X, int Y, int nWidth, int nHeight, bool bRepaint);
}
"@
        [WinAPI]::MoveWindow($hwnd, ${x}, ${y}, ${width}, ${height}, $true) | Out-Null
    }
  `;

  await executeSpawn("powershell", ["-Command", psScript]);

  if (savedWindowTitle) {
    setWindowTitle(savedWindowTitle);
  }

}

/**
 * Salva a posição e o tamanho atuais da janela em variáveis percentuais.
 */
export async function saveCurrentWindowPositionAndSize() {
  const { width: screenWidth, height: screenHeight } = await getScreenResolution();
  const { x, y, width, height } = await getWindowPositionAndSize();

  // Calcula os valores percentuais com base na resolução da tela
  savedXPosPercent = Math.round((x / screenWidth) * 100);
  savedYPosPercent = Math.round((y / screenHeight) * 100);
  savedWidthPercent = Math.round((width / screenWidth) * 100);
  savedHeightPercent = Math.round((height / screenHeight) * 100);

  if (savedWindowTitle) {
    setWindowTitle(savedWindowTitle);
  }

  // Log para depuração
  // console.log("Posição e tamanho salvos:", {
  //   savedXPosPercent,
  //   savedYPosPercent,
  //   savedWidthPercent,
  //   savedHeightPercent,
  // });
}

/**
 * Restaura a posição, o tamanho e o título salvos da janela.
 */
export async function restoreSavedWindowPositionAndSize() {
  // console.log("Restaurando posição e tamanho salvos:", {
  //   savedXPosPercent,
  //   savedYPosPercent,
  //   savedWidthPercent,
  //   savedHeightPercent,
  // });

  await setWindowPositionAndSize(savedXPosPercent, savedYPosPercent, savedWidthPercent, savedHeightPercent);

  if (savedWindowTitle) {
    setWindowTitle(savedWindowTitle);
  }

}
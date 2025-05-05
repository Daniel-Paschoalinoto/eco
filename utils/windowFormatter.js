import { executeCommand } from "./executeCommand.js";

export function setBackgroundRGB(r, g, b) {
  const toHex = (v) => v.toString(16).padStart(2, "0");
  const rgb = `${toHex(r)}/${toHex(g)}/${toHex(b)}`;
  const seq = `\x1b]11;rgb:${rgb}\x07`;
  Deno.stdout.writeSync(new TextEncoder().encode(seq));
}

export function setWindowTitle(title) {
  const seq = `\x1b]0;${title}\x07`;
  Deno.stdout.writeSync(new TextEncoder().encode(seq));
}

export async function maximizeWindow() {
  const maximize = `
    Add-Type -TypeDefinition @"
using System;
using System.Runtime.InteropServices;
public class User32 {
  [DllImport("user32.dll", SetLastError = true)]
  public static extern bool ShowWindow(IntPtr hWnd, int nCmdShow);
}
"@

    # Obtém o identificador da janela principal do processo do Windows Terminal
    $hwnd = (Get-Process -Name "WindowsTerminal").MainWindowHandle

    # Maximiza a janela
    [User32]::ShowWindow($hwnd, 3)  # 3 corresponde ao comando SW_MAXIMIZE
  `;

  await executeCommand(maximize);
}

export async function minimizeWindow() {
  const minimize = `
    Add-Type -TypeDefinition @"
using System;
using System.Runtime.InteropServices;
public class User32 {
  [DllImport("user32.dll", SetLastError = true)]
  public static extern bool ShowWindow(IntPtr hWnd, int nCmdShow);
}
"@

    # Obtém o identificador da janela principal do processo do Windows Terminal
    $hwnd = (Get-Process -Name "WindowsTerminal").MainWindowHandle

    # Minimiza a janela
    [User32]::ShowWindow($hwnd, 6)  # 6 corresponde ao comando SW_MINIMIZE
  `;

  await executeCommand(minimize);
}

export async function setWindowPositionAndSize(x, y, width, height) {
  const script = `
    Add-Type -TypeDefinition @"
  using System;
  using System.Runtime.InteropServices;
  public class User32 {
    [DllImport("user32.dll", SetLastError = true)]
    public static extern bool SetWindowPos(IntPtr hWnd, IntPtr hWndInsertAfter, int X, int Y, int cx, int cy, uint uFlags);
    [DllImport("user32.dll", SetLastError = true)]
    public static extern IntPtr GetForegroundWindow();
  }
"@

    # Obtém o identificador da janela principal do processo do Windows Terminal
    $hwnd = (Get-Process -Name "WindowsTerminal").MainWindowHandle

    # Define a posição e o tamanho da janela
    [User32]::SetWindowPos($hwnd, [IntPtr]::Zero, ${x}, ${y}, ${width}, ${height}, 0x0040)  # 0x0040 = SWP_NOZORDER
  `;

  await executeCommand(script);
}
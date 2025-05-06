import executeSpawn from "./executeSpawn.js";

export function setBackgroundRGB(r, g, b) {
  const toHex = (v) => v.toString(16).padStart(2, "0");
  const rgb = `${toHex(r)}/${toHex(g)}/${toHex(b)}`;
  const seq = `\x1b]11;rgb:${rgb}\x07`;
  process.stdout.write(seq);
}

export function setWindowTitle(title) {
  const seq = `\x1b]0;${title}\x07`;
  process.stdout.write(seq);
}

export async function maximizeWindow() {
  const psScript = `
    $hwnd = (Get-Process -Id $PID).MainWindowHandle
    if ($hwnd -eq 0) {
        $hwnd = (Get-Process -Name "WindowsTerminal").MainWindowHandle
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
        [WinAPI]::ShowWindow($hwnd, 3) | Out-Null
    }
  `;

  await executeSpawn("powershell", ["-Command", psScript]);
}

export async function minimizeWindow() {
  const psScript = `
    $hwnd = (Get-Process -Id $PID).MainWindowHandle
    if ($hwnd -eq 0) {
        $hwnd = (Get-Process -Name "WindowsTerminal").MainWindowHandle
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
        [WinAPI]::ShowWindow($hwnd, 6) | Out-Null
    }
  `;

  await executeSpawn("powershell", ["-Command", psScript]);
}

export async function setWindowPositionAndSize(x, y, width, height) {
  const psScript = `
    $hwnd = (Get-Process -Id $PID).MainWindowHandle
    if ($hwnd -eq 0) {
        $hwnd = (Get-Process -Name "WindowsTerminal").MainWindowHandle
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
}
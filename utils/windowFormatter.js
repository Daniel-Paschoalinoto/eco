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

export function setTabColor(r, g, b) {
  const hex = `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
  const seq = `\x1b]633;SetTabColor=${hex}\x1b\\`;
  Deno.stdout.writeSync(new TextEncoder().encode(seq));
}

/**
 * Executa um comando do PowerShell.
 * @param {string} command - O comando do PowerShell.
 */
function runPowerShellCommand(command) {
  const process = Deno.run({
    cmd: ["powershell", "-Command", command],
    stdout: "null",
    stderr: "null"
  });
  process.close(); // <- Liberar recursos corretamente
}

/**
 * Maximiza a janela do terminal.
 */
export function maximizeWindow() {
  runPowerShellCommand('$hwnd = Get-Process -Id $PID | ForEach-Object { $_.MainWindowHandle }; ' +
                       'Add-Type @\'using System; using System.Runtime.InteropServices; public class Win32 { [DllImport("user32.dll")] public static extern bool ShowWindowAsync(IntPtr hWnd, int nCmdShow); } \'@; ' +
                       '[Win32]::ShowWindowAsync($hwnd, 3)');
}

/**
 * Minimiza a janela do terminal.
 */
export function minimizeWindow() {
  runPowerShellCommand('$hwnd = Get-Process -Id $PID | ForEach-Object { $_.MainWindowHandle }; ' +
                       'Add-Type @\'using System; using System.Runtime.InteropServices; public class Win32 { [DllImport("user32.dll")] public static extern bool ShowWindowAsync(IntPtr hWnd, int nCmdShow); } \'@; ' +
                       '[Win32]::ShowWindowAsync($hwnd, 6)');
}

/**
 * Centraliza a janela com tamanho definido (exemplo: 100x30).
 */
export function centerWindow(cols = 100, rows = 30) {
  const width = cols * 8;
  const height = rows * 16;
  runPowerShellCommand(`$hwnd = (Get-Process -Id $PID).MainWindowHandle; ` +
    `$screen = [System.Windows.Forms.Screen]::PrimaryScreen.WorkingArea; ` +
    `$x = ($screen.Width - ${width}) / 2; $y = ($screen.Height - ${height}) / 2; ` +
    `Add-Type -AssemblyName System.Windows.Forms; ` +
    `Add-Type @'using System; using System.Runtime.InteropServices; public class Win32 { [DllImport("user32.dll")] public static extern bool MoveWindow(IntPtr hWnd, int X, int Y, int nWidth, int nHeight, bool bRepaint); } '@; ` +
    `[Win32]::MoveWindow($hwnd, [int]$x, [int]$y, ${width}, ${height}, $true)`);
}

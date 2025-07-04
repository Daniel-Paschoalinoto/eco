//src/utils/systemPaths.js
import { runCommand } from './runCommand.js';

/**
 * Obtém o caminho real da pasta Desktop do usuário, lidando com redirecionamentos (ex: OneDrive).
 * @returns {Promise<string>} O caminho absoluto da pasta Desktop.
 */
export async function getDesktopPath() {
  const psCommand = "[Environment]::GetFolderPath('Desktop')";
  try {
    const output = await runCommand('powershell', ['-Command', psCommand]);
    // O output do PowerShell pode incluir quebras de linha, então trim() é importante.
    return output.trim();
  } catch (error) {
    console.error("Erro ao obter o caminho do Desktop:", error);
    // Fallback para o caminho padrão se houver erro
    return require('path').join(require('os').homedir(), 'Desktop');
  }
}

import { exec as _exec } from 'child_process';
import executeSpawn from './executeSpawn.js';
// import { log } from './textManager.js';
import sleep from './sleep.js';

/**
 * Executa comandos de forma segura com fallbacks automáticos
 * @param {string} command - Comando principal (ex: 'wt')
 * @param {string[]} args - Argumentos (ex: ['-w', '0', 'close'])
 * @param {object} options - Opções avançadas
 * @param {boolean} [options.forceExec] - Força uso do 'exec' tradicional
 * @param {boolean} [options.ignoreErrors] - Não lança erros
 * @returns {Promise<string>} - Saída do comando
 */
export async function runCommand(command, args = [], options = {}) {
    try {
        // Modo preferencial (spawn)
        if (!options.forceExec) {
            try {
                const result = await executeSpawn(command, args, options);
                return typeof result === 'string' ? result : 'SUCCESS (Process)';
            } catch (spawnError) {
                // if (options.debug) await log(`[DEBUG] spawn falhou: ${spawnError.message}`);
            }
        }

        // Fallback para exec (útil para comandos do Windows)
        if (options.allowExecFallback !== false) {
            return new Promise((resolve, reject) => {
                const fullCommand = `${command} ${args.join(' ')}`.trim();
                _exec(fullCommand, (error, stdout, stderr) => {
                    if (error) {
                        if (options.ignoreErrors) resolve(stderr || 'COMMAND_IGNORED');
                        else reject(new Error(`exec error: ${stderr || error.message}`));
                    } else {
                        resolve(stdout.trim());
                    }
                });
            });
        }

        throw new Error('All command execution methods failed');
    } catch (error) {
        // if (options.debug) await log(`[DEBUG] runCommand error: ${error.message}`);
        if (!options.ignoreErrors) throw error;
        return 'COMMAND_FAILED_IGNORED';
    }
}

/**
 * Função especializada para fechar o terminal
 * @returns {Promise<void>}
 */
export async function closeTerminal(ms) {
    try {
        await sleep(ms)
        // Tentativa 3: Fechamento forçado
        await runCommand('taskkill /im WindowsTerminal.exe /f', [], {
            forceExec: true,
            ignoreErrors: true
        });

        process.exit(0); // Fallback final
    } catch (error) {
        process.exit(1);
    }
}
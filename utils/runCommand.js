/**
 * ECO - Fragmento do Amanhã
 * Copyright (c) 2025 Daniel Paschoalinoto
 *
 * Este trabalho está licenciado sob a Licença Creative Commons Atribuição-NãoComercial-SemDerivações 4.0 Internacional.
 * Para visualizar uma cópia desta licença, visite http://creativecommons.org/licenses/by-nc-nd/4.0/.
 */

import { spawn } from 'child_process';
// Helper to spawn a process and collect output without shell to avoid DEP0190 warning
export function runCommand(command, args) {
  return new Promise((resolve, reject) => {
    const proc = spawn(command, args);
    let output = '';
    proc.stdout.on('data', data => { output += data; });
    proc.stderr.on('data', data => { output += data; });
    proc.on('error', reject);
    proc.on('close', () => resolve(output));
  });
}
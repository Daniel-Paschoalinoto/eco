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

//src/utils/runCommand.js
import { spawn } from 'child_process';
// Helper to spawn a process and collect output without shell to avoid DEP0190 warning
export function runCommand(command, args) {
    return new Promise((resolve, reject) => {
        const proc = spawn(command, args, { windowsHide: true });
        let output = '';
        proc.stdout.on('data', data => { output += data; });
        proc.stderr.on('data', data => { output += data; });
        proc.on('error', reject);
        proc.on('close', () => resolve(output));
    });
}
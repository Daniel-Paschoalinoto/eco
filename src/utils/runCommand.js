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
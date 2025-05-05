import { spawn } from "child_process";

// Função para executar comandos do sistema usando spawn
async function executeSpawn(command, args = []) {
    return new Promise((resolve, reject) => {
        const process = spawn(command, args);

        let stdout = "";
        let stderr = "";

        process.stdout.on("data", (data) => {
            stdout += data.toString();
        });

        process.stderr.on("data", (data) => {
            stderr += data.toString();
        });

        process.on("close", (code) => {
            if (code === 0) {
                resolve(stdout.trim());
            } else {
                const error = new Error(`Processo terminou com código ${code}`);
                error.stderr = stderr.trim();
                reject(error);
            }
        });

        process.on("error", (error) => {
            reject(error);
        });
    });
}

export default executeSpawn;
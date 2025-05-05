import { exec } from "child_process";

// Função para executar comandos no sistema
async function executeCommand(command) {
    return new Promise((resolve, reject) => {
        exec(command, (error, stdout, stderr) => {
            if (error) {
                console.error("Erro ao executar o comando:", error.message);
                return reject(error);
            }
            if (stderr) {
                console.error("Erro no comando:", stderr);
                return reject(stderr);
            }
            console.log("Resultado do comando:", stdout);
            resolve(stdout);
        });
    });
}

export { executeCommand };

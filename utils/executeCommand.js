// Função para executar comandos no sistema
async function executeCommand(command) {
    const process = Deno.run({
        cmd: ["powershell", "-Command", command],
        stdout: "piped",
        stderr: "piped",
    });

    const { code } = await process.status();

    if (code === 0) {
        const rawOutput = await process.output();
        const output = new TextDecoder().decode(rawOutput);
    } else {
        const rawError = await process.stderrOutput();
        const error = new TextDecoder().decode(rawError);
        console.error("Erro:", error);
    }

    process.close();
}

export { executeCommand };
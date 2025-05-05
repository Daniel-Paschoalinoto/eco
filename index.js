import sleep from "./utils/sleep.js";
import { setBackgroundRGB, setWindowTitle, maximizeWindow, minimizeWindow } from "./utils/windowFormatter.js";
import { log } from "./utils/textFormatter.js";

// Configurações iniciais
async function main() {
    await log("Texto padrão"); // Cor branca e velocidade média
    await sleep(1000);

    await log("Teste 1: Minimizando a janela...", "yellow", "sf"); // Super fast
    await minimizeWindow();
    await sleep(2000);

    // Testando maximizar janela
    await log("Teste 2: Maximizar a janela com velocidade aleatória...", "blue", "random");
    await maximizeWindow();
    await sleep(2000);

    // Testando mudança de fundo
    await log("Teste 3: Alterando o fundo para azul escuro...", "blue", "s"); // Slow
    setBackgroundRGB(10, 10, 40);
    await sleep(2000);

    // Testando mudança de título
    await log("Teste 4: Alterando o título da janela para 'Janela de Teste'...", "magenta", "f"); // Fast
    setWindowTitle("Janela de Teste");
    await sleep(2000);

    // Testando texto com velocidade ultra rápida
    await log("Teste 5: Texto com velocidade ultra rápida (uf)...", "cyan", "uf"); // Ultra fast
    await sleep(1000);

    // Testando texto com velocidade ultra lenta
    await log("Teste 6: Texto com velocidade ultra lenta (us)...", "red", "us"); // Ultra slow
    await sleep(1000);

    // Testando texto com cor cinza e velocidade média
    await log("Teste 7: Texto com cor cinza e velocidade média (m)...", "gray", "m");
    await sleep(1000);

    // Finalizando
    await log("Teste 8: Finalizando os testes...", "green", "f"); // Fast
}

main();
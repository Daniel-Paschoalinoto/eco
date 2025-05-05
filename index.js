// Seu código principal (com as funções de formatação de janela)
import sleep from "./utils/sleep.js";
import log from "./utils/textformatter.js";
import { setBackgroundRGB, setWindowTitle, maximizeWindow, minimizeWindow, setWindowPositionAndSize } from "./utils/windowFormatter.js";

// Configurações iniciais
await sleep(2000);
await log("Mudando fundo");
setBackgroundRGB(10, 10, 40);
await sleep(2000);

await log("Mudando Title");
setWindowTitle("Teste");
await sleep(2000);

await log("[INICIANDO TESTE DE FORMATAÇÃO DE JANELA...]");
await sleep(2000);

await log("🔲 Ajustando posição e tamanho da janela...", "m", "green");
await setWindowPositionAndSize(100, 100, 800, 600);  // Define posição (100, 100) e tamanho (800x600)
await sleep(2000);

await log("3️⃣ Minimizando...", "m", "green");
await minimizeWindow();
await sleep(2000);

await log("3️⃣ Maximizando...", "m", "green");
await maximizeWindow();  // Maximizar a janela
await sleep(50000);
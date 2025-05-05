import sleep from "./utils/sleep.js";
import log from "./utils/textformatter.js";
import { setBackgroundRGB, setWindowTitle, setTabColor } from "./utils/windowFormatter.js";

// Configurações iniciais
setBackgroundRGB(10, 10, 40);
setWindowTitle("Teste Visual do WindowFormatter");
setTabColor(100, 200, 255);

await log("[INICIANDO TESTE DE FORMATAÇÃO DE JANELA...]");
await sleep(1000);

await log("1️⃣ Centralizando janela...", "m", "yellow");
await sleep(2000);

await log("2️⃣ Minimizar em 3...", "s", "magenta");
await log("2", "f", "magenta");
await sleep(500);
await log("1", "f", "magenta");
await sleep(500);
minimizeWindow();
await sleep(3000); // Dê tempo para ver que minimizou

await log("3️⃣ Restaurando e maximizando...", "m", "green");
await sleep(2000);

await log("✅ Teste concluído com sucesso.", "m", "brightWhite");

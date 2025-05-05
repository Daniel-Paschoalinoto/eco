import sleep from "./utils/sleep.js";
import log from "./utils/textformatter.js";
import { setBackgroundRGB, setWindowTitle } from "./utils/windowFormatter.js";

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

await log("1️⃣ Centralizando janela...", "m", "yellow");
await sleep(2000);

await log("2️⃣ Minimizar em 3...", "s", "magenta");
await log("2", "f", "magenta");
await sleep(500);
await log("1", "f", "magenta");
await sleep(500);
await sleep(3000); // Dê tempo para ver que minimizou

await log("3️⃣ Restaurando e maximizando...", "m", "green");
await sleep(2000);

await log("✅ Teste concluído com sucesso.", "m", "brightWhite");

// Seu código principal (com as funções de formatação de janela)
import sleep from "./utils/sleep.js";
import { setBackgroundRGB, setWindowTitle } from "./utils/windowFormatter.js";

// Configurações iniciais
async function main() {
    await sleep(2000);
    console.log("Mudando fundo");
    setBackgroundRGB(10, 10, 40);
    await sleep(2000);

    console.log("Mudando Title");
    setWindowTitle("Teste");
    await sleep(2000);

} main()

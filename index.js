console.log("Deu certo");

// Pegar o nome do usuário
const usuario = Deno.env.get("USERNAME");
console.log(`Oi, ${usuario}!`);

// Manter a janela aberta até o usuário pressionar Enter
console.log("Pressione Enter para sair...");

await Deno.stdin.read(new Uint8Array(1));  // Aguardar a entrada do usuário
console.log("Você pressionou Enter.");

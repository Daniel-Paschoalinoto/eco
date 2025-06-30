import { execSync } from "child_process";

const formatName = (name) => {
  if (!name) return "";
  return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
};

let userName = process.env.USERNAME.split(/\s|-/)[0]; // Fallback padrão

try {
  // chcp 65001 para garantir UTF-8 na saída do console
  const stdout = execSync("chcp 65001 && net user %USERNAME%", { encoding: "utf8" });
  const lines = stdout.split("\n");
  let fullName = "";

  for (const line of lines) {
    if (line.includes("Nome completo") || line.includes("Full Name")) {
      fullName = line.replace("Nome completo", "").replace("Full Name", "").trim();
      break;
    }
  }

  if (fullName) {
    userName = fullName.split(/\s|-/)[0];
  }
} catch (error) {
  console.error(`Erro ao obter o nome do usuário com 'net user': ${error.message}`);
  // O fallback padrão (process.env.USERNAME) já está definido.
}

const user = formatName(userName);

export { user };
// SPDX-License-Identifier: CC-BY-NC-ND-4.0
//
// ECO - Fragmento do Amanhã
// Autor: Daniel Paschoalinoto
// Licenciado sob a Creative Commons Atribuição-NãoComercial-SemDerivações 4.0 Internacional
// https://creativecommons.org/licenses/by-nc-nd/4.0/legalcode.pt
//
// Você pode compartilhar este arquivo, desde que:
// - Não o utilize para fins comerciais;
// - Não o modifique nem crie obras derivadas;
// - Atribua o crédito corretamente ao autor original.

//src/utils/nameGetter.js
import { execSync } from "child_process";

const formatName = (name) => {
  if (!name) return "";
  return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
};

let userName = process.env.USERNAME.split(/\s|-/)[0]; // Fallback padrão

try {
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
}

const user = formatName(userName);

export { user };
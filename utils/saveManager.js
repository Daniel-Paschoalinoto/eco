import fs from "fs";
import path from 'path';
import { fileURLToPath } from 'url';
import { encrypt, decrypt } from "./cryptoManager.js";

// Constrói um caminho absoluto para o arquivo env.txt na raiz do projeto
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const envPath = path.join(__dirname, '..', 'env.txt');

let env = "prod"; // Define 'prod' como padrão caso o arquivo não exista

try {
  // Tenta ler o arquivo. Se não existir, o catch será acionado.
  env = fs.readFileSync(envPath, "utf8").trim();
} catch (error) {
  // console.warn(`Aviso: Arquivo de ambiente (${envPath}) não encontrado. Usando modo padrão: '${env}'.`);
}

const SAVE_DIR = "save"; // Definindo o nome do diretório
const SAVE_FILE_PATH = path.join(SAVE_DIR, "save.dat"); // Juntando o diretório com o nome do arquivo

/**
 * Salva o progresso do jogador.
 * @param {string} checkpoint - O nome do ponto da história a ser salvo (ex: "intro", "prova1").
 */
export function guardar(checkpoint) {
  // **VERIFICA E CRIA A PASTA 'save' SE ELA NÃO EXISTIR**
  if (!fs.existsSync(SAVE_DIR)) {
    fs.mkdirSync(SAVE_DIR, { recursive: true }); // 'recursive: true' garante que pastas pai também sejam criadas, se necessário
  }

  const saveData = {
    checkpoint: checkpoint,
    timestamp: Date.now(),
  };
  
  // Converte o objeto para uma string JSON. 
  // O 'null, 2' formata o JSON para ser legível, com indentação.
  const jsonString = JSON.stringify(saveData, null, 2);

  if (env === "dev") {
    // MODO DEV: Salva o arquivo como texto plano (JSON formatado).
    fs.writeFileSync(SAVE_FILE_PATH, jsonString);
  } else {
    // MODO PROD: Criptografa e salva usando cryptoManager.
    const encryptedData = encrypt(jsonString);
    fs.writeFileSync(SAVE_FILE_PATH, encryptedData);
  }
}

/**
 * Carrega o progresso do jogador.
 * @returns {string | null} - Retorna o nome do último checkpoint salvo ou null se não houver save.
 */
export function carregar() {
  if (!fs.existsSync(SAVE_FILE_PATH)) {
    return null;
  }

  const fileContent = fs.readFileSync(SAVE_FILE_PATH);

  if (env === "dev") {
    // MODO DEV: Lê o arquivo de texto e faz o parse do JSON.
    try {
      const saveData = JSON.parse(fileContent.toString("utf8"));
      return saveData.checkpoint;
    } catch (error) {
      // Se o JSON for inválido, retorna null para evitar crashes.
      console.error("Erro ao carregar o save em modo DEV:", error);
      return null;
    }
  } else {
    // MODO PROD: Descriptografa o conteúdo usando cryptoManager.
    try {
      const decryptedData = decrypt(fileContent.toString('hex')); // Passa a string hexadecimal para decrypt
      const saveData = JSON.parse(decryptedData);
      return saveData.checkpoint;
    } catch (error) {
      // Se a descriptografia ou o parse falhar, retorna null.
      console.error("Erro ao carregar o save em modo PROD:", error);
      return null;
    }
  }
}

/**
 * Apaga o arquivo de save.
 */
export function apagar() {
  if (fs.existsSync(SAVE_FILE_PATH)) {
    fs.unlinkSync(SAVE_FILE_PATH);
  }
}
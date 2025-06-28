import fs from "fs";
import crypto from "crypto";
import path from 'path';
import { fileURLToPath } from 'url';

// Constrói um caminho absoluto para o arquivo env.txt na raiz do projeto
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const envPath = path.join(__dirname, '..', 'env.txt');

// Lê o modo de operação (dev ou prod) de um local garantido
const env = fs.readFileSync(envPath, "utf8").trim();

const SAVE_FILE_PATH = "save/save.dat";
const PASSWORD = "arouca";
const SALT = "cisne";
const ALGORITHM = "aes-256-cbc";

// A chave e o vetor de inicialização só são necessários para o modo "prod"
const key = crypto.scryptSync(PASSWORD, SALT, 32);
const initializationVector = Buffer.alloc(16, 0);

/**
 * Salva o progresso do jogador.
 * @param {string} checkpoint - O nome do ponto da história a ser salvo (ex: "intro", "prova1").
 */
export function guardar(checkpoint) {
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
    // MODO PROD: Criptografa e salva como antes.
    const cipher = crypto.createCipheriv(ALGORITHM, key, initializationVector);
    const encryptedData = Buffer.concat([
      cipher.update(jsonString, "utf8"),
      cipher.final(),
    ]);
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
    // MODO PROD: Descriptografa o conteúdo.
    try {
      const decipher = crypto.createDecipheriv(ALGORITHM, key, initializationVector);
      const decryptedData = Buffer.concat([
        decipher.update(fileContent),
        decipher.final(),
      ]);
      const saveData = JSON.parse(decryptedData.toString("utf8"));
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
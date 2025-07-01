//utils/saveManager.js
import fs from "fs";
import path from 'path';
import { fileURLToPath } from 'url';
import { encrypt, decrypt } from "./cryptoManager.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const envPath = path.join(__dirname, '..', 'env.txt');

let env = "prod"; 

try {
  env = fs.readFileSync(envPath, "utf8").trim();
} catch (error) {
}

const SAVE_DIR = "save"; 
const SAVE_FILE_PATH = path.join(SAVE_DIR, "save.dat"); 


export function guardar(checkpoint) {
  if (!fs.existsSync(SAVE_DIR)) {
    fs.mkdirSync(SAVE_DIR, { recursive: true });
  }

  const saveData = {
    checkpoint: checkpoint,
    timestamp: Date.now(),
  };
  const jsonString = JSON.stringify(saveData, null, 2);

  if (env === "dev") {
    fs.writeFileSync(SAVE_FILE_PATH, jsonString);
  } else {
    const encryptedData = encrypt(jsonString);
    fs.writeFileSync(SAVE_FILE_PATH, encryptedData);
  }
}

export function carregar() {
  if (!fs.existsSync(SAVE_FILE_PATH)) {
    return null;
  }

  const fileContent = fs.readFileSync(SAVE_FILE_PATH);

  if (env === "dev") {
    try {
      const saveData = JSON.parse(fileContent.toString("utf8"));
      return saveData.checkpoint;
    } catch (error) {
      console.error("Erro ao carregar o save em modo DEV:", error);
      return null;
    }
  } else {
    try {
      const decryptedData = decrypt(fileContent.toString('utf8')); 
      const saveData = JSON.parse(decryptedData);
      return saveData.checkpoint;
    } catch (error) {
      console.error("Erro ao carregar o save em modo PROD:", error);
      return null;
    }
  }
}

export function apagar() {
  if (fs.existsSync(SAVE_FILE_PATH)) {
    fs.unlinkSync(SAVE_FILE_PATH);
  }
}
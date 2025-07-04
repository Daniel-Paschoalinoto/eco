import fs from "fs";
import { PATHS } from "../utils/paths.js";
import { encrypt, decrypt } from "../utils/cryptoManager.js";

let env = "prod"; 
let resolvedPathsCache = null; // Cache para armazenar os caminhos resolvidos

/**
 * Garante que os caminhos de PATHS sejam resolvidos e armazena em cache.
 * Também tenta ler o arquivo de ambiente após a resolução dos caminhos.
 * @returns {Promise<object>} O objeto de caminhos resolvidos.
 */
async function getResolvedPaths() {
  if (!resolvedPathsCache) {
    resolvedPathsCache = await PATHS;
    // Tenta ler o arquivo de ambiente APÓS os caminhos estarem resolvidos
    try {
      env = fs.readFileSync(resolvedPathsCache.ENV_FILE, "utf8").trim();
    } catch (error) {
      // Se o arquivo de ambiente não existir ou não puder ser lido, 'env' permanece 'prod'
      console.warn("Não foi possível ler o ENV_FILE, usando 'prod' como padrão.", error.message);
    }
  }
  return resolvedPathsCache;
}

export async function guardar(checkpoint) {
  const paths = await getResolvedPaths(); // Garante que os caminhos estejam resolvidos

  if (!fs.existsSync(paths.SAVE_DIR)) {
    fs.mkdirSync(paths.SAVE_DIR, { recursive: true });
  }

  const saveData = {
    checkpoint: checkpoint,
    timestamp: Date.now(),
  };
  const jsonString = JSON.stringify(saveData, null, 2);

  if (env === "dev") {
    fs.writeFileSync(paths.SAVE_FILE, jsonString);
  } else {
    const encryptedData = encrypt(jsonString);
    fs.writeFileSync(paths.SAVE_FILE, encryptedData);
  }
}

export async function carregar() {
  const paths = await getResolvedPaths(); // Garante que os caminhos estejam resolvidos

  if (!fs.existsSync(paths.SAVE_FILE)) {
    return null;
  }

  const fileContent = fs.readFileSync(paths.SAVE_FILE);

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

export async function apagar() {
  const paths = await getResolvedPaths(); // Garante que os caminhos estejam resolvidos
  if (fs.existsSync(paths.SAVE_FILE)) {
    fs.unlinkSync(paths.SAVE_FILE);
  }
}
//src/utils/cryptoManager.js
import crypto from "crypto";

//Poxa, porque está mexendo aqui? Os problemas do jogo são mais simples do que montar um script pra quebrar essas chaves.
//Vai jogar ok?

const PASSWORD = "arouca";
const SALT = "cisne";
const ALGORITHM = "aes-256-cbc";

const key = crypto.scryptSync(PASSWORD, SALT, 32);
const initializationVector = Buffer.alloc(16, 0);

export function encrypt(text) {
  const cipher = crypto.createCipheriv(ALGORITHM, key, initializationVector);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return encrypted;
}

export function decrypt(encryptedText) {
  const decipher = crypto.createDecipheriv(ALGORITHM, key, initializationVector);
  let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}

import crypto from "crypto";

// As mesmas chaves usadas no saveManager para consistência
const PASSWORD = "arouca";
const SALT = "cisne";
const ALGORITHM = "aes-256-cbc";

const key = crypto.scryptSync(PASSWORD, SALT, 32);
const initializationVector = Buffer.alloc(16, 0); // IV estático para simplicidade e consistência

/**
 * Criptografa uma string.
 * @param {string} text - A string a ser criptografada.
 * @returns {string} A string criptografada em formato hexadecimal.
 */
export function encrypt(text) {
  const cipher = crypto.createCipheriv(ALGORITHM, key, initializationVector);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return encrypted;
}

/**
 * Descriptografa uma string.
 * @param {string} encryptedText - A string criptografada em formato hexadecimal.
 * @returns {string} A string descriptografada.
 */
export function decrypt(encryptedText) {
  const decipher = crypto.createDecipheriv(ALGORITHM, key, initializationVector);
  let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}

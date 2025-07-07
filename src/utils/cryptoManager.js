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

//src/utils/cryptoManager.js
import crypto from "crypto";

//Poxa, porque está mexendo aqui? Os problemas do jogo são mais simples do que montar um script pra aplicar essas chaves.
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

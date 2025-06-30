//utils/fileManager.js
import fs from 'fs';
import path from 'path';

/**
 * Cria um arquivo em um caminho especificado, com o conteúdo fornecido.
 * Se os diretórios no caminho não existirem, eles serão criados recursivamente.
 * 
 * @param {string} filePath - O caminho completo do arquivo a ser criado (ex: 'C:/Users/User/Desktop/nota.txt').
 * @param {string} content - O conteúdo a ser escrito no arquivo.
 */
export function createFile(filePath, content) {
  try {
    // Extrai o diretório do caminho do arquivo
    const dir = path.dirname(filePath);

    // Verifica se o diretório existe, se não, cria-o
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    // Escreve o arquivo com o conteúdo
    fs.writeFileSync(filePath, content, 'utf8');
    // console.log(`Arquivo criado com sucesso em: ${filePath}`); // Para depuração
  } catch (error) {
    console.error(`Erro ao criar o arquivo ${filePath}:`, error);
  }
}

/**
 * Deleta um arquivo do caminho especificado.
 * 
 * @param {string} filePath - O caminho completo do arquivo a ser deletado.
 */
export function deleteFile(filePath) {
  try {
    // Verifica se o arquivo existe antes de tentar deletar
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      // console.log(`Arquivo deletado com sucesso: ${filePath}`); // Para depuração
    }
  } catch (error) {
    console.error(`Erro ao deletar o arquivo ${filePath}:`, error);
  }
}

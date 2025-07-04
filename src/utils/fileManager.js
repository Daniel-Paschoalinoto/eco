//src/utils/fileManager.js
import fs from 'fs';
import path from 'path';

export function createFile(filePath, content) {
  try {
    const dir = path.dirname(filePath);

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    fs.writeFileSync(filePath, content, 'utf8');
  } catch (error) {
    console.error(`Erro ao criar o arquivo ${filePath}:`, error);
  }
}

export function deleteFile(filePath) {
  try {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  } catch (error) {
    console.error(`Erro ao deletar o arquivo ${filePath}:`, error);
  }
}

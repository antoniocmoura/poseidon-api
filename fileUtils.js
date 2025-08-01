import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { readFile } from 'fs/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export function getFilePath(fileName) {
  return join(__dirname, 'data', fileName);
}

export async function readJsonFile(fileName) {
  const fullPath = getFilePath(fileName);
  const content = await readFile(fullPath, 'utf8');
  return JSON.parse(content);
}

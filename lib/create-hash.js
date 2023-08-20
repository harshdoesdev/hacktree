import crypto from 'crypto';
import { readFile, readdir } from 'fs/promises';
import path from 'path';

export const createFileHash = async filePath => {
  const hash = crypto.createHash('sha256');
  const file = (await readFile(filePath)).toString();
  hash.update(file);

  return hash.digest('hex');
};

export const createFolderHash = async folder => {
  const hash = crypto.createHash('sha256');

  const items = await readdir(folder, { withFileTypes: true });
  
  const hashList = await Promise.all(items.map(async item => {
    const itemPath = path.join(item.path, item.name);

    if(item.isDirectory()) {
      return await createFolderHash(itemPath);
    }

    return await createFileHash(itemPath);
  }));

  hashList.forEach(itemHash => hash.update(String(itemHash)));

  return hash.digest('hex');
};

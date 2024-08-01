import fs from 'fs';
import nodePath from 'path';

export async function readDirContents(path: string = nodePath.resolve('/')) {
  try {
    return fs.promises.readdir(path);
  } catch (error) {
    console.error(`Error reading directory contents: ${error}`);
    return [];
  }
}



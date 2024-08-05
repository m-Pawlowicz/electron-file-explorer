import fs from 'fs';
import nodePath from 'path';
import { v4 as uuidv4 } from 'uuid';
import { DirectoryItem } from '../types';

export async function readDirContents(
  path: string = nodePath.resolve('/'),
): Promise<DirectoryItem[]> {
  try {
    const files = await fs.promises.readdir(path);

    const filesWithMetadata = await Promise.all(
      files.map(async (file) => {
        const filePath = nodePath.join(path, file);
        const stats = await fs.promises.stat(filePath);
        return {
          name: file,
          isDirectory: stats.isDirectory(),
          isFile: stats.isFile(),
          path: filePath, // Add the path property to the returned object
          id: uuidv4(),
        };
      }),
    );

    return filesWithMetadata;
  } catch (error) {
    console.error(`Error reading directory contents: ${error}`);
    return [];
  }
}

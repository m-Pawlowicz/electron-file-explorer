import fs from 'fs';
import nodePath from 'path';

export async function readDirContents(path: string = nodePath.resolve('/')) {
  try {
    const files = await fs.promises.readdir(path);

    const fileStats = await Promise.all(
      files.map(async (file) => {
        const filePath = nodePath.join(path, file);
        const stats = await fs.promises.stat(filePath);
        return {
          name: file,
          isDirectory: stats.isDirectory(),
          isFile: stats.isFile(),
          path: filePath, // Add the path property to the returned object
        };
      })
    );
    return fileStats;

  } catch (error) {
    console.error(`Error reading directory contents: ${error}`);
    return [];
  }
}



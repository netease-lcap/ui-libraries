import fs from 'fs-extra';
import glob from 'fast-glob';
import { type FileSystem, FileType } from '@lcap/extension-shared/lib/types/fs';

const getFileType = (stat: fs.Stats | fs.Dirent): FileType => {
  if (stat.isDirectory()) return FileType.Directory;
  if (stat.isSymbolicLink()) return FileType.SymbolicLink;
  if (stat.isFile()) return FileType.File;
  return FileType.Unknown;
};

export const fileSystem: FileSystem = {
  stat: async (path: string) => {
    if (!fs.existsSync(path)) {
      return undefined;
    }

    const stat = await fs.stat(path);

    return {
      type: getFileType(stat),
      ctime: stat.ctimeMs,
      mtime: stat.mtimeMs,
      size: stat.size,
    };
  },
  readFile: async (path: string, encoding: string | undefined = 'utf-8') => fs.readFile(path, encoding as any),
  writeFile: async (path: string, content: string, options: { encoding?: string | undefined; mode?: number | undefined; } | undefined = {}) => fs.writeFile(path, content, options as any),
  readDirectory: async (path: string) => {
    const dirs = await fs.readdir(path, { withFileTypes: true });
    return dirs.map((dir) => [dir.name, getFileType(dir)]);
  },
  rm: async (path: string) => fs.rm(path, { recursive: true, force: true }),
  glob,
};

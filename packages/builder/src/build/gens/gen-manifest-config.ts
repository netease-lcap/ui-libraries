import fs from 'fs-extra';
import path from 'path';
import { getHashDigest } from 'loader-utils';
import type { LcapBuildOptions } from '../types';

const getManifest = (type, outDir, modulesOutDir = 'es') => {
  return {
    nasl: [
      ...type === 'extension'
        ? ['nasl.extension.json', 'nasl.extension.d.ts']
        : [`${outDir}/nasl.ui.json`, `${outDir}/nasl.ui.d.ts`],
    ],
    runtime: [
      `${outDir}/index.js`,
      `${outDir}/index.css`,
    ],
    theme: [
      `${outDir}/theme.config.json`,
      `${outDir}/theme.json`,
      `${outDir}/theme/index.html`,
    ],
    style: [
      `${outDir}/index.css-info-map.json`,
    ],
    package: ['source.zip'],
    i18n: [`${outDir}/i18n.json`],
    modules: [
      `${modulesOutDir}/modules.json`,
      `${modulesOutDir}/index.d.ts`,
    ],
    ide: [
      `${outDir}/ide/index.js`,
      `${outDir}/ide/index.css`,
    ],
  } as {
    [key: string]: string[],
  };
};

export async function genFilesHashMap(rootPath: string, files: string[]) {
  const hashMap: { [fileName: string]: string } = {};

  await Promise.all(
    files.map(async (fileName) => {
      const filePath = path.join(rootPath, fileName);
      const content = await fs.readFile(filePath);
      const contentHash = getHashDigest(content, 'md5', 'hex', 16);
      hashMap[fileName] = contentHash;
    }),
  );

  return hashMap;
}

function needGenHash(key: string, filePath: string) {
  if ([
    'modules',
    'package',
  ].includes(key) || filePath.endsWith('.html') || filePath.endsWith('.zip') || filePath.endsWith('.tgz')) {
    return false;
  }

  return true;
}

export default async function genManifestConfig(options: LcapBuildOptions) {
  const manifest: any = getManifest(options.type, options.destDir);
  const hashFiles: string[] = [];
  Object.keys(manifest).forEach((key) => {
    manifest[key] = manifest[key].filter((filePath) => fs.existsSync(path.join(options.rootPath, filePath)));
    manifest[key].forEach((filePath) => {
      if (needGenHash(key, filePath)) {
        hashFiles.push(filePath);
      }
    });
  });

  manifest.package.push('zip.tgz');
  manifest.hashMap = await genFilesHashMap(options.rootPath, hashFiles);

  return manifest;
}

import fs from 'fs-extra';
import path from 'path';
import type { LcapBuildOptions } from '../types';

const getManifest = (type, outDir) => {
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
    package: [],
    i18n: [`${outDir}/i18n.json`],
    ide: [
      `${outDir}/ide/index.js`,
      `${outDir}/ide/index.css`,
    ],
  } as {
    [key: string]: string[],
  };
};

export default function genManifestConfig(options: LcapBuildOptions) {
  const manifest = getManifest(options.type, options.destDir);
  Object.keys(manifest).forEach((key) => {
    manifest[key] = manifest[key].filter((filePath) => fs.existsSync(path.join(options.rootPath, filePath)));
  });

  manifest.package.push('zip.tgz');

  return manifest;
}

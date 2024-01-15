import fse from 'fs-extra';
import path from 'path';

export default async (config) => {
  const {
    rootPath,
    destPath,
    i18n,
  } = config;
  if (!i18n) {
    return;
  }

  const langs = Object.keys(i18n);
  if (!langs || langs.length === 0) {
    return;
  }

  const data = {};

  langs.forEach((key) => {
    data[key] = fse.readJSONSync(path.join(rootPath, i18n[key]));
  });

  const destDir = path.join(rootPath, destPath);
  if (!fse.existsSync(destDir)) {
    fse.mkdirSync(destDir, { recursive: true });
  }

  const destFile = `${destDir}/i18n.json`;
  fse.writeJSONSync(destFile, data, { spaces: 2 });
};

import nodePath from 'node:path';
import nodeFs from 'node:fs';

const langs = ['zh-cn', 'en', 'ja'];

const distFolder = nodePath.resolve(process.cwd(), 'src/locale/langs');
const srcFolder = nodePath.resolve(process.cwd(), 'node_modules/element-plus/es/locale/lang');

async function generateLocale(lang) {
  const distFile = nodePath.resolve(distFolder, `${lang}.json`);

  const locale = await import(nodePath.resolve(srcFolder, `${lang}.mjs`));

  const messages = locale.default.el;

  const langMessages = {};

  Object.keys(messages).forEach((key) => {
    const val = messages[key];
    if (typeof val === 'string') {
      langMessages[key] = val;
    } else if (typeof val === 'object') {
      Object.keys(val).forEach((subKey) => {
        langMessages[`${key}_${subKey}`] = val[subKey];
      });
    }
  });

  nodeFs.writeFileSync(distFile, JSON.stringify(langMessages, null, 2));
}

if (!nodeFs.existsSync(distFolder)) {
  nodeFs.mkdirSync(distFolder, { recursive: true });
}

langs.forEach(generateLocale);
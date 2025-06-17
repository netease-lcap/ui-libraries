import nodePath from 'node:path';
import nodeFs from 'node:fs';

const langs = ['zh-cn', 'en', 'ja'];

const distFolder = nodePath.resolve(process.cwd(), 'src/locale/langs');
const srcFolder = nodePath.resolve(process.cwd(), 'node_modules/element-plus/es/locale/lang');

function setMessages(messages, key, val, prefix = '') {
  const nkey = prefix ? `${prefix}_${key}` : key;
  if (typeof val === 'string') {
    messages[nkey] = val;
  } else if (Array.isArray(val)) {
    val.forEach((item, index) => {
      setMessages(messages, `${index}`, item, nkey);
    });
  } else if (typeof val === 'object') {
    Object.keys(val).forEach((subKey) => {
      setMessages(messages, subKey, val[subKey], nkey);
    });
  }
}

async function generateLocale(lang) {
  const distFile = nodePath.resolve(distFolder, `${lang}.json`);

  const locale = await import(nodePath.resolve(srcFolder, `${lang}.mjs`));

  const messages = locale.default.el;

  const langMessages = {};

  Object.keys(messages).forEach((key) => {
    setMessages(langMessages, key, messages[key]);
  });

  nodeFs.writeFileSync(distFile, JSON.stringify(langMessages, null, 2));
}

if (!nodeFs.existsSync(distFolder)) {
  nodeFs.mkdirSync(distFolder, { recursive: true });
}

langs.forEach(generateLocale);
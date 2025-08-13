import nodePath from 'node:path';
import nodeFs from 'node:fs';

const langs = ['zh-CN', 'en-US', 'ja-JP'];

const distFolder = nodePath.resolve(process.cwd(), 'src/locale/langs');
const srcFolder = nodePath.resolve(process.cwd(), 'node_modules/vant/es/locale/lang');

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
  } else if (typeof val === 'function') {
    messages[`${nkey}_fn`] = val.toString();
  }
}

async function generateLocale(lang) {
  const distFile = nodePath.resolve(distFolder, `${lang}.json`);

  const locale = await import(nodePath.resolve(srcFolder, `${lang}.mjs`));

  const messages = locale.default;

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

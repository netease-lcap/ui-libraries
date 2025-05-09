import { camelCase, kebabCase, upperFirst } from 'lodash';

export function replaceXmlTagsPrecisely(xmlString: string, oldTagName: string, newTagName: string) {
  // 匹配开始标签（带属性）
  const startTagRegex = new RegExp(
    `<\\s*${oldTagName}(\\s+[^>]*)?>`,
    'gi',
  );

  // 匹配结束标签
  const endTagRegex = new RegExp(
    `<\\s*/\\s*${oldTagName}\\s*>`,
    'gi',
  );

  // 匹配自闭合标签
  const selfClosingRegex = new RegExp(
    `<\\s*${oldTagName}(\\s+[^>]*)?\\s*/\\s*>`,
    'gi',
  );

  // 分步替换
  let result = xmlString.replace(startTagRegex, `<${newTagName}$1>`);
  result = result.replace(endTagRegex, `</${newTagName}>`);
  result = result.replace(selfClosingRegex, `<${newTagName}$1/>`);

  return result;
}

export function replaceTagName(code: string, source: string, target: string) {
  return code.replaceAll(`<${source}\n`, `<${target}\n`)
    .replaceAll(`<${source} `, `<${target} `)
    .replaceAll(`<${source}>`, `<${target}>`)
    .replaceAll(`</${source}>`, `</${target}>`)
    .replaceAll(`</ ${source}>`, `</${target}>`);
}

export function getWithFormName(name: string) {
  const [prefix, ...rest] = kebabCase(name).split('-');
  return upperFirst(camelCase([prefix, 'form', ...rest].join('-')));
}

export function isWithForm(config: any) {
  const formName = getWithFormName(config.name);
  return config.children && config.children.length > 0 && config.children.some((c: any) => c.name === formName);
}

export function addPrefix(name, prefix) {
  return upperFirst(prefix.toLowerCase()) + name;
}

export function replaceAllTagName(code: string, replaceMap: Record<string, string>) {
  return Object.keys(replaceMap).reduce((result, key) => {
    return replaceXmlTagsPrecisely(result, key, replaceMap[key]);
  }, code);
}

export function replaceAllTagNameInCode(code: string, replaceMap: Record<string, string>) {
  return Object.keys(replaceMap).reduce((result, key) => {
    return result.replaceAll(`'${key}'`, `'${replaceMap[key]}'`).replaceAll(`"${key}"`, `"${replaceMap[key]}"`);
  }, code);
}

import { camelCase, kebabCase, upperFirst } from 'lodash';

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

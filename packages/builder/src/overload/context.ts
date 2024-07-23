import fs from 'fs-extra';
import path from 'path';
import { kebabCase, upperFirst } from 'lodash';
import type { ViewComponentDeclaration } from '@nasl/types/nasl.ui.ast';

export interface NaslUIComponentConfig extends ViewComponentDeclaration {
  ideusage?: any;
  children: Array<NaslUIComponentConfig>;
}

export interface OverloadComponentContext {
  naslUIConfig: NaslUIComponentConfig;
  naslConfigList: NaslUIComponentConfig[];
  name: string;
  tagName: string;
  framework: string;
  pkgComponentFolderPath: string;
  componentFolderPath: string;
  pkgName: string;
  fork: boolean;
  type: 'pc' | 'h5';
  prefix: string;
  replaceNameMap: Record<string, string>;
  replaceTagMap: Record<string, string>;
}

export function getProjectContext(rootPath) {
  const pkg = fs.readJSONSync(path.resolve(rootPath, 'package.json'));

  if (pkg && pkg.lcap && pkg.lcap['lcap-ui']) {
    return {
      pkgName: pkg.name,
      ...pkg.lcap['lcap-ui'],
    };
  }

  return null;
}

function getComponentFloderPath(rootPath, component, framework) {
  const pkg = fs.readJSONSync(path.resolve(rootPath, '.lcap/lcap-ui/package/package.json'));
  if (pkg.name === 'cloud-ui.vusion' || pkg.name === '@lcap/pc-ui') {
    return path.resolve(rootPath, `.lcap/lcap-ui/package/src/components/${kebabCase(component)}.vue`);
  }

  if (pkg.name === '@lcap/mobile-ui') {
    const folderName = kebabCase(component).substring('van-'.length);
    let compPath = path.resolve(rootPath, `.lcap/lcap-ui/package/src-vusion/components/${folderName}`);

    if (!fs.existsSync(compPath)) {
      compPath = path.resolve(rootPath, `.lcap/lcap-ui/package/src/${folderName}`);
    }
    return compPath;
  }

  return path.resolve(rootPath, `.lcap/lcap-ui/package/src/components/${framework.startsWith('vue') ? kebabCase(component) : component}`);
}

function addPrefix(name, prefix, kebab = false) {
  if (kebab) {
    return [
      prefix.toLowerCase(),
      name,
    ].join('-');
  }

  return upperFirst(prefix.toLowerCase()) + name;
}

function getReleaceMap(comp, framework, prefix) {
  const replaceNameMap = {
    [comp.name]: addPrefix(comp.name, prefix),
  };

  const isKebab = framework.startsWith('vue');
  const getTagName = (cp) => (isKebab ? cp.kebabName : cp.name);
  const tagName = getTagName(comp);
  const replaceTagMap = {
    [tagName]: addPrefix(tagName, prefix, isKebab),
  };

  if (comp.children && comp.children.length > 0) {
    comp.children.forEach((child) => {
      replaceNameMap[child.name] = addPrefix(child.name, prefix);
      const tname = getTagName(child);
      replaceTagMap[tname] = addPrefix(tname, prefix, isKebab);
    });
  }

  return {
    replaceNameMap,
    replaceTagMap,
  };
}

export function getOverloadComponentContext(rootPath, { component, prefix, fork }) {
  const env = getProjectContext(rootPath);
  const configPath = path.resolve(rootPath, '.lcap/lcap-ui/runtime/nasl.ui.json');
  if (!fs.existsSync(configPath) || !env) {
    throw new Error('unfound nasl config path .lcap/lcap-ui/runtime/nasl.ui.json, please execute command \'lcap install\' ');
  }

  const configList = fs.readJSONSync(configPath);
  const comp = configList.find((it) => it.name === component);
  if (!comp) {
    throw new Error(`unfound component ${component} in config file `);
  }

  prefix = prefix.toLowerCase();
  const name = upperFirst(prefix) + component;
  const tagName = env.framework.startsWith('vue') ? kebabCase(name) : name;

  return {
    naslConfigList: configList,
    naslUIConfig: comp,
    name,
    tagName,
    pkgName: env.pkgName,
    framework: env.framework,
    type: env.type,
    pkgComponentFolderPath: getComponentFloderPath(rootPath, component, env.framework),
    componentFolderPath: path.resolve(rootPath, `src/components/${tagName}`),
    fork,
    prefix,
    ...getReleaceMap(comp, env.framework, prefix),
  } as OverloadComponentContext;
}

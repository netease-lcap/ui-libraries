/* eslint-disable no-plusplus */
import fs from 'fs-extra';
import path from 'path';
import { kebabCase, upperFirst } from 'lodash';
import type { ViewComponentDeclaration } from '@nasl/types/nasl.ui.ast';
import type { ThemeComponentConfig, ThemeConfig } from '../build/gens/gen-theme-config';

export interface NaslUIComponentConfig extends ViewComponentDeclaration {
  ideusage?: any;
  children: Array<NaslUIComponentConfig>;
}

export interface OverloadComponentContext {
  rootPath: string;
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
  themeConfig: ThemeComponentConfig;
  findNaslUIConfig: (name: string | ((c: NaslUIComponentConfig) => boolean)) => NaslUIComponentConfig | null;
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
    if (component === 'UToastSingle') {
      component = 'UToast';
    }
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

  if (component === 'Radio' && pkg.name === '@lcap/pc-react-ui') {
    component = 'RadioGroup';
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

function getThemeConfig(rootPath, component) {
  const defaultConfig = {
    title: '',
    name: '',
    useGlobalTokens: [] as any[],
    selector: ':root',
    variables: [] as any[],
  } as ThemeComponentConfig;
  const configPath = path.resolve(rootPath, '.lcap/lcap-ui/runtime/theme.config.json');
  if (!fs.existsSync(configPath)) {
    return defaultConfig;
  }

  try {
    const config: ThemeConfig = fs.readJSONSync(configPath);
    const c = config.components.find((n) => n.name === component);

    return c || defaultConfig;
  } catch (e) {
    return defaultConfig;
  }
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
    rootPath,
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
    themeConfig: getThemeConfig(rootPath, env.framework.startsWith('vue') ? kebabCase(component) : component),
    findNaslUIConfig: (compName: string | ((c: NaslUIComponentConfig) => boolean)) => {
      let checkFn = (n: NaslUIComponentConfig) => n.name === compName;
      if (typeof compName === 'function') {
        checkFn = compName;
      }

      for (let i = 0; i < configList.length; i++) {
        const config = configList[i];
        if (checkFn(config)) {
          return config;
        }

        if (config.children && config.children.length > 0) {
          const childConfig = config.children.find(checkFn);
          if (childConfig) {
            return childConfig;
          }
        }
      }

      return null;
    },
  } as OverloadComponentContext;
}

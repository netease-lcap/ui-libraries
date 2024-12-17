import path from 'path';
import fs from 'fs-extra';
import glob from 'fast-glob';
import { normalizePath } from 'vite';
import { camelCase, upperFirst } from 'lodash';
import { type NaslUIComponentConfig } from '../overload';
import { getComponentPathInfo } from './component-path';
import logger from './logger';
import { getComponentMetaByApiTs } from './babel-utils';
import { ComponentMetaInfo } from './types';

export const getConfigComponents = (rootPath: string) => {
  const lcapConfigPath = path.resolve(rootPath, './lcap-ui.config.js');
  if (!fs.existsSync(lcapConfigPath)) {
    return [];
  }
  // eslint-disable-next-line import/no-dynamic-require, global-require
  const config = require(lcapConfigPath);

  if (!config || !Array.isArray(config.components)) {
    return [];
  }

  return config.components.map((c) => ({
    ...c,
    title: c.alias,
  }));
};

export const getPackName = (name, version) => `${name.replace(/@/g, '').replace(/\//g, '-')}-${version}.tgz`;

export const getComponentConfigByName = (name: string, list: NaslUIComponentConfig[]) => {
  const flatList = list.map((c) => {
    const arr = [c];
    arr.push(...c.children);
    return arr;
  }).flat();

  return flatList.find((c) => c.name === name);
};

export function getComponentMetaInfos(rootPath: string, parseAPI: boolean = false) {
  const components = getConfigComponents(rootPath);
  const packageInfo = fs.readJSONSync(path.resolve(rootPath, 'package.json'));
  const metaInfos: ComponentMetaInfo[] = [];
  if (components && components.length > 0) {
    components.forEach((extConfig) => {
      const componentRootDir = packageInfo.name === '@lcap/mobile-ui' ? 'src-vusion/components' : 'src/components';
      const { componentDir } = getComponentPathInfo(extConfig.name, rootPath, componentRootDir);
      const apiPath = extConfig.apiPath ? path.join(rootPath, componentRootDir, extConfig.apiPath) : path.join(componentDir, 'api.ts');
      if (!fs.existsSync(apiPath)) {
        logger.error(`未找到组件 ${extConfig.name} 的描述文件（api.ts）`);
        return;
      }

      metaInfos.push({
        ...extConfig,
        tsPath: apiPath,
      });
    });
  } else {
    glob.sync('src/**/api.ts', { cwd: rootPath, absolute: true }).forEach((apiPath) => {
      const arr = normalizePath(apiPath).split('/');
      const basename = arr[arr.length - 2];

      metaInfos.push({
        name: upperFirst(camelCase(basename)),
        tsPath: apiPath,
      });
    });
  }

  if (parseAPI) {
    return metaInfos.map(({ tsPath }) => {
      return getComponentMetaByApiTs(tsPath);
    }).filter((v) => !!v) as ComponentMetaInfo[];
  }

  return metaInfos as ComponentMetaInfo[];
}

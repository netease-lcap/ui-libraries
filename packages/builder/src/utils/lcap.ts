import path from 'path';
import fs from 'fs-extra';
import glob from 'fast-glob';
import { normalizePath } from 'vite';
import { camelCase, upperFirst } from 'lodash';
import { MaterialSchema } from '@lcap/material-parser';
import * as parser from '@babel/parser';
import traverse from '@babel/traverse';
import generator from '@babel/generator';
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
    return metaInfos.map(({ tsPath, show }) => {
      try {
        return {
          show,
          ...getComponentMetaByApiTs(tsPath),
        };
      } catch (e) {
        logger.error(`解析组件 ${tsPath} 失败`);
        return null;
      }
    }).filter((v) => !!v) as ComponentMetaInfo[];
  }

  return metaInfos as ComponentMetaInfo[];
}

export function removeComponentFiles(rootPath: string, name: string) {
  const components = getComponentMetaInfos(rootPath, true);

  const compMeta = components.find((c) => c.name === name);

  if (!compMeta) {
    throw new Error(`未找到组件 ${name}`);
  }

  const componentFolder = path.dirname(compMeta.tsPath);
  const componentFolderName = path.basename(componentFolder);
  const exportsFilePath = ['index.ts', 'index.js'].map((fileName) => path.resolve(componentFolder, '../', fileName)).filter((p) => fs.existsSync(p))[0];

  const code = fs.readFileSync(exportsFilePath, 'utf-8').toString();
  const source = `./${componentFolderName}`;

  const ast = parser.parse(code, {
    sourceType: 'module',
    plugins: ['typescript', 'jsx'],
  });

  const removeNames = [name];

  traverse(ast, {
    ExportNamedDeclaration(path) {
      if (path.node.source && path.node.source.value === source) {
        path.remove();
      }
    },
    ImportDeclaration(path) {
      if (path.node.source && path.node.source.value === source) {
        path.traverse({
          ImportSpecifier(p) {
            if (p.node.local.name === name) {
              removeNames.push(p.node.local.name);
            }
          },
        });

        path.remove();
      }
    },
    ExportAllDeclaration(path) {
      if (path.node.source && path.node.source.value === source) {
        path.remove();
      }
    },
    ExportSpecifier(path) {
      if (removeNames.includes(path.node.local.name)) {
        path.remove();
      }
    },
  });

  fs.rmSync(componentFolder, { recursive: true });
  fs.writeFileSync(exportsFilePath, generator(ast).code, 'utf-8');
}

export interface WriteOptions {
  type: 'pc' | 'h5' | 'both';
  prefix: string;
}

export interface Schema extends MaterialSchema {
  write?: WriteOptions;
}

export function getProjectSourceSchema(rootPath: string = process.cwd()) {
  const pkgInfo = fs.readJSONSync(path.resolve(rootPath, 'package.json'));

  if (!pkgInfo.lcap?.schema) {
    throw new Error('未找到本地NPM扫描结果文件');
  }

  const schema = pkgInfo.lcap?.schema;

  if (!schema || !fs.existsSync(path.resolve(rootPath, schema))) {
    throw new Error(`schema 文件 ${schema} 不存在`);
  }

  const material: Schema = fs.readJSONSync(path.resolve(rootPath, schema), 'utf-8');
  if (!material.components || material.components.length === 0) {
    throw new Error(`schema 文件 ${schema} 中没有组件`);
  }

  return material;
}

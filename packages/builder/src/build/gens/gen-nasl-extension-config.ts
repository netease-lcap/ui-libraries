/* eslint-disable no-restricted-syntax */
/* eslint-disable no-param-reassign */
/* eslint-disable no-await-in-loop */
import path from 'path';
import fs from 'fs-extra';
import glob from 'fast-glob';
import { capitalize } from 'lodash';
import genNaslComponentConfig, { processComponentConfigExtends } from './gen-nasl-component-config';
import genNaslLogicsConfig from './gen-nasl-logics-config';
import { LCAP_UI_CONFIG_PATH } from '../../overload/constants';
import logger from '../../utils/logger';

export interface GenNaslExtensionConfigProps {
  // cwd
  rootPath: string;
  i18n?: boolean | { [lang: string]: string };
  framework?: string;
  frameworkUI?: string;
  assetsPublicPath?: string;
}

const getFrameWorkKind = (pkgInfo: any) => {
  if (pkgInfo.peerDependencies && Object.keys(pkgInfo.peerDependencies).includes('@tarojs/taro')) {
    return 'taro';
  }

  if (pkgInfo.peerDependencies && Object.keys(pkgInfo.peerDependencies).includes('react')) {
    return 'react';
  }

  if (
    pkgInfo.peerDependencies
    && pkgInfo.peerDependencies.vue
    && (pkgInfo.peerDependencies.vue.startsWith('3.') || pkgInfo.peerDependencies.vue.startsWith('^3.'))
  ) {
    return 'vue3';
  }

  if (
    pkgInfo.peerDependencies
    && pkgInfo.peerDependencies.vue
    && (pkgInfo.peerDependencies.vue.startsWith('2.') || pkgInfo.peerDependencies.vue.startsWith('^2.'))
  ) {
    return 'vue2';
  }

  return '';
};

function getPeerDependencies(pkgInfo) {
  if (!pkgInfo.peerDependencies) {
    return [];
  }

  return Object.keys(pkgInfo.peerDependencies).map((name) => {
    return {
      name,
      version: pkgInfo.peerDependencies[name],
    };
  });
}

function getFrontEndLibray(frameworkKind, frameworkUI, viewComponents, logics) {
  const pcFeLibrary: any = {
    concept: 'FrontendLibrary',
    name: 'pc',
    type: 'pc',
    frameworkKind,
    frameworkUI,
    viewComponents: [],
    logics: [],
  };

  const mobileFeLibrary: any = {
    concept: 'FrontendLibrary',
    name: 'h5',
    type: 'h5',
    frameworkKind,
    viewComponents: [],
    logics: [],
  };

  viewComponents.forEach((c) => {
    const typeKind = ['both', 'pc', 'h5'].indexOf(c.type) !== -1 ? c.type : 'pc';
    if (typeKind === 'pc') {
      pcFeLibrary.viewComponents.push(c);
    } else if (typeKind === 'h5') {
      mobileFeLibrary.viewComponents.push(c);
    } else {
      pcFeLibrary.viewComponents.push(c);
      mobileFeLibrary.viewComponents.push(c);
    }
  });

  logics.forEach((c) => {
    const typeKind = ['both', 'pc', 'h5'].indexOf(c.type) !== -1 ? c.type : 'pc';
    if (typeKind === 'pc') {
      pcFeLibrary.logics.push(c);
    } else if (typeKind === 'h5') {
      mobileFeLibrary.logics.push(c);
    } else {
      pcFeLibrary.logics.push(c);
      mobileFeLibrary.logics.push(c);
    }
  });

  return [pcFeLibrary, mobileFeLibrary].filter((library) => {
    return library.viewComponents.length > 0 || library.logics.length > 0;
  });
}

function getConfiguration(rootPath: string) {
  const configurationPath = path.resolve(rootPath, 'src/settings', 'configuration.json');
  let properties = [];
  try {
    const isExists = fs.existsSync(configurationPath);
    if (!isExists) {
      return undefined;
    }

    const configurationList = fs.readJSONSync(configurationPath);
    properties = configurationList.map((item: any) => {
        item.concept = 'ConfigProperty';
        return item;
      }) || [];

    return {
      concept: 'Configuration',
      groups: [
        {
          name: 'custom',
          concept: 'ConfigGroup',
          properties,
        },
      ],
    };
  } catch (error) {
    logger.error('configuration格式不对,请检查');
  }

  return undefined;
}

/* 获取数据类型 */
function formatTypeAnnotation(type, pkg: any) {
  const typeAnnotation: any = {
    concept: 'TypeAnnotation',
  };
  const resultArr = /(\[([\s\S]*)\])/.exec(type);
  const resultMap = /(<([\s\S]*,[\s\S]*)>)/.exec(type);
  if (resultArr) {
    typeAnnotation.typeName = 'List';
    typeAnnotation.typeKind = 'generic';
    typeAnnotation.typeNamespace = 'nasl.collection';
    typeAnnotation.typeArguments = [];
    typeAnnotation.typeArguments[0] = formatTypeAnnotation(resultArr[2], pkg);
  } else if (resultMap) {
    const resultMapList = resultMap[2].split(',');
    typeAnnotation.typeName = 'Map';
    typeAnnotation.typeKind = 'generic';
    typeAnnotation.typeNamespace = 'nasl.collection';
    typeAnnotation.typeArguments = [];
    typeAnnotation.typeArguments[0] = formatTypeAnnotation(resultMapList[0], pkg);
    typeAnnotation.typeArguments[1] = formatTypeAnnotation(resultMapList[1], pkg);
  } else {
    const baseTypeList = ['Long', 'Boolean', 'Decimal', 'String', 'Date', 'DateTime', 'Time'];
    const targeType = capitalize(type);
    if (baseTypeList.includes(targeType)) {
      typeAnnotation.typeKind = 'primitive';
      typeAnnotation.typeName = targeType;
      typeAnnotation.typeNamespace = 'nasl.core';
    } else {
      typeAnnotation.typeKind = 'reference';
      typeAnnotation.typeName = targeType;
      typeAnnotation.typeNamespace = `extensions.${pkg.name}.structures`;
    }
  }
  return typeAnnotation;
}

function getStructures(rootPath: string, pkg: any) {
  const configFilePath = path.resolve(rootPath, 'src/settings', 'structures.json');
  const isExists = fs.existsSync(configFilePath);
  if (!isExists) {
    return undefined;
  }

  try {
    const resultList: any[] = [];
    const structureList = fs.readJSONSync(configFilePath);
    Object.keys(structureList).forEach((item) => {
      const resultObj: any = {};
      resultObj.name = item;
      const structureData = structureList[item];
      const resultStructureList = Object.keys(structureData).map((it) => {
        const structureOpions = structureData[it];
        if (it === '__description') {
          resultObj.description = structureOpions;
          return null;
        }
          const list = structureOpions.split('-');
          const obj = {
            title: list[1],
            name: it,
            defaultValue: list[2] || undefined,
            typeAnnotation: formatTypeAnnotation(list[0], pkg),
          };
          return obj;
      });
      resultObj.properties = resultStructureList.filter((item) => !!item);
      resultList.push(resultObj);
    });

    return resultList;
  } catch (error) {
    logger.error('structures格式不对,请检查');
  }

  return undefined;
}

function getAnnotations(rootPath: string) {
  const configFilePath = path.resolve(rootPath, 'src/settings', 'annotations.json');
  const isExists = fs.existsSync(configFilePath);
  if (!isExists) {
    return undefined;
  }

  try {
    const annotationList = fs.readJSONSync(configFilePath);
    return annotationList.map((item: any) => ({
      ...item,
      concept: item.concept ?? 'Annotation',
      applyTo: item.applyTo ?? ['ViewElement'],
    }));
  } catch (e) {
    logger.error('annotations格式不对,请检查');
  }

  return undefined;
}

export default async function getNaslExtensionConfig({
  rootPath,
  assetsPublicPath,
  framework,
  i18n,
  frameworkUI,
}: GenNaslExtensionConfigProps) {
  const componentPath = 'src/components';
  const pkgInfo = fs.readJSONSync(path.join(rootPath, 'package.json'));
  const frameworkKind = framework || getFrameWorkKind(pkgInfo);
  const libInfo = [pkgInfo.name, '@', pkgInfo.version].join('');
  const tsPaths = glob.sync(`${componentPath}/**/api.ts`, { cwd: rootPath, absolute: true });

  const viewComponents: any[] = [];

  for (const tsPath of tsPaths) {
    const componentConfig = await genNaslComponentConfig({
      apiPath: tsPath,
      assetsPublicPath: assetsPublicPath || '',
      rootPath,
      libInfo,
      framework: framework as any,
    });

    const projectAssetPath = 'assets';
    if (
      componentConfig.icon
      && componentConfig.icon.indexOf('.') !== -1
      && fs.existsSync(path.join(rootPath, projectAssetPath, componentConfig.icon))
    ) {
      componentConfig.icon = `${assetsPublicPath}/${libInfo}/${projectAssetPath}/${componentConfig.icon}`;
    }

    if (i18n) {
      const componentDir = path.resolve(tsPath, '../');
      const i18nFiles = glob.sync('i18n/*.json', { cwd: componentDir, absolute: true });
      componentConfig.i18nMap = {};
      i18nFiles.forEach((i18nFilePath) => {
        const map = fs.readJSONSync(i18nFilePath, 'utf-8');
        const key = path.basename(i18nFilePath, '.json');

        componentConfig.i18nMap[key] = map || {};
      });
    }

    viewComponents.push(componentConfig);
  }

  const lcapUIConfigPath = path.resolve(rootPath, LCAP_UI_CONFIG_PATH);
  let lcapUIComponents: any[] = [];
  if (fs.existsSync(lcapUIConfigPath)) {
    try {
      lcapUIComponents = fs.readJSONSync(lcapUIConfigPath);
    } catch (e) {
      console.error(e);
    }
  }

  processComponentConfigExtends(viewComponents, lcapUIComponents);

  const logics = await genNaslLogicsConfig(rootPath);
  const feLibraries = getFrontEndLibray(frameworkKind, frameworkUI, viewComponents, logics);

  const configuration = getConfiguration(rootPath);
  const structures = getStructures(rootPath, pkgInfo);
  const annotations = getAnnotations(rootPath);

  return {
    config: {
      name: pkgInfo.name,
      title: pkgInfo.title,
      description: pkgInfo.description,
      specVersion: '1.0.0',
      type: 'module',
      subType: 'extension',
      version: pkgInfo.version,
      frontends: feLibraries,
      configuration,
      structures,
      annotations,
      externalDependencyMap: {
        npm: getPeerDependencies(pkgInfo),
      },
      summary: {
        name: pkgInfo.name,
        title: pkgInfo.title,
        version: pkgInfo.version,
        description: pkgInfo.description,
        frontends: feLibraries.map((library) => ({
          type: library.type,
          frameworkKind,
          frameworkUI,
          viewComponents: library.viewComponents.map((item: any) => ({
            name: item.name,
            title: item.title,
          })),
          logics: library.logics.map((item: any) => ({
            name: item.name,
            description: item.title || item.description || item.name,
          })),
        })),
      },
      compilerInfoMap: {
        js: {
          prefix: 'extension',
        },
      },
      ideVersion: pkgInfo.lcapIdeVersion || '3.8',
    },
    viewComponents,
  };
}

import fs from 'fs-extra';
import path from 'path';
import os from 'os';
import * as YAML from 'yaml';

import { LCAP_UI_CONFIG_PATH, LCAP_UI_JSON_PATH } from '../overload/constants';

const LCAP_UI = 'lcap-ui';

function getFrameWorkKind(pkgInfo, rootPath) {
  if (!pkgInfo) {
    pkgInfo = fs.readJSONSync(path.resolve(rootPath, 'package.json'));
  }

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
}

function getLcapUIInfo(pkgInfo: any, rootPath: string = process.cwd()) {
  if (!pkgInfo) {
    pkgInfo = fs.readJSONSync(path.resolve(rootPath, 'package.json'));
  }

  if (!pkgInfo || !pkgInfo.lcap || !pkgInfo.lcap[LCAP_UI]) {
    return null;
  }

  return pkgInfo.lcap[LCAP_UI];
}

export interface ProjectLibUIInfo {
  platform: string;
  type: 'pc' | 'h5';
  version: string;
  pkgName: string;
  framework: string;
}

export interface ProjectMetaInfo {
  framework: 'vue2' | 'react' | 'vue3' | 'taro';
  name: string;
  version: string;
  title: string;
  description: string;
  libUIInfo: ProjectLibUIInfo | null;
}

export function getExtensionProjectMeta(rootPath: string) {
  const pkgInfo = fs.readJSONSync(path.resolve(rootPath, 'package.json'));
  const framework = getFrameWorkKind(pkgInfo, rootPath);

  return {
    framework,
    name: pkgInfo.name,
    version: pkgInfo.version,
    title: pkgInfo.title,
    description: pkgInfo.description,
    libUIInfo: getLcapUIInfo(pkgInfo, rootPath),
  } as ProjectMetaInfo;
}

export function getComponentList(rootPath: string, pkgInfo?: any) {
  if (!pkgInfo) {
    pkgInfo = fs.readJSONSync(path.resolve(rootPath, 'package.json'));
  }

  if (!pkgInfo || !pkgInfo.lcap || !pkgInfo.lcap[LCAP_UI]) {
    return [];
  }

  const moduleConfigPath = path.resolve(rootPath, LCAP_UI_JSON_PATH);
  if (!fs.existsSync(moduleConfigPath)) {
    return [];
  }

  try {
    const naslConfigPath = path.resolve(rootPath, LCAP_UI_CONFIG_PATH);

    if (!fs.existsSync(naslConfigPath)) {
      return [];
    }

    const arr = fs.readJSONSync(naslConfigPath);
    return Array.isArray(arr) ? arr.filter((c) => c.show !== false).sort((a, b) => a.name.localeCompare(b.name)) : [];
  } catch (e) {
    return [];
  }
}

export function getSourceSchema(rootPath: string) {
  const pkgInfo = fs.readJSONSync(path.resolve(rootPath, 'package.json'));
  const schemaFilePath = pkgInfo.lcap && pkgInfo.lcap.schema ? path.resolve(rootPath, pkgInfo.lcap.schema) : '';

  if (!schemaFilePath || !fs.existsSync(schemaFilePath)) {
    return null;
  }

  const schema = fs.readJSONSync(schemaFilePath);
  return schema;
}

export function getLcapConfig() {
  const lcapConfigPath = path.resolve(os.homedir(), '.lcaprc');

  if (!fs.existsSync(lcapConfigPath)) {
    return null;
  }

  const yaml = fs.readFileSync(lcapConfigPath, 'utf-8');
  const config = YAML.parse(yaml);

  return config;
}

export function updateLcapConfg(config) {
  const lcapConfig = getLcapConfig();
  Object.keys(config).forEach((key) => {
    if (lcapConfig[key]) {
      lcapConfig[key] = config[key];
    }
  });

  const yaml = YAML.stringify(lcapConfig);
  fs.writeFileSync(path.resolve(os.homedir(), '.lcaprc'), yaml);
}

export function updatePackageInfo(rootPath: string, pkgInfo: any) {
  const pkgPath = path.resolve(rootPath, 'package.json');
  const pkg = fs.readJSONSync(pkgPath);
  Object.keys(pkgInfo).forEach((key) => {
    if (pkg[key]) {
      pkg[key] = pkgInfo[key];
    }
  });

  fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2));
}

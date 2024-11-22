import { type NaslUIComponentConfig } from '../overload';

const fs = require('fs-extra');
const path = require('path');

export const getPackName = (name, version) => `${name.replace(/@/g, '').replace(/\//g, '-')}-${version}.tgz`;

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

export const getComponentConfigByName = (name: string, list: NaslUIComponentConfig[]) => {
  const flatList = list.map((c) => {
    const arr = [c];
    arr.push(...c.children);
    return arr;
  }).flat();

  return flatList.find((c) => c.name === name);
};

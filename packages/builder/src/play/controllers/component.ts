import fs from 'fs-extra';
import path from 'path';
import genNaslComponentConfig from '../../build/gens/gen-nasl-component-config';
import { getComponentMetaInfos } from '../../utils/lcap';
import { createAPIHandler } from '../middleware';

export const getComponentList = createAPIHandler('/api/component/list', 'GET', async (req) => {
  const list = getComponentMetaInfos(req.context.rootPath, true);
  return list;
});

export const getComponentDetail = createAPIHandler('/api/component/info', 'GET', async (req) => {
  const packageInfo = fs.readJSONSync(path.join(req.context.rootPath, 'package.json'));
  const { name } = req.query;
  const list = getComponentMetaInfos(req.context.rootPath, true);
  const component = list.find((item) => item.name === name);
  if (!component) {
    return null;
  }

  const componentConfig = genNaslComponentConfig({
    rootPath: req.context.rootPath,
    apiPath: component.tsPath,
    assetsPublicPath: req.context.assetsPublicPath,
    extraConfig: {},
    framework: req.context.framework,
    libInfo: {
      name: packageInfo.name,
      version: packageInfo.version,
    },
  });

  return componentConfig;
});

export const getComponentFileContent = createAPIHandler('/api/component/api/file', 'GET', async (req) => {
  const { name } = req.query;
  const list = getComponentMetaInfos(req.context.rootPath, true);
  const component = list.find((item) => item.name === name);
  if (!component) {
    return null;
  }

  const content = fs.readFileSync(component.tsPath, 'utf-8');

  return content;
});

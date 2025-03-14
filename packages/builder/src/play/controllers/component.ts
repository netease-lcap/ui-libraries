import fs from 'fs-extra';
import path from 'path';
import genNaslComponentConfig from '../../build/gens/gen-nasl-component-config';
import { createAPIHandler } from '../middleware';
import { getComponentMetaInfos, removeComponentFiles } from '../../utils/lcap';
import { executeCreateForSchema } from '../../creates/schema';
import { getExtensionProjectMeta } from '../../utils/project';
import updateAPIFile from '../../utils/api-update';
import { addTypeMap } from '../transform';

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

  return addTypeMap(componentConfig);
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

export const createComponentFromSchema = createAPIHandler('/api/component/create', 'POST', async (req) => {
  const { name } = req.data;
  const { rootPath } = req.context;

  const pkgInfo = fs.readJSONSync(path.resolve(rootPath, 'package.json'));

  if (!pkgInfo.lcap?.schema) {
    throw new Error('未找到本地NPM扫描结果文件');
  }

  await executeCreateForSchema(rootPath, getExtensionProjectMeta(rootPath), pkgInfo.lcap?.schema, name);

  return true;
});

export const removeComponent = createAPIHandler('/api/component/remove', 'POST', async (req) => {
  const { name } = req.data;
  const { rootPath } = req.context;

  removeComponentFiles(rootPath, name);

  return true;
});

export const updateComponent = createAPIHandler('/api/component/update', 'POST', async (req) => {
  const { tsPath, actions } = req.data;

  await updateAPIFile(tsPath, actions);

  return true;
});

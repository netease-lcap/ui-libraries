import { createAPIHandler } from '../middleware';
import {
  getSourceSchema,
  getExtensionProjectMeta,
  getLcapConfig,
  updateLcapConfg,
  updatePackageInfo,
} from '../../utils/project';
import { getPreviewURL as getPreviewURLService } from '../preview';
import { exec } from '../../utils/exec';

export const healthCheck = createAPIHandler('/api/health', 'GET', async (req) => {
  return 'ok';
});

export const getProjectMeta = createAPIHandler('/api/project/meta', 'GET', async (req) => {
  const meta = getExtensionProjectMeta(req.context.rootPath);
  return meta;
});

export const getProjectSchema = createAPIHandler('/api/project/source', 'GET', async (req) => {
  const schema = getSourceSchema(req.context.rootPath);
  return schema;
});

export const getProjectLcapConfig = createAPIHandler('/api/project/lcap', 'GET', async (req) => {
  return getLcapConfig();
});

export const publish = createAPIHandler('/api/project/release', 'POST', async (req) => {
  const {
    name,
    version,
    title,
    description,
    platform,
    username,
    password,
  } = req.data;
  updateLcapConfg({
    username,
    platform,
    password,
  });

  updatePackageInfo(req.context.rootPath, {
    name,
    version,
    title,
    description,
  });

  try {
    await exec('npm run release');
  } catch (e: any) {
    throw new Error('发布失败, 请根据终端中的异常信息进行排查');
  }

  return true;
});

export const getPreviewURL = createAPIHandler('/api/project/previewURL', 'GET', async (req) => {
  return getPreviewURLService();
});

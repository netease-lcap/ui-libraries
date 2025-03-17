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

  await exec('npm run release');

  return true;
});

export const getPreviewURL = createAPIHandler('/api/project/previewURL', 'GET', async (req) => {
  return getPreviewURLService();
});

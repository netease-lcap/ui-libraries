import { createAPIHandler } from '../middleware';
import {
  getSourceSchema, getExtensionProjectMeta, getLcapConfig, updateLcapConfg,
} from '../../utils/project';
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
  await exec('npm run release');

  return true;
});

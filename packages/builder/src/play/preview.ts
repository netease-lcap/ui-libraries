import { getExtensionProjectMeta, getLcapConfig } from '../utils/project';
import logger from '../utils/logger';
import { getComponentMetaInfos } from '../utils/lcap';
import { exec } from '../utils/exec';

let previewURL = '';
export async function startPreview(rootPath: string, https: boolean = false) {
  const config = await getLcapConfig();
  const meta = await getExtensionProjectMeta(rootPath);
  const componentList = await getComponentMetaInfos(rootPath, true);

  let platformURL = config.platformURL || 'https://csforkf.lcap.codewave-test.163yun.com/';

  platformURL = platformURL.substring(platformURL.indexOf('://'));

  const version = '3.13.2';

  const commands: string[] = [
    'npx lcap-ide-server-proxy',
    `--IDE_VERSION=${version}`,
    `--PLATFORM_URL=${https ? 'https' : 'http'}${platformURL}`,
    '--LIB_PATH=.',
    `--LIB_TYPE=${componentList[0].type === 'h5' ? 'h5' : 'pc'}`,
    `--LIB_FRAMEWORK_KIND=${meta.framework}`,
  ];

  const port = 3000;

  try {
    previewURL = `${https ? 'https' : 'http'}://localhost:${port}/designer/uidev?appId=demo&branch=feauter-uidev314`;
    logger.info(`ide 预览服务启动中...., 平台地址：${https ? 'https' : 'http'}${platformURL}`);
    await exec(commands.join(' '));
  } catch (e) {
    logger.error('ide 预览服务启动失败，platform');
  }

  return '';
}

export function getPreviewURL() {
  return previewURL;
}

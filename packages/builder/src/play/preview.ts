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

  platformURL = (https ? 'https' : 'http') + platformURL.substring(platformURL.indexOf('://'));

  const version = '3.13.2';

  const commands: string[] = [
    'npx lcap-ide-server-proxy',
    `--PLATFORM_URL=${platformURL}`,
    '--LIB_PATH=.',
  ];

  const port = 3000;
  const params: string[] = [
    `IDE_VERSION=${version}`,
    `LIB_TYPE=${componentList[0].type === 'h5' ? 'h5' : 'pc'}`,
    `LIB_FRAMEWORK_KIND=${meta.framework}`,
    `LIB_SERVICE=${https ? 'https' : 'http'}://localhost:${port}/`,
  ];

  try {
    previewURL = `${platformURL.endsWith('/') ? platformURL : `${platformURL}/`}designer/uidev?appId=demo&branch=feauter-uidev314&${params.join('&')}`;
    logger.info(`ide 预览服务启动中...., 平台地址：${platformURL}`);
    await exec(commands.join(' '));
  } catch (e) {
    logger.error('ide 预览服务启动失败，platform');
  }

  return '';
}

export function getPreviewURL() {
  return previewURL;
}

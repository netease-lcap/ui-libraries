import portfinder from 'portfinder';
import { getExtensionProjectMeta, getLcapConfig } from '../utils/project';
import logger from '../utils/logger';
import { getComponentMetaInfos } from '../utils/lcap';
import { exec } from '../utils/exec';

let previewURL = '';
export async function startPreview(rootPath: string, https: boolean = false) {
  const config = await getLcapConfig();
  const meta = await getExtensionProjectMeta(rootPath);
  const componentList = await getComponentMetaInfos(rootPath, true);
  const port = await portfinder.getPortPromise({
    port: 3000,
    stopPort: 3333,
  });

  const protocol = https ? 'https' : 'http';
  let platformURL = config.platformURL || 'https://csforkf.lcap.codewave-test.163yun.com/';

  platformURL = `${protocol}${platformURL.substring(platformURL.indexOf('://'))}`;

  const version = '3.13.2';

  const commands: string[] = [
    'npx lcap-ide-server-proxy localserver',
    `--PLATFORM_URL=${platformURL}`,
    '--LIB_PATH=.',
    `--IDE_VERSION=${version}`,
    `--PORT=${port}`,
    `--LIB_TYPE=${componentList[0].type === 'h5' ? 'h5' : 'pc'}`,
    `--LIB_FRAMEWORK_KIND=${meta.framework}`,
    // `--LIB_SERVICE=http://localhost:${port}/`,
  ];

  try {
    previewURL = `${protocol}://localhost:${port}/designer/uidev?appId=demo&branch=feature-uidev3142&MODE=localserver&LIB_SERVICE=${protocol}://localhost:${port}`;
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

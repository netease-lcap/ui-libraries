import * as extensionUI from '@lcap/extension-ui';
import startWatcher, { getBuildConfig } from './watch';
import { routes, createAPIMiddleware } from '../play';
import { startPreview } from '../play/preview';

export interface PlayCommandOptions {
  port?: number;
  https?: boolean;
}

export default async (rootPath: string, { port, https }: PlayCommandOptions) => {
  const buildConfigs = await getBuildConfig();

  const base = '/play';
  // 文件监听、静态服务器 websocket, 请求转发
  await startWatcher(
    rootPath,
    {
      port,
      https,
      openURL: `${base}/index.html`,
      middlewares: [
        createAPIMiddleware(routes, {
          ...buildConfigs.buildOptions,
        }),
        extensionUI({
          base,
        }),
      ],
      onFirstBuilded: () => {
        startPreview(rootPath, https);
      },
    },
    buildConfigs,
  );
};

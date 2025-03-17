import startWatcher, { getBuildConfig } from './watch';
import { routes, createAPIMiddleware } from '../play';
import { startPreview } from '../play/preview';

export interface PlayCommandOptions {
  port?: number;
  https?: boolean;
}

export default async (rootPath: string, { port, https }: PlayCommandOptions) => {
  const buildConfigs = await getBuildConfig();

  // 文件监听、静态服务器 websocket, 请求
  await startWatcher(
    rootPath,
    {
      port,
      https,
      openURL: '/play',
      middlewares: [
        createAPIMiddleware(routes, {
          ...buildConfigs.buildOptions,
        }),
      ],
      onFirstBuilded: () => {
        startPreview(rootPath, https);
      },
    },
    buildConfigs,
  );
  // TODO open 具体地址 /play/index.html
};

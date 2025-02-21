import startWatcher, { getBuildConfig } from './watch';
import { routes, createAPIMiddleware } from '../play';

export interface PlayCommandOptions {
  port?: number;
  https?: boolean;
}

export default async (rootPath: string, { port, https }: PlayCommandOptions) => {
  const buildConfigs = await getBuildConfig();
  // TODO 生成 editor 文件目录
  // 文件监听、静态服务器 websocket, 请求
  await startWatcher(
    rootPath,
    {
      port,
      https,
      middlewares: [
        createAPIMiddleware(routes, {
          ...buildConfigs.buildOptions,
        }),
      ],
    },
    buildConfigs,
  );
  // TODO open 具体地址 /play/index.html
};

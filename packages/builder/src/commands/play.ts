import type { IncomingMessage, ServerResponse } from 'http';
import chokidar from 'chokidar';
import { normalizePath } from 'vite';
import type { LcapBuildOptions } from '../build/types';
import startWatcher, { getBuildConfig } from './watch';
import { routes, createAPIMiddleware } from '../play';
import { startPreview } from '../play/preview';
import LiveServer from '../utils/server';
import logger from '../utils/logger';

const extensionUI = require('@lcap/extension-ui');

export interface PlayCommandOptions {
  port?: number;
  https?: boolean;
  noPreview?: boolean;
  noWatch?: boolean;
}

async function startNoWatchServer(rootPath: string, options: LcapBuildOptions, { port, https, middlewares, openURL }: Pick<PlayCommandOptions, 'port' | 'https'> & { middlewares: ((req: IncomingMessage, res: ServerResponse, next: () => void) => void)[]; openURL?: string }) {
  const server = await LiveServer.start({
    port,
    https,
    cors: true,
    middlewares: [
      ...middlewares,
    ],
    openURL,
  });

  const watcher = chokidar.watch(['./src', './src-vusion'], {
    ignoreInitial: true,
  });

  const handleFileChange = async (filePath: string, action: 'add' | 'change' | 'unlink') => {
    const normalizedFilePath = normalizePath(filePath);
    // 只监听 API 可视化的相关文件变化
    if (!['/block.stories', 'screenshots/', 'drawings/', 'api.ts'].some((p) => normalizedFilePath.includes(p))) {
      return;
    }

    if (options.type === 'nasl.ui') {
      server.send('nasl.ui building');
    } else {
      server.send('nasl.extension building building');
    }
  };

  watcher.on('add', (filePath) => handleFileChange(filePath, 'add'))
    .on('change', (filePath) => handleFileChange(filePath, 'change'))
    .on('unlink', (filePath) => handleFileChange(filePath, 'unlink'));
}

export default async (rootPath: string, { port, https, noPreview, noWatch }: PlayCommandOptions) => {
  const buildConfigs = await getBuildConfig();

  const base = '/play';
  const openURL = `${base}/index.html${noPreview || noWatch ? '?editor=1' : ''}`;
  const middlewares = [
    createAPIMiddleware(routes, {
      ...buildConfigs.buildOptions,
    }),
    extensionUI({
      base,
    }),
  ];

  if (noWatch) {
    await startNoWatchServer(rootPath, buildConfigs.buildOptions, {
      port,
      https,
      middlewares,
      // openURL,
    });
    logger.success('play server started');
    return;
  }
  // 文件监听、静态服务器 websocket, 请求转发
  await startWatcher(
    rootPath,
    {
      port,
      https,
      openURL,
      middlewares,
      onFirstBuilded: () => {
        !noPreview && startPreview(rootPath, https);
      },
    },
    buildConfigs,
  );
};

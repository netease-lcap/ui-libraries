import startWatcher from './watch';

export interface PlayCommandOptions {
  port?: number;
  https?: boolean;
}

export default async (rootPath: string, { port, https }: PlayCommandOptions) => {
  // TODO 生成 editor 文件目录
  // 文件监听、静态服务器 websocket, 请求
  await startWatcher(rootPath, { port, https });
  // TODO open 具体地址 /play/index.html
};

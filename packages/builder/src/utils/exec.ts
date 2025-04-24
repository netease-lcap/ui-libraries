import { spawn, spawnSync } from 'child_process';
import logger from './logger';

/**
 * 使用 spawnSync 的 shell inherit 模式，直接对接主进程的 stdio
 * @param args 命令参数，每一项可以为字符串或是字符串数组
 * @example
 * execSync('rm', '-rf', 'node_modules')
 * execSync('git clone', 'xxx')
 */
export function execSync(...args: Array<string>) {
  const command = args.join(' ');
  logger.info('execute command: ', command);
  const result = spawnSync(command, { shell: true, stdio: 'inherit' });
  if (result.status !== null && result.status > 0) {
    // 异常退出
    throw new Error(`execute command error: ${command}`);
  }

  return result;
}

/**
 * 使用 spawn 的 shell inherit 模式，直接对接主进程的 stdio
 * @param args 命令参数，每一项可以为字符串或是字符串数组
 * await exec('rm', '-rf', 'node_modules')
 * await exec('git clone', 'xxx')
 */
export function exec(...args: Array<string>) {
  const command = args.join(' ');
  let ended = false;
  return new Promise(((resolve, reject) => {
    const result = spawn(command, { shell: true, stdio: 'inherit' });
    result.on('error', (e) => {
      if (!ended) {
        ended = true;
        reject(e);
      }
    });
    result.on('exit', (code) => {
      if (!ended) {
        ended = true;
        (code === 0 ? resolve(true) : reject());
      }
    });
    result.on('close', (code) => {
      if (!ended) {
        ended = true;
        (code === 0 ? resolve(true) : reject());
      }
    });
  }));
}

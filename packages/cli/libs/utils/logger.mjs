/* eslint-disable default-param-last */
import chalk from 'chalk';
import * as events from 'events';
import * as readline from 'readline';

export const event = new events.EventEmitter();
// eslint-disable-next-line no-underscore-dangle
function _log(type, tag, message) {
  if (process.env.VUSION_API_MODE && message) {
    event.emit('log', {
      message,
      type,
      tag,
    });
  }
}
const format = (label, msg) => msg
  .split('\n')
  .map((line, i) => {
    if (i === 0) return `${label} ${line}`;
    return (line || '').padStart(chalk.reset(label).length);
  })
  .join('\n');
const chalkTag = (msg) => chalk.bgBlackBright.white.dim(` ${msg} `);
/**
 * 打印普通日志
 * @param msg 日志信息
 * @param tag 添加一个灰色标签
 */
// eslint-disable-next-line default-param-last
export function log(msg = '', tag) {
  // eslint-disable-next-line no-unused-expressions
  tag ? console.info(format(chalkTag(tag), msg)) : console.info(msg);
  _log('log', tag, msg);
}
/**
 * 打印信息日志
 * @param msg 日志信息
 * @param tag 添加一个灰色标签
 */
export function info(msg = '', tag) {
  console.info(
    format(chalk.bgBlue.black(' INFO ') + (tag ? chalkTag(tag) : ''), msg),
  );
  _log('info', tag, msg);
}
/**
 * 打印普通日志
 * @param msg 日志信息
 * @param tag 添加一个灰色标签
 */
export function done(msg = '', tag) {
  console.info(
    format(chalk.bgGreen.black(' DONE ') + (tag ? chalkTag(tag) : ''), msg),
  );
  _log('done', tag, msg);
}
/**
 * 打印警告日志
 * @param msg 日志信息
 * @param tag 添加一个灰色标签
 */
export function warn(msg = '', tag) {
  console.warn(
    format(
      chalk.bgYellow.black(' WARN ') + (tag ? chalkTag(tag) : ''),
      chalk.yellow(msg),
    ),
  );
  _log('warn', tag, msg);
}
/**
 * 打印错误日志
 * @param msg 日志信息，可以为一个 Error 对象
 * @param tag 添加一个灰色标签
 */
export function error(msg = '', tag) {
  console.error(
    format(
      chalk.bgRed(' ERROR ') + (tag ? chalkTag(tag) : ''),
      chalk.red(String(msg)),
    ),
  );
  _log('error', tag, String(msg));
  if (msg instanceof Error) {
    console.error(msg.stack);
    _log('error', tag, msg.stack);
  }
}
/**
 * 清除控制台
 * @param title 清除后打印一个标题
 */
export function clearConsole(title) {
  if (process.stdout.isTTY) {
    const blank = '\n'.repeat(process.stdout.rows);
    console.info(blank);
    readline.cursorTo(process.stdout, 0, 0);
    readline.clearScreenDown(process.stdout);
    if (title) {
      console.info(title);
    }
  }
}

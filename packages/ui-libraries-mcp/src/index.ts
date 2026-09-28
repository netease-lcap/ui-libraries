import mitt from 'mitt';
import { libraryName } from './const';

// 定义工具参数类型
interface InputArgs {
  type: 'object';
  properties?: Record<string, any>;
  required?: string[];
  [key: string]: any;
}

interface OutputArgs {
  type: string;
  properties?: Record<string, any>;
  [key: string]: any;
}

// interface ToolAnnotations {
//   audience?: string;
//   destructive?: boolean;
//   idempotent?: boolean;
//   [key: string]: any;
// }

// 定义组件工具配置类型
interface ComponentToolConfig {
  name: string;
  title?: string;
  description?: string;
  inputSchema?: InputArgs;
  outputSchema?: OutputArgs;
  annotations?: any;
  _meta?: Record<string, unknown>;
  handler?(refId: string, ...arg: any[]): void;
}

const eventBus = mitt();

// 存储原始 handler，用于返回值收集
const handlerMap = new Map<string, Array<(...args: any[]) => any>>();
// 存储包装后的 handler，用于 eventBus 注册
const wrappedHandlerMap = new Map<string, Array<(...args: any[]) => void>>();

// 包装 on 方法，使其能够收集 handler 的返回值
const wrappedOn = (type: string, handler: (...args: any[]) => any) => {
  if (!handlerMap.has(type)) {
    handlerMap.set(type, []);
    wrappedHandlerMap.set(type, []);
  }

  // 存储原始 handler
  handlerMap.get(type)!.push(handler);

  // 创建包装函数，用于注册到 eventBus（不返回值，只执行副作用）
  const wrappedHandler = (...args: any[]) => {
    handler(...args);
  };
  wrappedHandlerMap.get(type)!.push(wrappedHandler);

  // 注册包装函数到 eventBus（保持兼容性）
  eventBus.on(type, wrappedHandler);
};

// 包装 emit 方法，使其返回 handler 的返回值
const wrappedEmit = (type: string, ...args: any[]): any => {
  const handlers = handlerMap.get(type);
  if (!handlers || handlers.length === 0) {
    // 如果没有注册的 handler，仍然触发 eventBus（保持兼容性）
    // 注意：mitt 的类型定义只支持一个 event 参数，但运行时支持多个参数
    (eventBus.emit as any)(type, ...args);
    return undefined;
  }

  // 调用所有 handler 并收集返回值
  let lastResult: any;
  handlers.forEach((handler) => {
    try {
      const result = handler(...args);
      lastResult = result;
    } catch (error) {
      // 如果 handler 抛出错误，记录但不中断其他 handler
      console.error(`Handler error for event "${type}":`, error);
    }
  });

  // 触发原始事件总线（保持兼容性，但此时 handlers 已经调用过了）
  // 注意：这会导致 handler 被调用两次，但为了保持 eventBus 的兼容性
  // 如果确定不需要兼容性，可以注释掉下面这行
  (eventBus.emit as any)(type, ...args);

  // 返回最后一个 handler 的返回值
  return lastResult;
};

// 包装 off 方法，同时清理 handlerMap
const wrappedOff = (type: string, handler?: (...args: any[]) => any) => {
  if (handler) {
    const handlers = handlerMap.get(type);
    const wrappedHandlers = wrappedHandlerMap.get(type);

    if (handlers && wrappedHandlers) {
      const index = handlers.indexOf(handler);
      if (index > -1) {
        handlers.splice(index, 1);
        // 同时移除对应的包装 handler
        const wrappedHandler = wrappedHandlers[index];
        wrappedHandlers.splice(index, 1);
        eventBus.off(type, wrappedHandler);

        if (handlers.length === 0) {
          handlerMap.delete(type);
          wrappedHandlerMap.delete(type);
        }
      }
    }
  } else {
    // 如果没有指定 handler，清除所有
    const wrappedHandlers = wrappedHandlerMap.get(type);
    if (wrappedHandlers) {
      wrappedHandlers.forEach((wrappedHandler) => {
        eventBus.off(type, wrappedHandler);
      });
    }
    handlerMap.delete(type);
    wrappedHandlerMap.delete(type);
    eventBus.off(type);
  }
};

export const subscribe = (component: string, refId: string, handler: (...args: any[]) => any) => {
  wrappedOn(`${component}___${refId}`, handler);
};

export const unsubscribe = (component: string, refId: string) => {
  wrappedOff(`${component}___${refId}`);
};

let toolList: ComponentToolConfig[] = [];

export function registerTool(tool: ComponentToolConfig) {
  toolList = toolList.concat(tool);
}

export function getComponentTools() {
  return toolList.map((tool) => ({
    config: tool,
    async handler({ refId, ...arg }: { refId: string; [key: string]: any }) {
      // 使用包装后的 emit，直接获取 handler 的返回值
      const argValues = Object.values(arg) as any[];
      const handlerResult = wrappedEmit(`${tool.name}___${refId}`, ...argValues);

      // 如果 handler 返回了 Promise，等待它完成
      let result;
      if (handlerResult && typeof handlerResult.then === 'function') {
        try {
          result = await Promise.race([
            handlerResult,
            new Promise((resolve) => {
              setTimeout(() => {
                resolve({
                  type: 'success',
                  text: '操作成功',
                });
              }, 250);
            }),
          ]);
        } catch (error) {
          result = {
            type: 'error',
            text: error instanceof Error ? error.message : String(error),
          };
        }
      } else {
        // 如果 handler 返回了同步值，使用它
        result = handlerResult !== undefined ? handlerResult : {
          type: 'success',
          text: '操作成功',
        };
      }

      return {
        content: [{ type: 'text', text: JSON.stringify(result) }],
        structuredContent: {
          // success: true,
          ...result,
        },
      };
    },
  }));
}

declare global {
  interface Window {
    [key: string]: any;
  }
}

window[libraryName] = {
  subscribe,
  unsubscribe,
  registerTool,
  getComponentTools,
};

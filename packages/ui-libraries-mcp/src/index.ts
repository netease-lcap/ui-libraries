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

export const subscribe = (component: string, refId: string, handler: (...args: any[]) => void) => {
  eventBus.on(`${component}___${refId}`, handler);
};

export const unsubscribe = (component: string, refId: string) => {
  eventBus.off(`${component}___${refId}`);
};

let toolList: ComponentToolConfig[] = [];

export function registerTool(tool: ComponentToolConfig) {
  toolList = toolList.concat(tool);
}

export function getComponentTools() {
  return toolList.map((tool) => ({
    config: tool,
    async handler({ refId, ...arg }) {
      eventBus.emit(`${tool.name}___${refId}`, ...(Object.values(arg) as [any, any]));
      const result = await Promise.race([
        new Promise((resolve, reject) => {
          eventBus.on(`${tool.name}___${refId}_result`, (success: boolean, ...result: any) => {
            eventBus.off(`${tool.name}___${refId}_result`);
            if (success) {
              resolve(...result);
            } else {
              reject(result[0]);
            }
          });
        }),
        new Promise((resolve) => {
          eventBus.off(`${tool.name}___${refId}_result`);
          setTimeout(() => {
            resolve({
              type: 'success',
              text: '操作成功',
            });
          }, 250);
        }),
      ]);
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

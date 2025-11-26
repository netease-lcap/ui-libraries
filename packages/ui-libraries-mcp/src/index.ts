import mitt from 'mitt';

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

interface ToolAnnotations {
  audience?: string[];
  destructive?: boolean;
  idempotent?: boolean;
  [key: string]: any;
}

// 定义组件工具配置类型
interface ComponentToolConfig {
  name: string;
  title?: string;
  description?: string;
  inputSchema?: InputArgs;
  outputSchema?: OutputArgs;
  annotations?: ToolAnnotations;
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
    ...tool,
    handler(refId: string, ...arg: []) {
      eventBus.emit(`${tool.name}___${refId}`, ...arg);
    },
  }));
}

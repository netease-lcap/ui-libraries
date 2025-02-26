/* eslint-disable global-require */
import * as babel from '@babel/core';
import * as bt from '@babel/types';
import traverse from '@babel/traverse';
import generate from '@babel/generator';
import type {
  MaterialComponentEvent,
  MaterialComponentMethod,
  MaterialComponentSlot,
  MaterialComponentAttr,
} from '@lcap/material-parser';
import { omit, pick } from 'lodash';
import fs from 'fs-extra';
import { evalOptions, formatCode, getAST } from './babel-utils';

export interface APIEditorBaseOptions {
  type: 'add' | 'update' | 'remove';
  module: 'info' | 'subComponent' | 'prop' | 'event' | 'slot' | 'method' | 'readableProp';
  name: string;
}

export interface APIUpdateInfoOptions extends APIEditorBaseOptions {
  type: 'update';
  module: 'info';
  data: Record<string, any>;
}

export function updateInfo(ast: bt.File, options: APIUpdateInfoOptions) {
  const { name, data } = options;
  const componentKeys = ['title', 'group', 'icon', 'description'];
  traverse(ast, {
    Decorator(path) {
      const p = path.get('expression');
      if (
        p.isCallExpression()
        && bt.isIdentifier(p.node.callee)
        && ['ExtensionComponent', 'Component', 'IDEExtraInfo'].includes(p.node.callee.name)
        && p.node.arguments[0]
        && p.node.arguments[0].type === 'ObjectExpression'
        && bt.isClassDeclaration(path.parent)
        && bt.isIdentifier(path.parent.id)
        && path.parent.id.name === name
      ) {
        const obj = evalOptions(p.node.arguments[0]) || {};
        if (p.node.callee.name === 'Component') {
          p.node.arguments[0] = getAST(Object.assign(obj, pick(data, componentKeys)));
        } else {
          p.node.arguments[0] = getAST(Object.assign(obj, omit(data, componentKeys)));
        }
      }
    },
  });

  return ast;
}

export interface APIAddSubComponentOptions extends APIEditorBaseOptions {
  type: 'add',
  module: 'subComponent',
}

export function addSubComponent(ast: bt.File, options: APIAddSubComponentOptions) {

}

export interface APIRemoveSubComponentOptions extends APIEditorBaseOptions {
  type: 'remove',
  module: 'subComponent',
}

export function removeSubComponent(ast: bt.File, options: APIRemoveSubComponentOptions) {

}

export interface APIAddPropOptions extends APIEditorBaseOptions {
  type: 'add',
  module: 'prop',
  data: {
    name: string; // 属性名称
    schema?: MaterialComponentAttr;
  }
}

export function addProp(ast: bt.File, options: APIAddPropOptions) {

}

export interface APIUpdatePropOptions extends APIEditorBaseOptions {
  type: 'update',
  module: 'prop',
  data: {
    name: string;
    tsType?: string; // any;
    defaultValue?: string; // any;
    [key: string]: any;
  };
}

export function updateProp(ast: bt.File, options: APIUpdatePropOptions) {

}

export interface APIRemovePropOptions extends APIEditorBaseOptions {
  type: 'remove',
  module: 'prop',
  data: {
    name: string; // 属性名称
  },
}

export function removeProp(ast: bt.File, options: APIRemovePropOptions) {

}

export interface APIAddEventOptions extends APIEditorBaseOptions {
  type: 'add',
  module: 'event',
  data: {
    name: string; // 属性名称
    schema?: MaterialComponentEvent;
  }
}

export function addEvent(ast: bt.File, options: APIAddEventOptions) {

}

export interface APIUpdateEventOptions extends APIEditorBaseOptions {
  type: 'update',
  module: 'event',
  data: {
    name: string;
    eventTsType?: string; // any;
    [key: string]: any;
  };
}

export function updateEvent(ast: bt.File, options: APIUpdateEventOptions) {

}

export interface APIRemoveEventOptions extends APIEditorBaseOptions {
  type: 'remove',
  module: 'event',
  data: {
    name: string; // 属性名称
  },
}

export function removeEvent(ast: bt.File, options: APIRemoveEventOptions) {

}

export interface APIAddSlotOptions extends APIEditorBaseOptions {
  type: 'add',
  module: 'slot',
  data: {
    name: string; // 属性名称
    schema?: MaterialComponentSlot;
  }
}

export function addSlot(ast: bt.File, options: APIAddSlotOptions) {

}

export interface APIUpdateSlotOptions extends APIEditorBaseOptions {
  type: 'update',
  module: 'slot',
  data: {
    name: string;
    currentTsType?: string; // any;
    [key: string]: any;
  };
}

export function updateSlot(ast: bt.File, options: APIUpdateSlotOptions) {

}

export interface APIRemoveSlotOptions extends APIEditorBaseOptions {
  type: 'remove',
  module: 'slot',
  data: {
    name: string; // 属性名称
  },
}

export function removeSlot(ast: bt.File, options: APIRemoveSlotOptions) {

}

export interface APIAddReadablePropOptions extends APIEditorBaseOptions {
  type: 'add',
  module: 'readableProp',
  data: {
    name: string; // 属性名称
  },
}

export function addReadableProp(ast: bt.File, options: APIAddReadablePropOptions) {

}

export interface APIUpdateReadablePropOptions extends APIEditorBaseOptions {
  type: 'update',
  module: 'readableProp',
  data: {
    name: string;
    tsType?: string; // any;
    defaultValue?: string; // any;
    [key: string]: any;
  };
}

export function updateReadableProp(ast: bt.File, options: APIUpdateReadablePropOptions) {

}

export interface APIRemoveReadablePropOptions extends APIEditorBaseOptions {
  type: 'remove',
  module: 'readableProp',
  data: {
    name: string; // 属性名称
  },
}

export function removeReadableProp(ast: bt.File, options: APIRemoveReadablePropOptions) {

}

export interface APIAddMethodOptions extends APIEditorBaseOptions {
  type: 'add',
  module: 'method',
  data: {
    name: string; // 属性名称
    schema?: MaterialComponentMethod;
  }
}

export function addMethod(ast: bt.File, options: APIAddMethodOptions) {

}

export interface APIUpdateMethodOptions extends APIEditorBaseOptions {
  type: 'update',
  module: 'method',
  data: {
    name: string;
    params?: ({ name: string, tsType: string })[]; // any;
    returnTsType?: string;
    defaultValue?: string; // any;
    [key: string]: any;
  };
}

export function updateMethod(ast: bt.File, options: APIUpdateMethodOptions) {

}

export interface APIRemoveMethodOptions extends APIEditorBaseOptions {
  type: 'remove',
  module: 'method',
  data: {
    name: string; // 属性名称
  },
}

export function removeMethod(ast: bt.File, options: APIRemoveMethodOptions) {

}

export type APIUpdateOptions = APIUpdateInfoOptions
  | APIAddSubComponentOptions | APIRemoveSubComponentOptions
  | APIAddPropOptions | APIUpdatePropOptions
  | APIRemovePropOptions | APIAddEventOptions
  | APIUpdateEventOptions | APIRemoveEventOptions
  | APIAddSlotOptions | APIUpdateSlotOptions
  | APIRemoveSlotOptions | APIAddReadablePropOptions
  | APIUpdateReadablePropOptions | APIRemoveReadablePropOptions
  | APIAddMethodOptions | APIUpdateMethodOptions | APIRemoveMethodOptions;

export default async function updateAPIFile(tsPath: string, actions: APIUpdateOptions[]) {
  if (!tsPath || !fs.existsSync(tsPath)) {
    throw new Error(`未找到 api.ts 文件，${tsPath}`);
  }

  const tsCode = fs.readFileSync(tsPath, 'utf-8').toString();
  const ast = babel.parse(tsCode, {
    filename: 'result.ts',
    presets: [require('@babel/preset-typescript')],
    plugins: [
      [require('@babel/plugin-proposal-decorators'), { legacy: true }],
    ],
    rootMode: 'root',
    root: __dirname,
  }) as bt.File;

  actions.forEach((options) => {
    switch (true) {
      case options.module === 'info' && options.type === 'update':
        return updateInfo(ast, options);
      case options.module === 'subComponent' && options.type === 'add':
        return addSubComponent(ast, options);
      case options.module === 'subComponent' && options.type === 'remove':
        return removeSubComponent(ast, options);
      case options.module === 'prop' && options.type === 'add':
        return addProp(ast, options);
      case options.module === 'prop' && options.type === 'update':
        return updateProp(ast, options);
      case options.module === 'prop' && options.type === 'remove':
        return removeProp(ast, options);
      case options.module === 'event' && options.type === 'add':
        return addEvent(ast, options);
      case options.module === 'event' && options.type === 'update':
        return updateEvent(ast, options);
      case options.module === 'event' && options.type === 'remove':
        return removeEvent(ast, options);
      case options.module === 'slot' && options.type === 'add':
        return addSlot(ast, options);
      case options.module === 'slot' && options.type === 'update':
        return updateSlot(ast, options);
      case options.module === 'slot' && options.type === 'remove':
        return removeSlot(ast, options);
      case options.module === 'readableProp' && options.type === 'add':
        return addReadableProp(ast, options);
      case options.module === 'readableProp' && options.type === 'update':
        return updateReadableProp(ast, options);
      case options.module === 'readableProp' && options.type === 'remove':
        return removeReadableProp(ast, options);
      case options.module === 'method' && options.type === 'add':
        return addMethod(ast, options);
      case options.module === 'method' && options.type === 'update':
        return updateMethod(ast, options);
      case options.module === 'method' && options.type === 'remove':
        return removeMethod(ast, options);
      default:
        throw new Error(`未找到匹配的更新操作，${JSON.stringify(options)}`);
    }
  });

  let { code } = generate(ast);

  code = await formatCode(code, 'typescript');
  fs.writeFileSync(tsPath, code, 'utf-8');
}

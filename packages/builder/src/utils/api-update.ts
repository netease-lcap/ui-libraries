/* eslint-disable no-continue */
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
import {
  camelCase,
  isNil,
  kebabCase,
  omit,
  pick,
  upperFirst,
} from 'lodash';
import fs from 'fs-extra';
import {
  evalOptions,
  formatCode,
  getAPIPropAST,
  getAST,
  getTypeAST,
} from './babel-utils';
import {
  genAttrCode,
  genTitle,
  genEventCode,
  genSlotCode,
  genMethodCode,
  normalizeEventName,
  normalizeSlotName,
} from './schema-utils';
import { getProjectSourceSchema } from './lcap';

export interface APIEditorBaseOptions {
  type: 'add' | 'update' | 'remove' | 'order';
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
  data: {
    name?: string;
    sourceName?: string;
    title?: string;
    description?: string;
    type?: any;
  }
}

export function addSubComponent(ast: bt.File, options: APIAddSubComponentOptions) {
  const { sourceName } = options.data;
  let {
    name,
    title = '',
    description = '',
    type = 'pc',
  } = options.data;

  if (sourceName) {
    const schema = getProjectSourceSchema();
    const sourceComponent = schema.components.find((n) => n.name === sourceName);

    if (!sourceComponent) {
      throw new Error(`未找到组件 ${sourceName} 对应的解析结果`);
    }
    title = kebabCase(sourceName).split('-').map((s) => upperFirst(s)).join(' ');
    description = sourceComponent.description;
    name = upperFirst((schema.write && schema.write.prefix) || '') + sourceName;
    if (schema.write && schema.write.type) {
      type = schema.write.type;
    }
  }

  const codeTemplate = `namespace extensions.de.viewComponents {
  const { Component, Prop, ViewComponent, Slot, Method, Event, ViewComponentOptions } = nasl.ui;

  @ExtensionComponent({
    type: '${type}',
    ${sourceName ? `sourceName: '${sourceName}'` : ''}
    ideusage: {
      idetype: 'element',
    }
  })
  @Component({
    title: '${title}',
    description: '${description || title}',
  })
  export class ${name} extends ViewComponent {
    constructor(options?: Partial<${name}Options>) {
      super();
    }
  }

  export class ${name}Options extends ViewComponentOptions {
  }
}`;

  const tplAst = babel.parse(codeTemplate, {
    filename: 'result.ts',
    presets: [require('@babel/preset-typescript')],
    plugins: [
      [require('@babel/plugin-proposal-decorators'), { legacy: true }],
    ],
    rootMode: 'root',
    root: __dirname,
  }) as bt.File;

  const exportClassASTs: bt.ExportNamedDeclaration[] = [];
  traverse(tplAst, {
    ExportNamedDeclaration(path) {
      if (bt.isClassDeclaration(path.node.declaration)) {
        exportClassASTs.push(path.node);
      }
    },
  });

  traverse(ast, {
    TSModuleBlock(path) {
      path.node.body.push(...exportClassASTs);
    },
  });
}

export interface APIRemoveSubComponentOptions extends APIEditorBaseOptions {
  type: 'remove',
  module: 'subComponent',
  data: {
    name: string;
  },
}

export function removeSubComponent(ast: bt.File, options: APIRemoveSubComponentOptions) {
  const { name } = options.data;
  traverse(ast, {
    ExportNamedDeclaration(path) {
      if (bt.isClassDeclaration(path.node.declaration) && bt.isIdentifier(path.node.declaration.id) && [name, `${name}Options`].includes(path.node.declaration.id.name)) {
        path.remove();
      }
    },
  });
}

function getPropertyMeta(componentName: string, type: APIEditorBaseOptions['module']) {
  const isStateProp = ['method', 'readableProp'].includes(type);
  const className = isStateProp ? componentName : `${componentName}Options`;
  const decoratorName = type === 'readableProp' ? 'Prop' : upperFirst(type);

  return {
    className,
    decoratorName,
  };
}

function insertProperty(ast: bt.File, property: bt.ClassProperty | bt.ClassMethod, componentName: string, type: APIEditorBaseOptions['module']) {
  const { className, decoratorName } = getPropertyMeta(componentName, type);

  traverse(ast, {
    ClassDeclaration(path) {
      if (bt.isIdentifier(path.node.id) && path.node.id.name === className) {
        const lastPropIndex = path.node.body.body.findLastIndex((n) => (
          bt.isClassProperty(n) && n.decorators
          && n.decorators.some((d) => (
            bt.isCallExpression(d.expression)
            && bt.isIdentifier(d.expression.callee)
            && d.expression.callee.name === decoratorName
          ))
        ));
        path.node.body.body.splice(lastPropIndex + 1, 0, property);
      }
    },
  });
}

function removeProperty(ast: bt.File, componentName: string, propName: string, type: APIEditorBaseOptions['module']) {
  const { className, decoratorName } = getPropertyMeta(componentName, type);

  if (type === 'event') {
    propName = normalizeEventName(propName);
  } else if (type === 'slot') {
    propName = normalizeSlotName(propName);
  }

  traverse(ast, {
    ClassDeclaration(path) {
      if (bt.isIdentifier(path.node.id) && path.node.id.name === className) {
        path.traverse({
          ClassProperty(p) {
            if (
              bt.isIdentifier(p.node.key)
              && p.node.key.name === propName
              && (p.node.decorators || []).some((d) => (
                bt.isCallExpression(d.expression)
                && bt.isIdentifier(d.expression.callee)
                && d.expression.callee.name === decoratorName
              ))
            ) {
              p.remove();
            }
          },
        });
      }
    },
  });

  // 移除驼峰形式的插槽
  if (type === 'slot' && propName.includes('-')) {
    const n = camelCase(propName);
    removeProperty(ast, componentName, n, type);
  }
}

function findPropertyAST(ast: bt.File, componentName: string, propName: string, type: APIEditorBaseOptions['module']) {
  const isStateProp = ['method', 'readableProp'].includes(type);
  const className = isStateProp ? componentName : `${componentName}Options`;
  const decoratorName = type === 'readableProp' ? 'Prop' : upperFirst(type);

  let propAST: bt.ClassProperty | bt.ClassMethod | undefined;
  let propOptionsAST: bt.ObjectExpression | undefined;
  traverse(ast, {
    ClassDeclaration(path) {
      if (bt.isIdentifier(path.node.id) && path.node.id.name === className) {
        propAST = path.node.body.body.find((n) => (
          (bt.isClassProperty(n) || bt.isClassMethod(n))
          && bt.isIdentifier(n.key)
          && n.key.name === propName
          && n.decorators
          && n.decorators.some((d) => bt.isCallExpression(d.expression) && bt.isIdentifier(d.expression.callee) && d.expression.callee.name === decoratorName)
        )) as any;

        if (propAST && propAST.decorators) {
          const propDecorator = propAST.decorators.find((d) => bt.isCallExpression(d.expression) && bt.isIdentifier(d.expression.callee) && d.expression.callee.name === decoratorName);
          propOptionsAST = (propDecorator?.expression as bt.CallExpression).arguments[0] as bt.ObjectExpression;
        }
      }
    },
  });

  return {
    propAST,
    propOptionsAST,
  };
}

function updatePropertyOptions(propOptionsAST: bt.ObjectExpression, rest: Record<string, any>) {
  const keys = Object.keys(rest);

  const stringifyKeys = ['onChange', 'if', 'disabledIf', 'setter'];

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    const value = rest[key];
    const propIndex = propOptionsAST.properties.findIndex((p) => (
      (bt.isObjectProperty(p) || bt.isObjectMethod(p))
        && p.key.type === 'Identifier'
        && p.key.name === key
    ));

    if (value === null) {
      propOptionsAST.properties.splice(propIndex, 1);
      continue;
    }

    const prop = propOptionsAST.properties[propIndex] as bt.ObjectProperty | bt.ClassMethod;
    const requireStringify = !stringifyKeys.includes(key);

    if (!prop) {
      propOptionsAST.properties.push({
        type: 'ObjectProperty',
        key: {
          type: 'Identifier',
          name: key,
        },
        value: getAST(value, requireStringify),
        computed: false,
        shorthand: false,
      });
    } else if (bt.isClassMethod(prop)) {
      propOptionsAST.properties[propIndex] = {
        type: 'ObjectProperty',
        key: {
          type: 'Identifier',
          name: key,
        },
        value: getAST(value, requireStringify),
        computed: false,
        shorthand: false,
      };
    } else {
      prop.value = getAST(value, requireStringify);
    }
  }
}

export interface APIAddPropOptions extends APIEditorBaseOptions {
  type: 'add',
  module: 'prop',
  data: {
    name: string; // 属性名称
    group?: string; // 属性分组
    schema?: MaterialComponentAttr;
  }
}

export function addProp(ast: bt.File, options: APIAddPropOptions) {
  const { name: componentName } = options;
  const { name, schema, group = '主要属性' } = options.data;
  let code = '';

  if (schema) {
    code = genAttrCode(schema, group);
  } else {
    code = `@Prop({
      group: '${group}',
      title: '${genTitle(name)}',
      description: '${genTitle(name)}',
      setter: {
        concept: 'InputSetter',
      },
    })
    ${name}: any;
    `;
  }
  const propAST = getAPIPropAST(code, name);

  insertProperty(ast, propAST, componentName, 'prop');
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
  const { name: componentName } = options;
  const { schema } = options.data;
  let code = '';

  const name = normalizeEventName(options.data.name);

  if (schema) {
    code = genEventCode(schema);
  } else {
    code = `@Event({
      title: '${genTitle(name)}',
      description: '${genTitle(name)}',
    })
    ${name}: (event: {}) => any;
    `;
  }
  const propAST = getAPIPropAST(code, name);

  insertProperty(ast, propAST, componentName, 'event');
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
  const { name: componentName } = options;
  const { schema } = options.data;
  let code = '';

  const name = normalizeSlotName(options.data.name);

  if (schema) {
    code = genSlotCode(schema);
  } else {
    code = `@Slot({
      title: '${genTitle(name)}',
      description: '${genTitle(name)}',
    })
    ${name.includes('-') ? `'${name}'` : name}: () => Array<nasl.ui.ViewComponent>;
    `;
  }
  const propAST = getAPIPropAST(code, name);

  insertProperty(ast, propAST, componentName, options.module);

  if (name.includes('-')) {
    const n = camelCase(name);
    const camelCaseAst = getAPIPropAST(`${n}: (current: {}) => Array<nasl.ui.ViewComponent>;`, n);
    insertProperty(ast, camelCaseAst, componentName, options.module);
  }
}

export interface APIAddReadablePropOptions extends APIEditorBaseOptions {
  type: 'add',
  module: 'readableProp',
  data: {
    name: string; // 属性名称
  },
}

export function addReadableProp(ast: bt.File, options: APIAddReadablePropOptions) {
  const { name: componentName } = options;
  const { name } = options.data;

  const code = `@Prop({
    title: '${genTitle(name)}',
    description: '${genTitle(name)}',
  })
  ${name}: any;
  `;

  const propAST = getAPIPropAST(code, name);

  insertProperty(ast, propAST, componentName, options.module);
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
  const { name: componentName } = options;
  const { name, schema } = options.data;
  let code = '';

  if (schema) {
    code = genMethodCode(schema);
  } else {
    code = `@Method({
      title: '${genTitle(name)}',
      description: '${genTitle(name)}',
    })
    ${name}(): void {
    }`;
  }

  const propAST = getAPIPropAST(code, name);

  insertProperty(ast, propAST, componentName, options.module);
}

export interface APIUpdatePropOptions extends APIEditorBaseOptions {
  type: 'update',
  module: 'prop' | 'event' | 'slot' | 'readableProp' | 'method',
  propName: string;
  data: {
    name?: string;
    tsType?: string; // any;
    defaultValue?: string; // any;
    [key: string]: any;
  };
}

export function updateProp(ast: bt.File, options: APIUpdatePropOptions) {
  const { name: componentName } = options;
  const {
    name,
    tsType,
    defaultValue,
    ...rest
  } = options.data;

  let { propName } = options;

  if (options.module === 'event') {
    propName = normalizeEventName(propName);
  } else if (options.module === 'slot') {
    propName = normalizeSlotName(propName);
  }

  const { propAST, propOptionsAST } = findPropertyAST(ast, componentName, propName, options.module);

  if (!propAST || !propOptionsAST) {
    throw new Error(`${componentName} 组件中未找到属性 ${propName} 的属性声明`);
  }

  if (name) {
    (propAST.key as bt.Identifier).name = name;
  }

  if (tsType) {
    const typeAST = getTypeAST(tsType);
    if (options.module === 'method' && bt.isClassMethod(propAST) && typeAST.type === 'TSFunctionType') {
      propAST.params = typeAST.parameters as any;
      if (typeAST.typeAnnotation) {
        propAST.returnType = typeAST.typeAnnotation;
        propAST.body.body = [
          {
            type: 'ReturnStatement',
            argument: {
              type: 'TSAsExpression',
              expression: {
                type: 'NullLiteral',
              },
              typeAnnotation: {
                type: 'TSAnyKeyword',
              },
            },
          },
        ];
      } else {
        propAST.returnType = {
          type: 'TSTypeAnnotation',
          typeAnnotation: {
            type: 'TSVoidKeyword',
          },
        } as bt.TSTypeAnnotation;
        propAST.body.body = [];
      }
    } else if (bt.isClassProperty(propAST)) {
      if (!propAST.typeAnnotation || propAST.typeAnnotation.type !== 'TSTypeAnnotation') {
        propAST.typeAnnotation = {
          type: 'TSTypeAnnotation',
          typeAnnotation: {
            type: 'TSAnyKeyword',
          },
        };
      }
      propAST.typeAnnotation.typeAnnotation = getTypeAST(tsType);
    }
  }

  if (!isNil(defaultValue) && bt.isClassProperty(propAST)) {
    propAST.value = defaultValue ? getAST(defaultValue, false) : null;
  }

  updatePropertyOptions(propOptionsAST, rest);
}

export interface APIRemovePropOptions extends APIEditorBaseOptions {
  type: 'remove',
  module: 'prop' | 'event' | 'slot' | 'readableProp' | 'method',
  propName: string;
}

export function removeProp(ast: bt.File, options: APIRemovePropOptions) {
  const { name: componentName, propName } = options;
  removeProperty(ast, componentName, propName, options.module);
}

export interface APIOrderPropOptions extends APIEditorBaseOptions {
  type: 'order',
  data: {
    names: string[];
    isOptions?: boolean;
  }
}

export function orderProp(ast: bt.File, options: APIOrderPropOptions) {
  const { name: componentName } = options;
  const { names, isOptions } = options.data;
  const className = isOptions ? `${componentName}Options` : componentName;

  traverse(ast, {
    ClassDeclaration(path) {
      if (bt.isIdentifier(path.node.id) && path.node.id.name === className) {
        path.node.body.body = [...path.node.body.body].sort((ast1: any, ast2: any) => {
          let index1 = ast1.key && ast1.key.name ? names.indexOf(ast1.key.name) : 1000;
          let index2 = ast2.key && ast2.key.name ? names.indexOf(ast2.key.name) : 1000;

          if (index1 === -1) {
            index1 = 1000;
          }
          if (index2 === -1) {
            index2 = 1000;
          }

          return index1 - index2;
        });
      }
    },
  });
}

export type APIUpdateOptions = APIUpdateInfoOptions
  | APIAddSubComponentOptions | APIRemoveSubComponentOptions
  | APIAddPropOptions | APIUpdatePropOptions
  | APIRemovePropOptions | APIAddEventOptions
  | APIAddSlotOptions | APIAddReadablePropOptions
  | APIAddMethodOptions | APIOrderPropOptions;

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
      case options.module === 'event' && options.type === 'add':
        return addEvent(ast, options);
      case options.module === 'slot' && options.type === 'add':
        return addSlot(ast, options);
      case options.module === 'readableProp' && options.type === 'add':
        return addReadableProp(ast, options);
      case options.module === 'method' && options.type === 'add':
        return addMethod(ast, options);
      case options.type === 'update':
        return updateProp(ast, options);
      case options.type === 'remove':
        return removeProp(ast, options);
      case options.type === 'order':
        return orderProp(ast, options);
      default:
        throw new Error(`未找到匹配的更新操作，${JSON.stringify(options)}`);
    }
  });

  let { code } = generate(ast);

  code = await formatCode(code, 'typescript');
  fs.writeFileSync(tsPath, code, 'utf-8');
}

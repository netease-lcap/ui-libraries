/* eslint-disable no-use-before-define */
import {
  ArrayExpression,
  JSXAttribute,
  JSXElement,
  JSXExpressionContainer,
  JSXFragment,
  JSXIdentifier,
  JSXMemberExpression,
  JSXNamespacedName,
  JSXSpreadAttribute,
  JSXText,
  JSXSpreadChild,
  Expression,
} from '@babel/types';
import reactStyleToCSS from 'react-style-object-to-css';
import { kebabCase, lowerFirst } from 'lodash';
import { getNodeCode } from './utils';
import transformExpression2Nasl from './transform-expression2nasl';
import transformFunc2Nasl from './transform-func2nasl';

export interface NaslViewContext {
  variableNames?: string[];
  logics?: string[];
}

export interface NaslViewElement {
  concept: 'ViewElement';
  tag: string;
  name: string;
  staticStyle?: string;
  staticClass?: string;
  slotTarget?: string;
  slotScope?: string;
  bindAttrs: any[];
  bindEvents: any[];
  bindDirectives: any[];
  bindRoles: any[];
  bindStyles: any[];
  children: NaslViewElement[];
}

export const EVENT_REGEX = /^on[A-Z].*/;

export function getJSXName(ast: JSXIdentifier | JSXNamespacedName | JSXMemberExpression) {
  if (ast.type !== 'JSXIdentifier') {
    throw new Error(`解析 JSXElement 异常, TagName 只运行命名标识, ${getNodeCode(ast)}`);
  }

  return ast.name;
}

const parseJSXStyle = (node) => {
  if (node.type === 'StringLiteral') {
    return node.value;
  }

  if (node.type === 'JSXExpressionContainer' && node.expression.type === 'ObjectExpression') {
    // eslint-disable-next-line no-eval
    const styleObj = eval(`(${getNodeCode(node.expression)})`);
    return reactStyleToCSS(styleObj);
  }

  return null;
};

const getSlotName = (attrName: string) => {
  const slotRegex = /^slot[A-Z].*/;
  if (slotRegex.test(attrName)) {
    return lowerFirst(attrName.substring(4));
  }

  const slotPrefix = 'slot-';
  if (attrName.startsWith(slotPrefix)) {
    return attrName.substring(slotPrefix.length);
  }

  return attrName;
};

const isJSXEleArray = (ast: ArrayExpression) => ast.elements.findIndex((n) => !n || (n.type !== 'JSXElement' && n.type !== 'JSXFragment')) === -1;

const createTextNode = (str = '') => {
  if (!str || !str.trim()) {
    return null;
  }

  return {
    concept: 'ViewElement',
    tag: 'Text',
    name: '',
    bindAttrs: [{
      concept: 'BindAttribute',
      type: 'string',
      name: 'children',
      value: str,
    }],
    bindEvents: [],
    bindDirectives: [],
    bindRoles: [],
    bindStyles: [],
    children: [],
  } as NaslViewElement;
};

const SYNC_KEY = '$sync';
const DIRECTIVE_PREFIX = '_';

export function transformJSXChildNode(node: JSXText | JSXExpressionContainer | JSXSpreadChild | JSXElement | JSXFragment) {
  if (node.type === 'JSXText') {
    return createTextNode(node.value);
  }

  if (node.type === 'JSXElement') {
    return transformJSXElement2Nasl(node);
  }

  if (node.type === 'JSXExpressionContainer' && ['NumericLiteral', 'StringLiteral', 'MemberExpression'].indexOf(node.expression.type) !== -1) {
    if (node.expression.type === 'MemberExpression') {
      return {
        concept: 'ViewElement',
        tag: 'Text',
        name: '',
        bindAttrs: [{
          concept: 'BindAttribute',
          type: 'dynamic',
          name: 'children',
          expression: transformExpression2Nasl(node.expression),
        }],
        bindEvents: [],
        bindDirectives: [],
        bindRoles: [],
        bindStyles: [],
        children: [],
      } as NaslViewElement;
    }
    return createTextNode(getNodeCode(node.expression));
  }

  throw new Error(`JSX 解析异常，子节点仅允许是，JSXText 或 JSXElement, code: ${getNodeCode(node)}`);
}

export function parseJSXElement2Slot(ele: JSXElement | JSXFragment | Array<JSXElement | JSXFragment>, attrName: string, argName: string) {
  const templateAST: NaslViewElement = {
    concept: 'ViewElement',
    tag: 'template',
    name: '',
    bindAttrs: [],
    bindEvents: [],
    bindDirectives: [],
    bindRoles: [],
    bindStyles: [],
    children: [],
    slotTarget: getSlotName(attrName),
  };

  const eles = Array.isArray(ele) ? ele : [ele];

  eles.forEach((node) => {
    if (node.type === 'JSXElement') {
      templateAST.children.push(transformJSXElement2Nasl(node));
      return;
    }

    node.children.forEach((n) => {
      const naslEle = transformJSXChildNode(n);

      if (naslEle) {
        templateAST.children.push(naslEle);
      }
    });
  });

  if (argName) {
    templateAST.slotScope = argName;
  }
  return templateAST;
}

export function parseJSXExpression(ast: JSXElement | JSXFragment | JSXExpressionContainer, attrName: string, element: NaslViewElement) {
  if (ast.type === 'JSXElement') {
    element.children.push(parseJSXElement2Slot(ast, attrName, ''));
    return;
  }
  if (ast.type === 'JSXFragment') {
    element.children.push(parseJSXElement2Slot(ast, attrName, ''));
    return;
  }

  if (ast.expression.type === 'JSXEmptyExpression') {
    throw new Error('解析JSX Expression 异常， 不支持空的Expression');
  }

  if (ast.expression.type === 'JSXElement') {
    element.children.push(parseJSXElement2Slot(ast.expression, attrName, ''));
    return;
  }

  if (ast.expression.type === 'JSXFragment') {
    element.children.push(parseJSXElement2Slot(ast.expression, attrName, ''));
    return;
  }

  if (ast.expression.type === 'ArrayExpression' && isJSXEleArray(ast.expression)) {
    element.children.push(parseJSXElement2Slot(ast.expression.elements as any[], attrName, ''));
    return;
  }

  if (
    ast.expression.type === 'ArrowFunctionExpression' && (
      ast.expression.body.type === 'JSXElement'
      || ast.expression.body.type === 'JSXFragment'
    )
  ) {
    let argName = '';

    if (ast.expression.params && ast.expression.params[0] && ast.expression.params[0].type === 'Identifier') {
      argName = ast.expression.params[0].name;
    }

    element.children.push(parseJSXElement2Slot(ast.expression.body, attrName, argName));
    return;
  }

  if (ast.expression.type === 'CallExpression' && getNodeCode(ast.expression.callee) === SYNC_KEY) {
    if (ast.expression.arguments.length !== 1) {
      throw new Error(`解析 JSX Expression 异常，$sync 仅允许传一个参数，${getNodeCode(ast)}`);
    }

    const arg = ast.expression.arguments[0];
    if (['JSXNamespacedName', 'SpreadElement', 'ArgumentPlaceholder'].indexOf(arg.type) !== -1) {
      throw new Error(`解析 JSX Expression 异常，不支持该表达式，${getNodeCode(ast)}`);
    }

    element.bindAttrs.push({
      concept: 'BindAttribute',
      name: attrName,
      type: 'dynamic',
      sync: true,
      expression: transformExpression2Nasl(arg as Expression),
    });
    return;
  }

  if (EVENT_REGEX.test(attrName)) {
    const eventName = kebabCase(attrName.substring(2));
    const bindEvent: any = {
      concept: 'BindEvent',
      name: eventName,
      logics: [],
    };

    if (ast.expression.type === 'FunctionExpression') {
      const logicNode = transformFunc2Nasl(ast.expression);
      logicNode.params = [];
      bindEvent.logics.push(logicNode);
    } else if (ast.expression.type === 'ArrayExpression' && ast.expression.elements.findIndex((eleNode) => !eleNode || eleNode.type !== 'FunctionExpression') === -1) {
      bindEvent.logics.push(...ast.expression.elements.map((eleNode) => {
        const logicNode = transformFunc2Nasl(eleNode as any);
        logicNode.params = [];
        return logicNode;
      }));
    } else {
      throw new Error(`JSX 解析失败，事件绑定仅支持函数或函数数组, ${getNodeCode(ast)}`);
    }

    element.bindEvents.push(bindEvent);
    return;
  }

  if (['NumericLiteral', 'BooleanLiteral', 'ArrayExpression', 'ObjectExpression'].indexOf(ast.expression.type) !== -1) {
    element.bindAttrs.push({
      concept: 'BindAttribute',
      name: attrName,
      type: 'static',
      value: getNodeCode(ast.expression),
    });
    return;
  }

  element.bindAttrs.push({
    concept: 'BindAttribute',
    name: attrName,
    type: 'dynamic',
    expression: transformExpression2Nasl(ast.expression),
  });
}

export function parseJSXAttr(attr: JSXAttribute | JSXSpreadAttribute, element: NaslViewElement) {
  if (attr.type === 'JSXSpreadAttribute') {
    throw new Error(`解析 JSXElement 异常, 不支持 ...rest 属性, ${getNodeCode(attr)}`);
  }

  const attrName = getJSXName(attr.name);

  if (attrName === 'ref') {
    if (!attr.value || attr.value.type !== 'StringLiteral') {
      throw new Error(`解析 JSXElement 异常, ref 仅允许设置静态字符串， 例如 ref="button", ${getNodeCode(attr)}`);
    }
    element.name = attr.value.value;
    return;
  }

  if (attrName === 'style') {
    const value = parseJSXStyle(attr.value);
    if (value) {
      element.staticStyle = value;
    }
    return;
  }

  if ((attrName === 'className' || attrName === 'class') && attr.value) {
    if (attr.value.type === 'StringLiteral' && attr.value.value) {
      element.staticClass = attr.value.value;
    }
    return;
  }

  if (attrName === 'rules') {
    if (!attr.value || attr.value.type !== 'JSXExpressionContainer' || attr.value.expression.type !== 'ArrayExpression') {
      throw new Error(`解析 JSXElement 异常, rules 仅允许设置内置验证规则， 例如  rules=[nasl.validation.required()], ${getNodeCode(attr)}`);
    }

    element.bindAttrs.push({
      concept: 'BindAttribute',
      name: attrName,
      rules: attr.value.expression.elements.map((exp) => {
        if (!exp || exp.type !== 'CallExpression') {
          throw new Error(`解析 JSXElement 异常, rules 仅允许设置内置验证规则， 例如  rules=[nasl.validation.required()], ${getNodeCode(attr)}`);
        }
        const callLogic = transformExpression2Nasl(exp);

        return {
          concept: 'ValidationRule',
          calleeNamespace: callLogic.calleeNamespace,
          calleeName: callLogic.calleeName,
          arguments: callLogic.arguments,
        };
      }),
    });
    return;
  }

  if (!attr.value) {
    element.bindAttrs.push({
      concept: 'BindAttribute',
      name: attrName,
      type: 'static',
      value: 'true',
    });
    return;
  }

  if (attr.value.type === 'JSXExpressionContainer' || attr.value.type === 'JSXElement' || attr.value.type === 'JSXFragment') {
    parseJSXExpression(attr.value, attrName, element);
    return;
  }

  element.bindAttrs.push({
    concept: 'BindAttribute',
    name: attrName,
    type: 'string',
    value: attr.value ? attr.value.value : '',
  });
}

export function transformJSXElement2Nasl(element: JSXElement) {
  const node = element.openingElement;

  const elementAST: NaslViewElement = {
    concept: 'ViewElement',
    tag: '',
    name: '',
    bindAttrs: [],
    bindEvents: [],
    bindDirectives: [],
    bindRoles: [],
    bindStyles: [],
    children: [],
  };

  if (node.name.type !== 'JSXIdentifier') {
    throw new Error(`解析 JSXElement 异常, TagName 只运行命名标识, ${getNodeCode(node)}`);
  }

  elementAST.tag = node.name.name;

  node.attributes.forEach((attr) => parseJSXAttr(attr, elementAST));

  elementAST.bindAttrs = elementAST.bindAttrs.filter((attr) => {
    if (attr.name.startsWith(DIRECTIVE_PREFIX)) {
      elementAST.bindDirectives.push({
        concept: 'BindDirective',
        name: attr.name.substring(DIRECTIVE_PREFIX.length),
        type: attr.type,
        expression: attr.expression,
        value: attr.value,
        playground: [],
      });
      return false;
    }

    return true;
  });

  const childNodes: NaslViewElement[] = [];
  element.children.forEach((childNode) => {
    const result = transformJSXChildNode(childNode);
    if (result) {
      childNodes.push(result);
    }
  });

  if (elementAST.tag === 'Text' && childNodes.length > 0) {
    throw new Error('JSX解析异常， Text 组件不允许有子节点，请写children属性');
  }

  elementAST.children.push(...childNodes);

  return elementAST;
}

export default transformJSXElement2Nasl;

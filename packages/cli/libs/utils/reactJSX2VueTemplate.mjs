/* eslint-disable no-use-before-define */
import babelGenerator from '@babel/generator';
import * as logger from './logger.mjs';

const generator = babelGenerator.default;

const getNodeCode = (node) => {
  try {
    const { code: text = '' } = generator(node);
    return text.replace(/\n/g, ' ');
  } catch (e) {
    logger.warn(`生成code 错误，${JSON.stringify(node)}`);
  }
  return '';
};

const getNameByNode = (node) => {
  if (!node || !node.name || node.name.type !== 'JSXIdentifier') {
    return '';
  }

  return node.name.name;
};
const parseChildNode = (childNode) => {
  if (childNode.type === 'JSXElement') {
    return jsxAST2TemplateAst(childNode);
  }

  if (childNode.type === 'JSXText') {
    return {
      tag: 'JSXText',
      value: childNode.value,
    };
  }

  if (childNode.type === 'JSXExpressionContainer' && ['NumericLiteral', 'StringLiteral', 'MemberExpression'].indexOf(childNode.expression.type) !== -1) {
    const value = getNodeCode(childNode.expression);
    return {
      tag: 'JSXText',
      value: childNode.expression.type === 'MemberExpression' ? `{{${value}}}` : value,
    };
  }

  logger.warn(`Parse ChildNode JSX 发现不支持的 node,  code: ${generator(childNode).code}`);
  return null;
};

const parseJSXFragment = (node) => {
  if (!node.children || node.children.length === 0) {
    return [];
  }
  return node.children.map(parseChildNode).filter((v) => !!v);
};

const parseJSXExpression = (expressionNode) => {
  switch (expressionNode.type) {
    case 'JSXElement':
      return {
        type: 'slot',
        value: [jsxAST2TemplateAst(expressionNode)],
      };
    case 'ArrowFunctionExpression':
      // eslint-disable-next-line no-case-declarations
      let argName = '';

      if (!expressionNode.body || ['JSXFragment', 'JSXElement'].indexOf(expressionNode.body.type) === -1) {
        logger.warn(`Parse JSX Expression 发现不能处理的 ArrowFunctionExpression return node type: ${expressionNode.body.type}`);
        return null;
      }

      if (expressionNode.params && expressionNode.params[0]) {
        argName = expressionNode.params[0].name || '';
      }

      return {
        type: 'slot',
        argName,
        value: expressionNode.body.type === 'JSXFragment' ? parseJSXFragment(expressionNode.body) : [jsxAST2TemplateAst(expressionNode.body)],
      };
    case 'JSXFragment':
      return {
        type: 'slot',
        value: parseJSXFragment(expressionNode),
      };
    case 'NumericLiteral':
      return {
        type: 'number',
        value: getNodeCode(expressionNode),
      };
    case 'BooleanLiteral':
      return {
        type: 'boolean',
        value: getNodeCode(expressionNode),
      };
    case 'ObjectExpression':
      return {
        type: 'object',
        value: getNodeCode(expressionNode),
      };
    case 'ArrayExpression':
      return {
        type: 'object',
        value: getNodeCode(expressionNode),
      };
    case 'MemberExpression':
      return {
        type: 'member',
        value: getNodeCode(expressionNode),
      };
    default:
      logger.warn(`Parse JSX Expression 发现不能处理的 node type: ${expressionNode.type}`);
      return null;
  }
};

function jsxAST2TemplateAst(astNode) {
  if (!astNode || astNode.type !== 'JSXElement') {
    return null;
  }

  const node = astNode.openingElement;

  const elementAST = {
    tag: getNameByNode(node),
    attrs: [],
    children: [],
  };

  node.attributes.forEach((attrNode) => {
    if (attrNode.type !== 'JSXAttribute') {
      return;
    }

    const attrName = getNameByNode(attrNode);
    let attrType = 'string';
    let value;
    let argName;

    if (!attrNode.value) {
      attrType = 'boolean';
      value = true;
    } else if (attrNode.value.type === 'JSXExpressionContainer') {
      const result = parseJSXExpression(attrNode.value.expression);
      if (!result) {
        return;
      }

      attrType = result.type;
      value = result.value;
      if (result.argName) {
        argName = result.argName;
      }
    } else {
      attrType = 'string';
      value = attrNode.value ? attrNode.value.value : '';
    }

    elementAST.attrs.push({
      name: attrName,
      type: attrType,
      argName,
      value,
    });
  });

  astNode.children.forEach((childNode) => {
    const result = parseChildNode(childNode);
    if (result) {
      elementAST.children.push(result);
    }
  });

  return elementAST;
}

function generateTemplate(vueASTNode) {
  if (vueASTNode.tag === 'JSXText') {
    return vueASTNode.value.replace(/\n/, '');
  }

  const attrs = vueASTNode.attrs.filter((attr) => attr.type !== 'slot').map((attr) => {
    if (attr.type === 'string') {
      return `${attr.name}="${attr.value}"`;
    }

    if (!attr.value) {
      return attr.name;
    }

    return `:${attr.name}="${attr.value}"`;
  }).join(' ');

  const children = vueASTNode.children.map(generateTemplate).join(' ');

  const slots = vueASTNode.attrs.filter((attr) => attr.type === 'slot').map((attr) => {
    if (!attr.value || attr.value.length === 0) {
      return '';
    }
    const contents = attr.value.map(generateTemplate).join(' ');

    return `<template #${attr.name}${attr.argName ? `="${attr.argName}"` : ''}>${contents}</template>`;
  }).join(' ');

  return `<${vueASTNode.tag}${attrs ? ` ${attrs}` : ''}>${[children, slots].join(' ')}</${vueASTNode.tag}>`;
}

export default (ast) => {
  const vueAST = jsxAST2TemplateAst(ast);

  if (!vueAST) {
    logger.warn('生成 Vue AST 为 null');
    return '';
  }

  return `<template>${generateTemplate(vueAST)}</template>`;
};

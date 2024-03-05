/* eslint-disable no-case-declarations */
/* eslint-disable no-use-before-define */
import babelGenerator from '@babel/generator';
import reactStyleToCSS from 'react-style-object-to-css';
import { getJSXNameByNode, getNodeCode } from './babelAstUtils.mjs';
import * as logger from './logger.mjs';

const generator = babelGenerator.default;

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
  };
};

function transAstNodeToNaslNode(astNode, namespace = '') {
  let node = null;
  if (astNode.type === 'MemberExpression') {
    const object = transAstNodeToNaslNode(astNode.object);
    // object如果返回字符串，则将它当成namespace处理
    if (Object.prototype.toString.call(object) === '[object String]') {
      node = transAstNodeToNaslNode(astNode.property, object);
    } else {
      const property = transAstNodeToNaslNode(astNode.property);
      node = {
        concept: 'MemberExpression',
        name: '',
        kind: 'Expression',
        object,
        property,
      };
    }
  } else if (astNode.type === 'Identifier') {
    node = {
      concept: 'Identifier',
      namespace: namespace || '',
      name: astNode.name,
      kind: 'Expression',
    };
  } else if (astNode.type === 'ArrayExpression' || astNode.type === 'ObjectExpression') {
    node = {
      concept: 'Unparsed',
      label: '原子项',
      code: astNode.value,
    };
  } else if (astNode.type === 'TemplateLiteral') {
    // 模板字符串翻译成字符串插值
    const { expressions, quasis } = astNode;
    node = {
      concept: 'StringInterpolation',
      kind: 'Expression',
      name: '',
      expressions: [...(quasis || []), ...(expressions || [])]
        .sort((node1, node2) => {
          return node1.start - node2.start;
        })
        .map((n) => {
          return transAstNodeToNaslNode(n);
        }),
    };
  } else if (astNode.type === 'TemplateElement') {
    node = {
      concept: 'StringLiteral',
      kind: 'Expression',
      name: '',
      value: astNode.value?.raw,
    };
  } else if (astNode.type === 'StringLiteral') {
    node = {
      concept: 'StringLiteral',
      kind: 'Expression',
      name: '',
      value: astNode.value,
    };
  } else if (astNode.type === 'UnaryExpression') {
    const { argument } = astNode;
    if (argument.type === 'NumericLiteral') {
      node = {
        concept: 'NumericLiteral',
        value: astNode.operator + argument.value,
      };
    } else {
      node = {
        concept: 'UnaryExpression',
        kind: 'Expression',
        name: '',
        operator: astNode.operator,
        argument: transAstNodeToNaslNode(astNode.argument),
      };
    }
  } else if (astNode.type === 'NumericLiteral') {
    const numberString = typeof astNode.value === 'number' ? astNode.value.toString() : astNode.value;
    node = {
      concept: 'NumericLiteral',
      value: numberString,
    };
  } else if (astNode.type === 'LogicalExpression' || astNode.type === 'BinaryExpression') {
    node = {
      concept: 'BinaryExpression',
      operator: astNode.operator,
      left: transAstNodeToNaslNode(astNode.left),
      right: transAstNodeToNaslNode(astNode.right),
    };
  } else {
    logger.warn(`Parse Trans JSX to NASL 发现不支持的 node,  code: ${generator(astNode).code}`);
  }
  return node;
}

const parseChildNode = (childNode) => {
  if (childNode.type === 'JSXElement') {
    return jsxAST2NASL(childNode);
  }

  if (childNode.type === 'JSXText') {
    return createTextNode(childNode.value);
  }

  if (childNode.type === 'JSXExpressionContainer' && ['NumericLiteral', 'StringLiteral', 'MemberExpression'].indexOf(childNode.expression.type) !== -1) {
    if (childNode.expression.type === 'MemberExpression') {
      return {
        concept: 'ViewElement',
        tag: 'Text',
        name: '',
        bindAttrs: [{
          concept: 'BindAttribute',
          type: 'dynamic',
          name: 'children',
          expression: transAstNodeToNaslNode(childNode.expression),
        }],
        bindEvents: [],
        bindDirectives: [],
        bindRoles: [],
        bindStyles: [],
        children: [],
      };
    }
    return createTextNode(getNodeCode(childNode.expression));
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
        value: [jsxAST2NASL(expressionNode)],
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
        value: expressionNode.body.type === 'JSXFragment' ? parseJSXFragment(expressionNode.body) : [jsxAST2NASL(expressionNode.body)],
      };
    case 'JSXFragment':
      return {
        type: 'slot',
        value: [parseJSXFragment(expressionNode)],
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
    // case 'ObjectExpression':
    //   return {
    //     type: 'object',
    //     value: getNodeCode(expressionNode),
    //   };
    // case 'ArrayExpression':
    //   return {
    //     type: 'object',
    //     value: getNodeCode(expressionNode),
    //   };
    // case 'MemberExpression':
    //   return {
    //     type: 'member',
    //     value: getNodeCode(expressionNode),
    //   };
    default:
      return {
        type: 'nasl',
        value: transAstNodeToNaslNode(expressionNode),
      };
  }
};

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

const jsxAST2NASL = (astNode) => {
  if (!astNode || astNode.type !== 'JSXElement') {
    return null;
  }

  const node = astNode.openingElement;

  const elementAST = {
    concept: 'ViewElement',
    tag: getJSXNameByNode(node),
    name: '',
    bindAttrs: [],
    bindEvents: [],
    bindDirectives: [],
    bindRoles: [],
    bindStyles: [],
    children: [],
  };

  node.attributes.forEach((attrNode) => {
    if (attrNode.type !== 'JSXAttribute') {
      return;
    }

    const attrName = getJSXNameByNode(attrNode);
    if (attrName === 'style') {
      const value = parseJSXStyle(attrNode.value);
      if (value) {
        elementAST.staticStyle = value;
      }
    } else if (attrName === 'className' || attrName === 'class') {
      if (attrNode.value.type === 'StringLiteral' && attrNode.value.value) {
        elementAST.staticClass = attrNode.value.value;
      }
    } else if (!attrNode.value) {
      elementAST.bindAttrs.push({
        concept: 'BindAttribute',
        name: attrName,
        type: 'static',
        value: 'true',
      });
    } else if (attrNode.value.type === 'JSXExpressionContainer') {
      const result = parseJSXExpression(attrNode.value.expression);
      if (!result || result.value === null) {
        return;
      }

      switch (result.type) {
        case 'slot':
          elementAST.children.push(result.value.map((elAst) => {
            const childElementAST = {
              ...elAst,
              slotTarget: attrName,
            };

            if (result.argName) {
              childElementAST.slotScope = result.argName;
            }

            return childElementAST;
          }));
          break;
        case 'number':
        case 'boolean':
          elementAST.bindAttrs.push({
            concept: 'BindAttribute',
            name: attrName,
            type: 'static',
            value: result.value,
          });
          break;
        case 'nasl':
          elementAST.bindAttrs.push({
            concept: 'BindAttribute',
            name: attrName,
            type: 'dynamic',
            expression: result.value,
          });
          break;
        default:
          break;
      }
    } else {
      elementAST.bindAttrs.push({
        concept: 'BindAttribute',
        name: attrName,
        type: 'string',
        value: attrNode.value ? attrNode.value.value : '',
      });
    }
  });

  astNode.children.forEach((childNode) => {
    const result = parseChildNode(childNode);
    if (result) {
      elementAST.children.push(result);
    }
  });

  return elementAST;
};

export default (ast) => {
  return JSON.stringify(jsxAST2NASL(ast));
};

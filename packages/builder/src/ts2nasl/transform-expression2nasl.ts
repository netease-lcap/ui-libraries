/* eslint-disable no-use-before-define */
import { CallExpression, Expression, ObjectExpression } from '@babel/types';
import { getNodeCode } from './utils';

const getNamespace = (ast) => {
  if (ast.object && ast.object.name === 'nasl' && ast.property && ast.property.name) {
    return `nasl.${ast.property.name}`;
  }

  return '';
};

function transformObjectExpression2Nasl(ast: ObjectExpression) {
  const newMap: any = {
    concept: 'NewMap',
    keys: [],
    values: [],
  };

  ast.properties.forEach((property) => {
    if (property.type === 'ObjectMethod' || property.type === 'SpreadElement' || property.key.type === 'PrivateName') {
      throw new Error(`解析Expression失败，nasl未支持该表达式, ${getNodeCode(ast)}`);
    }

    newMap.push(transformExpression2Nasl(property.key));
    newMap.push(transformExpression2Nasl(property.value as any));
  });
  return newMap;
}

function getCallName(code: string) {
  let namespace = '';
  let name = '';

  const arr = code.split('.');

  if (code.startsWith('$refs.')) {
    arr[0] = 'elements';
    arr.splice(arr.length - 1, 0, 'logics');
  }

  namespace = arr.slice(0, arr.length - 1).join('.');
  name = arr[arr.length - 1];

  return { namespace, name };
}

function transformCallExpress2Nasl(ast: CallExpression) {
  if (ast.callee.type === 'Super' || ast.callee.type === 'V8IntrinsicIdentifier') {
    throw new Error(`解析CallExpression 失败，${getNodeCode(ast)}`);
  }

  const code = getNodeCode(ast.callee);
  const { namespace, name } = getCallName(code);

  const args = ast.arguments.map((arg) => {
    if (arg.type === 'JSXNamespacedName' || arg.type === 'SpreadElement' || arg.type === 'ArgumentPlaceholder') {
      throw new Error(`解析CallExpression 失败，不支持参数类型，${getNodeCode(ast)}`);
    }

    return {
      concept: 'Argument',
      keyword: '',
      expression: transformExpression2Nasl(arg),
    };
  });
  if (namespace === 'nasl.util') {
    return {
      concept: 'CallFunction',
      calleeNamespace: namespace,
      calleeName: name,
      arguments: args,
    };
  }

  return {
    concept: 'CallLogic',
    arguments: args,
    calleeNamespace: namespace,
    calleeName: name,
  };
}

export default function transformExpression2Nasl(ast: Expression, namespace = '') {
  switch (ast.type) {
    case 'MemberExpression':
      // eslint-disable-next-line no-case-declarations
      const ns = getNamespace(ast.object);
      if (ast.property.type === 'PrivateName') {
        throw new Error(`Expression 解析失败，不支持 PrivateName, ${getNodeCode(ast)}`);
      }
      // object如果返回字符串，则将它当成namespace处理
      if (ns) {
        return transformExpression2Nasl(ast.property, ns);
      }
      return {
        concept: 'MemberExpression',
        name: '',
        kind: 'Expression',
        object: transformExpression2Nasl(ast.object),
        property: transformExpression2Nasl(ast.property),
      };
    case 'Identifier':
      return {
        concept: 'Identifier',
        namespace,
        name: ast.name,
        kind: 'Expression',
      };
    case 'TemplateLiteral':
      return {
        concept: 'StringInterpolation',
        kind: 'Expression',
        name: '',
        expressions: [...(ast.quasis || []), ...(ast.expressions || [])]
          .sort((node1: any, node2: any) => {
            return node1.start - node2.start;
          })
          .map((n: any) => {
            return transformExpression2Nasl(n);
          }),
      };
    case 'StringLiteral':
      return {
        concept: 'StringLiteral',
        kind: 'Expression',
        name: '',
        value: ast.value,
      };
    case 'NumericLiteral':
      return {
        concept: 'NumericLiteral',
        value: String(ast.value),
        typeAnnotation: {
          concept: 'TypeAnnotation',
          typeKind: 'primitive',
          typeName: String(ast.value).includes('.') ? 'Decimal' : 'Long',
          typeNamespace: 'nasl.core',
          inferred: false,
          ruleMap: new Map(),
        },
      };
    case 'NullLiteral':
      return {
        concept: 'NullLiteral',
      };
    case 'BooleanLiteral':
      return {
        concept: 'BooleanLiteral',
        value: String(ast.value),
      };
    case 'UnaryExpression':
      if (ast.argument.type === 'NumericLiteral') {
        return {
          concept: 'NumericLiteral',
          value: ast.operator + ast.argument.value,
        };
      }

      return {
        concept: 'UnaryExpression',
        kind: 'Expression',
        name: '',
        operator: ast.operator,
        argument: transformExpression2Nasl(ast.argument),
      };
    case 'LogicalExpression':
    case 'BinaryExpression':
      if (ast.left.type === 'PrivateName') {
        throw new Error(`Expression 解析失败，不支持 PrivateName, ${getNodeCode(ast)}`);
      }

      return {
        concept: 'BinaryExpression',
        operator: ast.operator,
        left: transformExpression2Nasl(ast.left),
        right: transformExpression2Nasl(ast.right),
      };
    case 'ArrayExpression':
      return {
        concept: 'NewList',
        items: ast.elements.map((e) => {
          if (!e || e.type === 'SpreadElement') {
            throw new Error('解析Expression失败，数组中不允许出现 null, 或者 ...');
          }

          return transformExpression2Nasl(e);
        }),
      };
    case 'ObjectExpression':
      return transformObjectExpression2Nasl(ast);
    case 'AssignmentExpression':
      return {
        concept: 'Assignment',
        left: transformExpression2Nasl(ast.left as any),
        right: transformExpression2Nasl(ast.right),
      };
    case 'CallExpression':
      return transformCallExpress2Nasl(ast);
    default:
      throw new Error(`解析Expression失败，nasl未支持该表达式, ${getNodeCode(ast)}`);
  }
}

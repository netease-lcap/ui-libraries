import {
  FunctionExpression,
  FunctionDeclaration,
  Identifier,
  Pattern,
  RestElement,
  Statement,
  Noop,
  TypeAnnotation,
  TSTypeAnnotation,
  VariableDeclarator,
} from '@babel/types';
import { getNodeCode, normalizeArray } from './utils';
import transformExpression2Nasl from './transform-expression2nasl';
import transformTypeAnnotation from './transform-tstype2nasl';

const getTypeAnnotation = (typeAnnotation: TypeAnnotation | TSTypeAnnotation | Noop | null | undefined) => {
  if (typeAnnotation && typeAnnotation.type === 'TSTypeAnnotation') {
    return transformTypeAnnotation(typeAnnotation.typeAnnotation);
  }

  return null;
};

const getRestElementTypeAnnotation = (param: RestElement, typeNames: string[] = []) => {
  if (!param.typeAnnotation || param.typeAnnotation.type !== 'TSTypeAnnotation') {
    return null;
  }

  if (param.typeAnnotation.typeAnnotation.type === 'TSTypeReference'
    && (
      (
        param.typeAnnotation.typeAnnotation.typeName.type === 'TSQualifiedName'
        && param.typeAnnotation.typeAnnotation.typeName.right.name === 'List'
      ) || (
        param.typeAnnotation.typeAnnotation.typeName.type === 'Identifier'
        && param.typeAnnotation.typeAnnotation.typeName.name === 'Array'
      )
    )
    && param.typeAnnotation.typeAnnotation.typeParameters
    && param.typeAnnotation.typeAnnotation.typeParameters.params
    && param.typeAnnotation.typeAnnotation.typeParameters.params.length > 0
  ) {
    return transformTypeAnnotation(param.typeAnnotation.typeAnnotation.typeParameters.params[0], typeNames);
  }

  if (param.typeAnnotation.typeAnnotation.type === 'TSArrayType') {
    return transformTypeAnnotation(param.typeAnnotation.typeAnnotation.elementType, typeNames);
  }

  return transformTypeAnnotation(param.typeAnnotation.typeAnnotation, typeNames);
};

export function transformParam2Nasl(paramAST: Identifier | Pattern | RestElement) {
  switch (paramAST.type) {
    case 'Identifier':
      return {
        concept: 'Param',
        name: paramAST.name,
        description: '',
        typeAnnotation: getTypeAnnotation(paramAST.typeAnnotation),
      };
    case 'RestElement':
      if (paramAST.argument.type !== 'Identifier') {
        throw new Error(`解析函数参数失败，不支持该参数类型 ${getNodeCode(paramAST)}`);
      }

      return {
        concept: 'Param',
        name: paramAST.argument.name,
        description: '',
        spread: true,
        typeAnnotation: getRestElementTypeAnnotation(paramAST),
      };
    case 'AssignmentPattern':
      if (paramAST.left.type !== 'Identifier') {
        throw new Error(`解析函数参数失败，不支持该参数类型 ${getNodeCode(paramAST)}`);
      }

      return {
        concept: 'Param',
        name: paramAST.left.name,
        description: '',
        typeAnnotation: getTypeAnnotation(paramAST.left.typeAnnotation),
        defaultValue: {
          concept: 'DefaultValue',
          expression: transformExpression2Nasl(paramAST.right),
          playground: [],
        },
      };
    default:
      throw new Error(`解析函数参数失败，不支持该参数类型 ${getNodeCode(paramAST)}`);
  }
}

export function transformStatement(statement: Statement) {
  if (statement.type === 'BlockStatement') {
    return statement.body.map(transformStatement);
  }

  if (statement.type === 'IfStatement') {
    return {
      concept: 'IfStatement',
      test: transformExpression2Nasl(statement.test),
      consequent: normalizeArray(transformStatement(statement.consequent)),
      alternate: statement.alternate ? normalizeArray(transformStatement(statement.alternate)) : [],
    };
  }

  if (statement.type === 'SwitchStatement' && statement.discriminant) {
    const testLeft = transformExpression2Nasl(statement.discriminant);
    return {
      concept: 'SwitchStatement',
      cases: statement.cases.map((switchCaseAST) => ({
        concept: 'SwitchCase',
        test: {
          concept: 'BinaryExpression',
          left: testLeft,
          right: switchCaseAST.test ? transformExpression2Nasl(switchCaseAST.test) : null,
          operator: '==',
        },
        consequent: switchCaseAST.consequent.map((st) => transformStatement(st)).flat(),
      })),
    };
  }

  if (statement.type === 'ForInStatement') {
    if (statement.left.type !== 'VariableDeclaration') {
      throw new Error('解析 for in 语句失败, 左侧仅允许定义变量，例如 var xxx in list');
    }

    return {
      concept: 'ForEachStatement',
      each: transformExpression2Nasl(statement.right),
      item: {
        concept: 'Param',
        name: statement.left.declarations[0].id && statement.left.declarations[0].id.type === 'Identifier' ? statement.left.declarations[0].id.name : 'item',
        description: '',
      },
      index: {
        concept: 'Param',
        name: statement.left.declarations[1] && statement.left.declarations[1].id && statement.left.declarations[1].id.type === 'Identifier' ? statement.left.declarations[1].id.name : 'index',
        description: '',
      },
      start: {
        concept: 'NumericLiteral',
        value: 0,
      },
      body: normalizeArray(transformStatement(statement.body)),
    };
  }

  if (statement.type === 'WhileStatement') {
    return {
      concept: 'WhileStatement',
      test: transformExpression2Nasl(statement.test),
      body: normalizeArray(transformStatement(statement.body)),
    };
  }

  if (statement.type === 'ExpressionStatement') {
    return transformExpression2Nasl(statement.expression);
  }

  if (statement.type === 'ReturnStatement') {
    return {
      concept: 'End',
    };
  }

  throw new Error(`解析语句失败, Nasl 不支持该语法, ${getNodeCode(statement)}`);
}

export function transformVariable(ast: VariableDeclarator) {
  if (ast.id.type !== 'Identifier') {
    throw new Error(`解析变量定义失败， ${getNodeCode(ast)}`);
  }

  const variable: any = {
    concept: 'Variable',
    name: ast.id.name,
    description: '',
  };

  if (ast.id.typeAnnotation && ast.id.typeAnnotation.type === 'TSTypeAnnotation') {
    variable.typeAnnotation = transformTypeAnnotation(ast.id.typeAnnotation.typeAnnotation);
  }

  if (ast.init) {
    variable.defaultValue = transformExpression2Nasl(ast.init);
  }

  return variable;
}

export function transformFunc2Nasl(funcAst: FunctionExpression | FunctionDeclaration) {
  if (!funcAst.id) {
    throw new Error('解析函数失败，未定义函数名称');
  }

  const variables: any[] = [];
  const statements: Statement[] = funcAst.body.body.filter((s) => {
    if (s.type !== 'VariableDeclaration') {
      return true;
    }

    s.declarations.forEach((decla) => {
      if (decla.id && decla.id.type === 'Identifier') {
        variables.push(transformVariable(decla));
      }
    });

    return false;
  });

  const Logic = {
    concept: 'Logic',
    name: funcAst.id.name,
    variables,
    params: funcAst.params.map(transformParam2Nasl),
    returns: [],
    playground: [],
    body: [
      {
        concept: 'Start',
      },
      ...statements.map(transformStatement),
    ],
  };

  if (Logic.body[Logic.body.length - 1].concept !== 'End') {
    Logic.body.push({
      concept: 'End',
    });
  }

  return Logic;
}

export default transformFunc2Nasl;

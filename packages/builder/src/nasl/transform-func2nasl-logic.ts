/* eslint-disable no-case-declarations, no-use-before-define, no-nested-ternary */
import * as babelTypes from '@babel/types';
import type {
  DefaultValue,
  TypeAnnotation,
} from '@nasl/types/nasl.ui.ast';
import logger from '../utils/logger';
import { getNodeCode } from '../utils/babel-utils';
import { transformExpression2nasl, transformTsType2Nasl as transformTypeAnnotation } from '../ts2nasl';

export default function transformFunc2NaslLogic(node: babelTypes.ExportNamedDeclaration) {
  if (
    node.type !== 'ExportNamedDeclaration'
    || !node.declaration || node.declaration.type !== 'FunctionDeclaration'
    || !node.leadingComments
    || node.leadingComments.findIndex((c) => c.value.includes('@NaslLogic')) === -1
  ) {
    return null;
  }

  const logicComment = {
    title: '',
    description: '',
    type: '',
    params: {},
    typeParams: {},
    returns: '',
  };

  node.leadingComments.forEach((block) => {
    if (!block.value.includes('@NaslLogic')) {
      return;
    }
    block.value.split('\n').forEach((text) => {
      switch (true) {
        case text.includes('@title '):
          logicComment.title = (text.split('@title ')[1] || '').trim();
          break;
        case text.includes('@description '):
          logicComment.description = (text.split('@description ')[1] || '').trim();
          break;
        case text.includes('@desc '):
          logicComment.description = (text.split('@desc ')[1] || '').trim();
          break;
        case text.includes('@type '):
          const typeKind = (text.split('@type ')[1] || '').trim();
          if (['both', 'pc', 'h5'].indexOf(typeKind) === -1) {
            logicComment.type = 'pc';
          } else {
            logicComment.type = typeKind;
          }
          break;
        case text.includes('@typeParam '):
          const tempTypeText = text.substring(text.indexOf('@typeParam ') + '@typeParam '.length);
          const [typeName, ...typeValue] = tempTypeText.split(' ');
          if (typeValue.length === 0) {
            break;
          }
          logicComment.typeParams[typeName] = typeValue.join('');
          break;
        case text.includes('@param '):
          const tempText = text.substring(text.indexOf('@param ') + '@param '.length);
          const [name, ...value] = tempText.split(' ');
          if (value.length === 0) {
            break;
          }
          logicComment.params[name] = value.join('');
          break;
        case text.includes('@returns '):
          logicComment.returns = (text.split('@returns ')[1] || '').trim();
          break;
        case text.includes('@return '):
          logicComment.returns = (text.split('@return ')[1] || '').trim();
          break;
        default: break;
      }
    });
  });

  const logic: any = {
    concept: 'Logic',
    name: node.declaration.id ? node.declaration.id.name : '',
    title: logicComment.title,
    description: logicComment.description,
    triggerType: '',
    cron: '',
    overridable: false,
    variables: [],
    body: [],
    typeParams: [],
    params: [],
    returns: [],
    playground: [],
  };

  if (
    node.declaration.typeParameters
    && node.declaration.typeParameters.type === 'TSTypeParameterDeclaration'
    && node.declaration.typeParameters.params && node.declaration.typeParameters.params.length > 0
  ) {
    logic.typeParams = node.declaration.typeParameters.params.map((t) => {
      if (t.constraint || t.default) {
        const errorMsg = `解析逻辑失败 ${logic.name} ${getNodeCode(t)}, 泛型不支持使用 extends 或 = 等表达式`;
        logger.error(errorMsg);
        throw new Error(errorMsg);
      }

      return {
        concept: 'TypeParam',
        name: t.name,
        displayName: logicComment.typeParams[t.name] || '',
      };
    });
  }

  try {
    const typeNames = logic.typeParams.map((t) => t.name);
    if (node.declaration.params && node.declaration.params.length > 0) {
      node.declaration.params.forEach((param) => {
        let name: string | undefined;
        let typeAnnotation: TypeAnnotation | undefined;
        let defaultValue: DefaultValue | undefined;
        let spread = false;
        if (param.type === 'Identifier' && param.typeAnnotation && param.typeAnnotation.type === 'TSTypeAnnotation') {
          typeAnnotation = transformTypeAnnotation(param.typeAnnotation.typeAnnotation, typeNames);
          name = param.name;
        } else if (param.type === 'RestElement' && param.argument.type === 'Identifier' && param.typeAnnotation && param.typeAnnotation.type === 'TSTypeAnnotation') {
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
            typeAnnotation = transformTypeAnnotation(param.typeAnnotation.typeAnnotation.typeParameters.params[0], typeNames);
          } else if (param.typeAnnotation.typeAnnotation.type === 'TSArrayType') {
            typeAnnotation = transformTypeAnnotation(param.typeAnnotation.typeAnnotation.elementType, typeNames);
          } else {
            typeAnnotation = transformTypeAnnotation(param.typeAnnotation.typeAnnotation, typeNames);
          }
          name = param.argument.name;
          spread = true;
        } else if (param.type === 'AssignmentPattern' && param.left.type === 'Identifier' && param.left.typeAnnotation && param.left.typeAnnotation.type === 'TSTypeAnnotation') {
          name = param.left.name;
          typeAnnotation = transformTypeAnnotation(param.left.typeAnnotation.typeAnnotation, typeNames);
          defaultValue = {
            concept: 'DefaultValue',
            expression: transformExpression2nasl(param.right),
            playground: [],
          };
        }

        if (name && typeAnnotation) {
          const p: any = {
            concept: 'Param',
            name,
            description: logicComment.params[name],
            typeAnnotation,
            spread,
          };

          if (defaultValue) {
            p.defaultValue = defaultValue;
          } else if (param.optional) {
            p.defaultValue = {
              concept: 'DefaultValue',
              expression: typeAnnotation.typeKind === 'function'
                ? {
                  concept: 'SubLogic',
                  name: '',
                  params: (typeAnnotation.typeArguments || []).map((arg, index) => ({
                    concept: 'Param',
                    name: `param${index + 1}`,
                    description: '',
                    typeAnnotation: arg,
                  })),
                  returns: (typeAnnotation.returnType || []).map((t, i) => ({
                    concept: 'Return',
                    name: `result${i > 0 ? `_${i}` : ''}`,
                    description: '',
                    typeAnnotation: t,
                  })),
                  variables: [],
                  playground: [],
                  body: [
                    {
                      concept: 'Start',
                    },
                    {
                      concept: 'End',
                    },
                  ],
                } : {
                  concept: 'NullLiteral',
                },
              playground: [],
            };
          }

          logic.params.push(p);
          return;
        }

        const errorMsg = `解析逻辑失败 ${name} ${getNodeCode(param)}, 参数不支持解析，请检查类型是否使用 @nasl/types`;
        logger.error(errorMsg);
        throw new Error(errorMsg);
      });
    }

    if (node.declaration.returnType && node.declaration.returnType.type === 'TSTypeAnnotation') {
      const hasSubLogic = logic.params.findIndex((p) => p.typeAnnotation && p.typeAnnotation.typeKind === 'function') !== -1;
      const { typeAnnotation: tsType } = node.declaration.returnType as babelTypes.TSTypeAnnotation;

      if (hasSubLogic && (tsType.type !== 'TSTypeReference' || tsType.typeName.type !== 'Identifier' || tsType.typeName.name !== 'Promise')) {
        const errorMsg = `解析逻辑失败 ${logic.name}, 该逻辑含有高阶函数（用函数作为参数），返回值类型强制需要为 Promise!`;
        logger.error(errorMsg);
        throw new Error(errorMsg);
      }

      const returnType = transformTypeAnnotation(tsType, typeNames);

      if (returnType) {
        logic.returns.push({
          concept: 'Return',
          name: 'result',
          description: logicComment.returns,
          typeAnnotation: returnType,
        });
      }
    }
  } catch (e: any) {
    logger.error(`解析逻辑失败 ${logic.name}: ${e.message}`);
    throw e;
  }

  return {
    ...logic,
    type: logicComment.type,
  };
}

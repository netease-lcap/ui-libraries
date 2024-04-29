/* eslint-disable no-case-declarations, no-use-before-define, no-nested-ternary */
import * as babelTypes from '@babel/types';
import type {
  DefaultValue,
  TypeAnnotation,
} from '@nasl/types/nasl.ui.ast';
import logger from '../utils/logger';
import { getNodeCode } from '../utils/babel-utils';
import transformTypeAnnotation from './transform-tstype2nasl';

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
          if (['both', 'pc', 'mobile'].indexOf(typeKind) === -1) {
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
    logic.typeParams = node.declaration.typeParameters.params.map((t) => ({
      concept: 'TypeParam',
      name: t.name,
      displayName: logicComment.typeParams[t.name] || '',
    }));
  }

  if (node.declaration.params && node.declaration.params.length > 0) {
    node.declaration.params.forEach((param) => {
      let name: string | undefined;
      let typeAnnotation: TypeAnnotation | undefined;
      let defaultValue: DefaultValue | undefined;
      let spread = false;
      if (param.type === 'Identifier' && param.typeAnnotation && param.typeAnnotation.type === 'TSTypeAnnotation') {
        typeAnnotation = transformTypeAnnotation(param.typeAnnotation.typeAnnotation);
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
          typeAnnotation = transformTypeAnnotation(param.typeAnnotation.typeAnnotation.typeParameters.params[0]);
        } else if (param.typeAnnotation.typeAnnotation.type === 'TSArrayType') {
          typeAnnotation = transformTypeAnnotation(param.typeAnnotation.typeAnnotation.elementType);
        } else {
          typeAnnotation = transformTypeAnnotation(param.typeAnnotation.typeAnnotation);
        }
        name = param.argument.name;
        spread = true;
      } else if (param.type === 'AssignmentPattern' && param.left.type === 'Identifier' && param.left.typeAnnotation && param.left.typeAnnotation.type === 'TSTypeAnnotation') {
        name = param.left.name;
        typeAnnotation = transformTypeAnnotation(param.left.typeAnnotation.typeAnnotation);
        switch (param.right.type) {
          case 'NullLiteral':
            defaultValue = {
              concept: 'DefaultValue',
              expression: {
                concept: 'NullLiteral',
              },
              playground: [],
            };
            break;
          case 'StringLiteral':
            defaultValue = {
              concept: 'DefaultValue',
              expression: {
                concept: 'StringLiteral',
                value: param.right.value,
                i18nKey: '',
              },
              playground: [],
            };
            break;
          case 'NumericLiteral':
            defaultValue = {
              concept: 'DefaultValue',
              expression: {
                concept: 'NumericLiteral',
                value: String(param.right.value),
                typeAnnotation: {
                  concept: 'TypeAnnotation',
                  typeKind: 'primitive',
                  typeName: String(param.right.value).includes('.') ? 'Decimal' : 'Integer',
                  typeNamespace: 'nasl.core',
                  inferred: false,
                  ruleMap: new Map(),
                },
              },
              playground: [],
            };
            break;
          case 'BooleanLiteral':
            defaultValue = {
              concept: 'DefaultValue',
              expression: {
                concept: 'BooleanLiteral',
                value: String(param.right.value),
              },
              playground: [],
            };
            break;
          default: break;
        }
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
        }

        logic.params.push(p);
        return;
      }

      logger.error(`解析逻辑失败 ${name} ${getNodeCode(param)}, 参数不支持解析，请检查类型是否使用 @nasl/types`);
      process.exit(1);
    });
  }

  if (node.declaration.returnType && node.declaration.returnType.type === 'TSTypeAnnotation') {
    const returnType = transformTypeAnnotation(node.declaration.returnType.typeAnnotation);

    if (returnType) {
      logic.returns.push({
        concept: 'Return',
        name: 'result',
        description: logicComment.returns,
        typeAnnotation: returnType,
      });
    }
  }

  return {
    ...logic,
    type: logicComment.type,
  };
}

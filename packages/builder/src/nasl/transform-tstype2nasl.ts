/* eslint-disable no-nested-ternary, no-use-before-define  */
import * as babelTypes from '@babel/types';
import type {
  StructureProperty,
  TypeAnnotation,
} from '@nasl/types/nasl.ui.ast';
import { getNodeCode } from '../utils/babel-utils';

const isPrimitive = (name: string) => ['String', 'Integer', 'Decimal', 'Boolean', 'Date', 'Time', 'DateTime', 'Binary', 'Any'].includes(name);
const getTypeKind = (typeParameters, primitive) => (typeParameters && typeParameters.params && typeParameters.params.length ? 'generic' : primitive ? 'primitive' : 'reference');

function exitNotSupportType(node: babelTypes.TSType) {
  throw new Error(`解析Ts 类型异常，未支持 TS 类型 ${getNodeCode(node)}, 请使用nasl/types`);
}

function transformTSTypeReference(node: babelTypes.TSTypeReference, typeNames): TypeAnnotation | undefined {
  const { typeName, typeParameters } = node;
  // 不支持 Promise
  if (typeName.type === 'Identifier' && typeName.name === 'Promise') {
    if (typeParameters && typeParameters.params && typeParameters.params.length > 0) {
      return transformTypeAnnotation(typeParameters.params[0], typeNames);
    }
  } else if (typeName.type === 'TSQualifiedName') {
    const { left, right } = typeName;
    if (right.name === 'Any') {
      exitNotSupportType(node);
    }
    const primitive = isPrimitive(right.name);
    const namespace = getNodeCode(left);
    const typeArguments: TypeAnnotation[] = [];

    if (typeParameters && typeParameters.params) {
      typeParameters.params.forEach((param) => {
        const annotation = transformTypeAnnotation(param, typeNames);
        if (annotation) {
          typeArguments.push({
            ...annotation,
            concept: 'TypeAnnotation',
            typeKind: 'typeParam',
            inferred: false,
            ruleMap: new Map(),
          });
        }
      });
    }

    return {
      typeKind: getTypeKind(typeParameters, primitive) as any,
      typeName: right.name,
      typeNamespace: namespace,
      concept: 'TypeAnnotation',
      inferred: false,
      ruleMap: new Map(),
      typeArguments,
    };
  } else if (typeName.type === 'Identifier') {
    const primitive = isPrimitive(typeName.name);

    if (['String', 'Number', 'Array', 'Object', 'Boolean', 'Symbol', 'Function', 'Date'].indexOf(typeName.name) !== -1) {
      exitNotSupportType(node);
    }

    if (typeNames.indexOf(typeName.name) !== -1) {
      return {
        concept: 'TypeAnnotation',
        typeKind: 'typeParam',
        typeName: typeName.name,
        typeNamespace: '',
        inferred: false,
        ruleMap: new Map(),
        typeArguments: [],
      };
    }

    const NaslTypes = ['Current', 'CurrentDynamic'];

    if (!NaslTypes.includes(typeName.name)) {
      exitNotSupportType(node);
    }

    const typeArguments: TypeAnnotation[] = [];

    if (typeParameters && typeParameters.params) {
      typeParameters.params.forEach((param) => {
        const annotation = transformTypeAnnotation(param, typeNames);
        if (annotation) {
          typeArguments.push({
            ...annotation,
            concept: 'TypeAnnotation',
            typeKind: 'typeParam',
            inferred: false,
            ruleMap: new Map(),
          });
        }
      });
    }

    return {
      typeKind: getTypeKind(typeParameters, primitive) as any,
      typeName: typeName.name,
      typeNamespace: NaslTypes.includes(typeName.name) ? 'nasl.ui' : '',
      concept: 'TypeAnnotation',
      inferred: false,
      ruleMap: new Map(),
      typeArguments,
    };
  }

  return undefined;
}

function transformTSUnionType(node: babelTypes.TSUnionType, typeNames): TypeAnnotation {
  const typeArguments = node.types.map((t) => transformTypeAnnotation(t, typeNames)).filter((v) => !!v) as TypeAnnotation[];

  return {
    typeKind: 'union',
    typeName: '',
    typeNamespace: '',
    concept: 'TypeAnnotation',
    inferred: false,
    ruleMap: new Map(),
    typeArguments,
  };
}

function transformTSFunctionType(node: babelTypes.TSFunctionType, typeNames): TypeAnnotation {
  const typeArguments: TypeAnnotation[] = [];
  const returnType: TypeAnnotation[] = [];

  if (node.parameters && node.parameters.length > 0) {
    node.parameters.forEach((parameter) => {
      if (parameter.type === 'Identifier' && parameter.typeAnnotation && parameter.typeAnnotation.type === 'TSTypeAnnotation') {
        if (parameter.typeAnnotation.typeAnnotation.type === 'TSFunctionType') {
          throw new Error('解析Ts 类型异常，未支持 TS 类型多层嵌套 function 类型');
        }

        const typeAnnotation = transformTypeAnnotation(parameter.typeAnnotation.typeAnnotation, typeNames);
        if (typeAnnotation) {
          typeArguments.push(typeAnnotation);
        }
      }
    });
  }

  if (node.typeAnnotation) {
    const typeAnnotation = transformTypeAnnotation(node.typeAnnotation.typeAnnotation, typeNames);
    if (typeAnnotation) {
      returnType.push(typeAnnotation);
    }
  }

  return {
    concept: 'TypeAnnotation',
    typeKind: 'function',
    typeName: '',
    typeNamespace: '',
    inferred: false,
    ruleMap: new Map(),
    typeArguments,
    returnType,
  };
}

function transformTSTypeLiteral(node: babelTypes.TSTypeLiteral, typeNames: string[]): TypeAnnotation {
  const properties: StructureProperty[] = [];
  node.members.forEach((n) => {
    if (n.type === 'TSPropertySignature' && n.key.type === 'Identifier' && n.typeAnnotation && n.typeAnnotation.type === 'TSTypeAnnotation') {
      const typeAnnotation = transformTypeAnnotation(n.typeAnnotation.typeAnnotation, typeNames);

      if (typeAnnotation) {
        properties.push({
          concept: 'StructureProperty',
          name: n.key.name,
          jsonName: n.key.name,
          label: '',
          description: '',
          defaultValue: {
            concept: 'DefaultValue',
            expression: {
              concept: 'NullLiteral',
            },
            playground: [],
          },
          typeAnnotation,
        });
      }
    }
  });

  return {
    concept: 'TypeAnnotation',
    typeKind: 'anonymousStructure',
    typeName: '',
    typeNamespace: '',
    inferred: false,
    ruleMap: new Map(),
    properties,
  };
}
// eslint-disable-next-line consistent-return
export default function transformTypeAnnotation(node: babelTypes.TSType, typeNames: string[] = []): TypeAnnotation | undefined {
  switch (node.type) {
    case 'TSTypeReference':
      return transformTSTypeReference(node, typeNames);
    case 'TSUnionType':
      return transformTSUnionType(node, typeNames);
    case 'TSFunctionType':
      return transformTSFunctionType(node, typeNames);
    case 'TSTypeLiteral':
      return transformTSTypeLiteral(node, typeNames);
    case 'TSVoidKeyword':
      return undefined;
    default:
      exitNotSupportType(node);
      return undefined;
  }
}

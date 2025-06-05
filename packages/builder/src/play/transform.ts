/* eslint-disable no-use-before-define */
import type {
  ViewComponentDeclaration,
  PropDeclaration,
  EventDeclaration,
  SlotDeclaration,
  LogicDeclaration,
  DefaultValue,
} from '@nasl/types/nasl.ui.ast';
import { isNil } from 'lodash';
import * as babelTypes from '@babel/types';
import { getTypeAST, getNodeCode } from '../utils/babel-utils';
// eslint-disable-next-line no-use-before-define
export type NType = NBasicType | NArrayType | NStructType | NMapType | NUnionType | NFunctionType | NUnknowType;

export interface NBasicType {
  type: 'string' | 'integer' | 'date' | 'time' | 'datetime' | 'decimal' | 'boolean' | 'any' | 'array' | 'struct' | 'map' | 'union' | 'function' | 'unknow';
}
export interface NArrayType extends NBasicType {
  type: 'array';
  value: NType;
}
export interface NStructType extends NBasicType {
  type: 'struct';
  value: Array<{
      name: string;
      type: NType;
  }>;
}
export interface NMapType extends NBasicType {
  type: 'map';
  key: NType;
  value: NType;
}
export interface NUnionType extends NBasicType {
  type: 'union';
  value: NType[];
}

export interface NFunctionParam {
  name: string;
  description?: string;
  type: NType;
  defaultValue?: string;
}

export interface NFunctionType extends NBasicType {
  type: 'function';
  params: Array<NFunctionParam>;
  returnType: NType | 'void';
}

export interface NUnknowType extends NBasicType {
  type: 'unknow';
  raw: string;
}

export type TypeMap = {
  prop: {
    [key: string]: NType;
  },
  event: {
    [key: string]: NType;
  },
  slot: {
    [key: string]: NType | null;
  },
  method: {
    [key: string]: {
      params: NFunctionParam[],
      returnType: NType | 'void',
    };
  },
  readableProp: {
    [key: string]: NType;
  },
};

function transformTSTypeReference(node: babelTypes.TSTypeReference): NType {
  const code = getNodeCode(node);
  switch (true) {
    case code.startsWith('nasl.core.String'):
      return {
        type: 'string',
      };
    case code.startsWith('nasl.core.Integer'):
      return {
        type: 'integer',
      };
    case code.startsWith('nasl.core.Decimal'):
      return {
        type: 'decimal',
      };
    case code.startsWith('nasl.core.Boolean'):
      return {
        type: 'boolean',
      };
    case code.startsWith('nasl.core.DateTime'):
      return {
        type: 'datetime',
      };
    case code.startsWith('nasl.core.Date'):
      return {
        type: 'date',
      };
    case code.startsWith('nasl.core.Time'):
      return {
        type: 'time',
      };
    case code.startsWith('nasl.collection.List'):
      return {
        type: 'array',
        value: node.typeParameters?.params[0] ? transformTsType2NType(node.typeParameters.params[0]) : { type: 'any' },
      } as NArrayType;
    case code.startsWith('nasl.collection.Map'):
      return {
        type: 'map',
        key: node.typeParameters?.params[0] ? transformTsType2NType(node.typeParameters.params[0]) : { type: 'any' },
        value: node.typeParameters?.params[1] ? transformTsType2NType(node.typeParameters.params[1]) : { type: 'any' },
      } as NMapType;
    default:
      return {
        type: 'unknow',
        raw: code,
      } as NUnknowType;
  }
}

function transformTsType2NType(typeAST: babelTypes.TSType): NType {
  switch (typeAST.type) {
    case 'TSTypeReference':
      return transformTSTypeReference(typeAST);
    case 'TSStringKeyword':
      return {
        type: 'string',
      };
    case 'TSNumberKeyword':
      return {
        type: 'union',
        value: [
          {
            type: 'integer',
          },
          {
            type: 'decimal',
          },
        ],
      };
    case 'TSBooleanKeyword':
      return {
        type: 'boolean',
      };
    case 'TSAnyKeyword':
      return {
        type: 'any',
      };
    case 'TSUnionType':
      return {
        type: 'union',
        value: typeAST.types.map((item) => transformTsType2NType(item)),
      };
    case 'TSFunctionType':
      return {
        type: 'function',
        params: (typeAST.parameters || []).map((item, index) => {
          switch (item.type) {
            case 'Identifier':
              return {
                name: item.name,
                type: item.typeAnnotation && item.typeAnnotation.type === 'TSTypeAnnotation' ? transformTsType2NType(item.typeAnnotation.typeAnnotation) : { type: 'any' },
              };
            default:
              return {
                name: `params${index}`,
                type: {
                  type: 'any',
                },
              };
          }
        }),
        returnType: (
          typeAST.typeAnnotation
          && typeAST.typeAnnotation.type === 'TSTypeAnnotation'
          && typeAST.typeAnnotation.typeAnnotation.type !== 'TSVoidKeyword'
        ) ? transformTsType2NType(typeAST.typeAnnotation.typeAnnotation) : 'void',
      } as NFunctionType;
    case 'TSTypeLiteral':
      return {
        type: 'struct',
        value: typeAST.members.map((item, index) => {
          switch (item.type) {
            case 'TSPropertySignature':
              return {
                name: item.key.type === 'Identifier' ? item.key.name : `property${index}`,
                type: item.typeAnnotation && item.typeAnnotation.type === 'TSTypeAnnotation' ? transformTsType2NType(item.typeAnnotation.typeAnnotation) : { type: 'any' },
              };
            default:
              return {
                name: `property${index}`,
                type: {
                  type: 'any',
                },
              };
          }
        }),
      };
    default:
      return {
        type: 'unknow',
        raw: getNodeCode(typeAST),
      };
  }
}

function resolvePropTsType(prop: PropDeclaration): NType {
  if (!prop.tsType) {
    return {
      type: 'any',
    };
  }

  const typeAST = getTypeAST(prop.tsType);

  return transformTsType2NType(typeAST);
}

function resolveEventTsType(event: EventDeclaration) {
  if (!event.tsType) {
    return {
      type: 'struct',
      value: [],
    } as NStructType;
  }

  const typeAST = getTypeAST(event.tsType);

  if (
    typeAST.type !== 'TSFunctionType'
    || !typeAST.parameters[0]
    || typeAST.parameters[0].type !== 'Identifier'
    || typeAST.parameters[0].typeAnnotation?.type !== 'TSTypeAnnotation'
  ) {
    return {
      type: 'struct',
      value: [],
    } as NStructType;
  }

  return transformTsType2NType(typeAST.parameters[0].typeAnnotation.typeAnnotation);
}

function resolveSlotTsType(slot: SlotDeclaration) {
  if (!slot.tsType) {
    return null;
  }

  const typeAST = getTypeAST(slot.tsType);

  if (
    typeAST.type !== 'TSFunctionType'
    || !typeAST.parameters[0]
    || typeAST.parameters[0].type !== 'Identifier'
    || typeAST.parameters[0].typeAnnotation?.type !== 'TSTypeAnnotation'
  ) {
    return null;
  }

  return transformTsType2NType(typeAST.parameters[0].typeAnnotation.typeAnnotation);
}

export function transformDefaultValue(defaultValue?: DefaultValue): string {
  if (!defaultValue?.expression) {
    return '';
  }

  switch (defaultValue.expression?.concept) {
    case 'NullLiteral':
      return 'null';
    case 'BooleanLiteral':
      return defaultValue.expression.value;
    case 'StringLiteral':
      return `'${defaultValue.expression.value}'`;
    case 'NumericLiteral':
      return defaultValue.expression.value;
    case 'NewList':
      return `[${defaultValue.expression.items.map((item) => transformDefaultValue({ expression: item } as DefaultValue)).filter((v) => !isNil(v)).join(', ')}]`;
    default:
      return '';
  }
}

function resolveMethodTsType(method: LogicDeclaration & { tsType: string }): {
  params: NFunctionParam[],
  returnType: NType | 'void',
} {
  if (!method.tsType) {
    return {
      params: [] as NFunctionParam[],
      returnType: 'void',
    };
  }

  const typeAST = getTypeAST(method.tsType);

  if (typeAST.type !== 'TSFunctionType') {
    return {
      params: [] as NFunctionParam[],
      returnType: 'void',
    };
  }

  return {
    params: method.params.map((param, index) => {
      let paramType: any = null;

      if (
        typeAST.parameters[index]
        && typeAST.parameters[index].type === 'Identifier'
        && typeAST.parameters[index].typeAnnotation
        && (typeAST.parameters[index].typeAnnotation as babelTypes.TSTypeAnnotation).type === 'TSTypeAnnotation'
      ) {
        paramType = (typeAST.parameters[index].typeAnnotation as babelTypes.TSTypeAnnotation).typeAnnotation;
      }

      return {
        name: param.name,
        type: paramType ? transformTsType2NType(paramType) : { type: 'any' },
        description: param.description,
        defaultValue: transformDefaultValue(param.defaultValue),
      } as NFunctionParam;
    }),
    returnType: (
      typeAST.typeAnnotation?.type === 'TSTypeAnnotation'
      && typeAST.typeAnnotation.typeAnnotation.type !== 'TSVoidKeyword'
    ) ? transformTsType2NType(typeAST.typeAnnotation.typeAnnotation) : 'void',
  };
}

export function addTypeMap(component: ViewComponentDeclaration) {
  const typeMap: TypeMap = {
    prop: {},
    event: {},
    slot: {},
    method: {},
    readableProp: {},
  };

  component.props.forEach((prop) => {
    typeMap.prop[prop.name] = resolvePropTsType(prop);
  });

  component.events.forEach((event) => {
    typeMap.event[event.name] = resolveEventTsType(event);
  });

  component.slots.forEach((slot) => {
    typeMap.slot[slot.name] = resolveSlotTsType(slot);
  });

  component.readableProps.forEach((readableProp) => {
    typeMap.readableProp[readableProp.name] = resolvePropTsType(readableProp);
  });

  component.methods.forEach((method) => {
    typeMap.method[method.name] = resolveMethodTsType(method as any);
  });

  return {
    ...component,
    typeMap,
    children: (component.children || []).map((n) => addTypeMap(n)),
  };
}

import type {
  MaterialComponentAttr,
  McType,
  McArrayType,
  McStructType,
  McMapType,
  McUnionType,
  McFunctionType,
  MaterialComponentEvent,
  MaterialComponentSlot,
  MaterialComponentMethod,
} from '@lcap/material-parser';
import { isNil, kebabCase, upperFirst } from 'lodash';

export function genTitle(name: string, title?: string) {
  if (title) {
    return title;
  }

  return kebabCase(name).split('-').map((word) => upperFirst(word)).join(' ');
}

export function genTypeCode(type: McType | string | number | boolean | undefined | null) {
  if (isNil(type)) {
    return 'any';
  }

  if (typeof type !== 'object') {
    return type;
  }

  if (type.type === 'string') {
    return 'nasl.core.String';
  }

  if (type.type === 'number') {
    return 'nasl.core.Integer | nasl.core.Decimal';
  }

  if (type.type === 'boolean') {
    return 'nasl.core.Boolean';
  }

  if (type.type === 'array') {
    return `nasl.collection.List<${(type as McArrayType).value ? genTypeCode((type as McArrayType).value) : 'any'}>`;
  }

  if (type.type === 'struct') {
    if (!(type as McStructType).value || (type as McStructType).value.length === 0) {
      return '{}';
    }

    return `{
      ${(type as McStructType).value.map((item) => `${item.name}: ${genTypeCode(item.type)},`).join(' ')}
    }`;
  }

  if (type.type === 'map') {
    return `nasl.collection.Map<nasl.core.String, ${genTypeCode((type as McMapType).value)}>`;
  }

  if (type.type === 'union') {
    return `(${((type as McUnionType).value || []).map((item) => genTypeCode(item)).join(' | ')})`;
  }

  if (type.type === 'function') {
    return `(${((type as McFunctionType).params || []).map((item) => `${item.name}: ${genTypeCode(item.type)}`).join(', ')}) => ${genTypeCode((type as McFunctionType).returnType)}`;
  }

  return 'any';
}

export function genSetterCode(attr: MaterialComponentAttr) {
  const { type, options } = attr;

  if (options && options.length > 0) {
    return `setter: {
      concept: 'EnumSelectSetter',
      options: ${JSON.stringify(options.map((option) => ({ title: option.label })))},
    },`;
  }

  if (type.type === 'number') {
    return `setter: {
      concept: 'NumberInputSetter',
    },`;
  }

  if (type.type === 'boolean') {
    return `setter: {
      concept: 'SwitchSetter',
    },`;
  }

  return `setter: {
    concept: 'InputSetter',
  },`;
}

export function genAttrCode(attr: MaterialComponentAttr) {
  const {
    name,
    description,
    type,
    defaultValue,
    sync,
  } = attr;
  const title = genTitle(name);
  const propOptions: string[] = [
    `title: '${title}',`,
    `description: '${description || title}',`,
    genSetterCode(attr),
  ];

  if (sync) {
    propOptions.push('sync: true,');
  }

  return `
    @Prop({
      ${propOptions.join('\n')}
    })
    ${name}: ${genTypeCode(type)}${defaultValue ? ` = ${defaultValue}` : ''};
  `;
}

export function genEventCode(event: MaterialComponentEvent) {
  const { name, description } = event;
  const title = genTitle(name);
  return `
  @Event({
    title: '${title}',
    description: '${description || title}',
  })
  ${name}: (event: {}) => any;
`;
}

export function genSlotCode(slot: MaterialComponentSlot) {
  const { name, description } = slot;
  const title = genTitle(name);

  return `
  @Slot({
    title: '${title}',
    description: '${description || title}',
  })
  ${name}: (current: {}) => Array<nasl.ui.ViewComponent>;
`;
}

export function genMethodCode(method: MaterialComponentMethod) {
  const {
    name,
    description,
    params,
    returnType,
  } = method;
  const title = genTitle(name);
  return `
  @Method({
    title: '${title}',
    description: '${description || title}',
  })
  ${name}(${params.map((param) => `${param.name}: ${genTypeCode(param.type)}`).join(', ')}): ${returnType ? genTypeCode(returnType) : 'void'} {
    ${returnType ? 'return null as any;' : ''}
  }
`;
}

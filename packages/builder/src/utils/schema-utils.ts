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

const eventRegex = /^on[A-Z].*/;
const slotRegex = /^slot[A-Z].*/;

export function normalizeString(str: string) {
  return str ? str.replace(/'/g, '\\\'') : '';
}

export function normalizeEventName(name: string) {
  if (eventRegex.test(name)) {
    return name;
  }

  return `on${upperFirst(name)}`;
}

export function normalizeSlotName(name: string) {
  if (slotRegex.test(name) || name.startsWith('slot-')) {
    return name;
  }

  return name.includes('-') ? `slot-${name}` : `slot${upperFirst(name)}`;
}

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

export function genAttrCode(attr: MaterialComponentAttr, group: string = '主要属性') {
  const {
    name,
    description,
    type,
    defaultValue,
    sync,
  } = attr;
  const title = genTitle(name);
  const propOptions: string[] = [
    `group: '${group}',`,
    `title: '${title}',`,
    `description: '${normalizeString(description || title)}',`,
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
  let { name } = event;

  name = normalizeEventName(name);

  const title = genTitle(name);
  return `
  @Event({
    title: '${title}',
    description: '${normalizeString(event.description || title)}',
  })
  ${name}: (event: {}) => any;
`;
}

export function genSlotCode(slot: MaterialComponentSlot) {
  let { name } = slot;

  name = normalizeSlotName(name);
  const title = genTitle(name);

  return `
  @Slot({
    title: '${title}',
    description: '${normalizeString(slot.description || title)}',
  })
  ${name.includes('-') ? `'${name}'` : name}: () => Array<nasl.ui.ViewComponent>;
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
    description: '${normalizeString(description || title)}',
  })
  ${name}(${params.map((param) => `${param.name}: ${genTypeCode(param.type)}`).join(', ')}): ${returnType ? genTypeCode(returnType) : 'void'} {
    ${returnType ? 'return null as any;' : ''}
  }
`;
}

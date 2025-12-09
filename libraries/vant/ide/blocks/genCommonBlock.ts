import * as naslTypes from '@nasl/ast-mini';
import {
  firstLowerCase,
  getFirstDisplayedProperty,
  transEntityMetadataTypes,
  NameGroup,
} from './utils';

/**
 * where条件生成
 * @param {*} entity
 */
function genWhereExpression(entity: naslTypes.Entity) {
  const properties = entity.properties.filter((property) => property?.display.inFilter);
  const expressions = properties.map((property) => {
    if (!property.relationEntity && ['String', 'Text'].includes(property.typeAnnotation.typeName)) {
      return `LIKE(${entity.name}.${property.name}, filter.${property.name})`;
    }
    return `${entity.name}.${property.name} == filter.${property.name}`;
  });
  return expressions.join('&&');
}

/**
 * 生成后端数据查询逻辑
 * @param {*} allEntities
 * @param {*} nameGroup
 * @param {*} supportSort
 * @param {*} supportFilter
 * @returns
 */
function genOldQueryLogic(allEntities: Array<naslTypes.Entity>, nameGroup: NameGroup, supportPage: boolean = true, supportSort: boolean, supportFilter: boolean): string {
  allEntities = Array.from(allEntities);
  const entity = allEntities.shift();
  if (!entity) {
    return '';
  }
  const namespace = entity.getNamespace();
  const entityLowerName = firstLowerCase(entity.name);
  const properties = entity.properties.filter((property) => property?.display.inFilter);
  return `export function ${nameGroup.logic}(${supportPage ? 'page: Long, size: Long' : ''}${supportSort ? ', sort: String, order: String' : ''}${supportFilter ? `, filter: ${namespace}.${entity.name}` : ''}) {
        let result;
        result = ${supportPage ? 'PAGINATE(' : ''}FROM(${namespace}.${entity.name}Entity, ${entity.name} => $
        ${allEntities.map((relationEntity) => {
    const onExpressions = entity.properties
      ?.filter((property) => property.relationEntity === relationEntity.name)
      .map((leftProperty) => {
        return `${entity.name}.${leftProperty.name} == ${relationEntity.name}.${leftProperty.relationProperty}`;
      }).join('&&');
    return `.LEFT_JOIN(${namespace}.${relationEntity.name}Entity, ${relationEntity.name} => ON(${onExpressions}))`;
  }).join('\n')}
  ${supportFilter && properties.length ? `.WHERE(${genWhereExpression(entity)})` : ''}
    .SELECT({
            ${entityLowerName}: ${entity.name},
            ${allEntities.map((relationEntity) => `${firstLowerCase(relationEntity.name)}: ${relationEntity.name}`).join(',')}
        })
        ${supportSort ? '.ORDER_BY([sort, order])' : ''})${supportPage ? ', page, size)' : ''}
        return result;
    }`;
}

/**
 * 生成新的查询逻辑。IDE 4.0以上
 * @param allEntities
 * @param nameGroup
 * @param supportSort
 * @param supportFilter
 * @returns
 */
function genNewQueryLogic(allEntities: Array<naslTypes.Entity>, nameGroup: NameGroup, supportPage: boolean = true, supportSort: boolean, supportFilter: boolean): string {
  allEntities = Array.from(allEntities);
  const entity = allEntities.shift();
  if (!entity) {
    return '';
  }
  const namespace = entity.getNamespace();
  const entityLowerName = firstLowerCase(entity.name);
  const properties = entity.properties.filter((property) => property?.display.inFilter);
  return `export function ${nameGroup.logic}(${supportPage ? 'page: Long, size: Long' : ''}${supportSort ? ', sort: String, order: String' : ''}${supportFilter ? `, filter: ${namespace}.${entity.name}` : ''}) {
        let result;
        result = ${supportPage ? 'PAGINATE(' : ''}FROM(${namespace}.${entity.name}Entity, ${entity.name} => $()
        ${allEntities.map((relationEntity) => {
    const onExpressions = entity.properties
      ?.filter((property) => property.relationEntity === relationEntity.name)
      .map((leftProperty) => {
        return `${entity.name}.${leftProperty.name} == ${relationEntity.name}.${leftProperty.relationProperty}`;
      }).join('&&');
    return `.LEFT_JOIN(${namespace}.${relationEntity.name}Entity, ${relationEntity.name} => ON(${onExpressions})`;
  }).join('\n')}
  ${supportFilter && properties.length ? `.WHERE(${genWhereExpression(entity)})` : ''}
    .SELECT({
            ${entityLowerName}: ${entity.name},
            ${allEntities.map((relationEntity) => `${firstLowerCase(relationEntity.name)}: ${relationEntity.name}`).join(',')}
        })
        ${supportSort ? '.ORDER_BY((resultItem)=>[[resultItem[sort], order]])' : ''})${allEntities.map(()=>`)`).join('')}${supportPage ? ', page, size)' : ''}
        return result;
    }`;
}

export function genQueryLogic(allEntities: Array<naslTypes.Entity>, nameGroup: NameGroup, supportPage: boolean = true, supportSort: boolean, supportFilter: boolean): string {
  const entity = allEntities[0];
  if (!entity) {
    return '';
  }
  const ideVersion = entity.app?.ideVersion;
  const ideVersions = ideVersion?.split('.');
  if (ideVersions && ideVersions.length >= 2 && Number(ideVersions[0]) >= 4) {
    return genNewQueryLogic(allEntities, nameGroup, supportPage, supportSort, supportFilter);
  }
  return genOldQueryLogic(allEntities, nameGroup, supportPage, supportSort, supportFilter);
}

/**
 * 列的MemberExpression生成
 * @param {*} property
 * @param {*} nameGroup
 * @returns
 */
export function genColumnMeta(property: naslTypes.EntityProperty, nameGroup: NameGroup) {
  const { entity } = property;
  const currentName = nameGroup.currentName || 'current';

  const dataSource = entity.parentNode;
  const lowerEntityName = firstLowerCase(entity.name);
  let valueExpression = `${currentName}.item.${lowerEntityName}.${property.name}`;
  const entityExpression = `${currentName}.item.${lowerEntityName}`;
  const title = (property.label || property.name).replace(/"/g, '&quot;');

  if (property.relationEntity) {
    const relationLowerEntityName = firstLowerCase(property.relationEntity);
    const relationEntity = dataSource?.findEntityByName(property.relationEntity);
    const displayedProperty = getFirstDisplayedProperty(relationEntity);
    valueExpression = `${currentName}.item.${relationLowerEntityName}.${displayedProperty?.name || property.relationProperty}`;
  }
  return {
    lowerEntityName,
    valueExpression,
    title,
    currentName,
    entityExpression,
  };
}

/**
 * 列的text生成
 * @param {*} property
 * @param {*} nameGroup
 * @returns
 */
export function genTextTemplate(property: naslTypes.EntityProperty, nameGroup: NameGroup) {
  const { valueExpression } = genColumnMeta(property, nameGroup);
  if (property.typeAnnotation.typeName === 'Boolean') {
    return `
            <VanText _if={${valueExpression}} text="是" display="block"></VanText>
            <VanText _if={!${valueExpression}} text="否" display="block"></VanText>
            `;
  }
  return `<VanText text={${valueExpression}} display="block"></VanText>`;
}

/**
 * property 列生成
 * @param {*} entity
 * @param {*} property
 * @param {*} nameGroup
 * @param {*} selectNameGroupMap
 * @returns
 */
export function genPropertyEditableTemplate(entity: naslTypes.Entity, property: naslTypes.EntityProperty, nameGroup: NameGroup, selectNameGroupMap: Map<string, NameGroup>, formItemAttrs: string[]) {
  const dataSource = entity.parentNode;
  const vModel = `${nameGroup.vModelName}.${property.name}`;
  const label = (property.label || property.name).replace(/"/g, '&quot;');
  const { typeAnnotation } = property || {};
  const { typeNamespace: propertyTypeNamespace } = typeAnnotation || {};
  const propertyTypeName = transEntityMetadataTypes(typeAnnotation, dataSource.app);
  const propertyTypeMaxLength = Number(
    property.rules
      .find((item) => item.indexOf('max') > -1)
      ?.split('(')[1]
      .slice(0, -1),
  ) || 0;
  if (property.relationEntity) {
    // 有外键关联
    const relationEntity = dataSource?.findEntityByName(property.relationEntity);
    if (relationEntity) {
      const relationProperty = relationEntity.properties.find((prop) => prop.name === property.relationProperty);
      const displayedProperty = getFirstDisplayedProperty(relationEntity);
      if (displayedProperty) {
        const lowerEntityName = firstLowerCase(relationEntity.name);
        // 存在多个属性关联同一个实体的情况，因此加上属性名用以唯一标识
        const key = [property.name, relationEntity.name].join('-');
        const selectNameGroup = selectNameGroupMap.get(key);
        const dataSourceValue = `app.logics.${selectNameGroup.logic}()`;
        return `<VanPicker
            placeholder="请选择${label}"
            modelValue={$sync(${vModel})}
            dataSource={${dataSourceValue}}
            textField="${lowerEntityName}.${displayedProperty.name}"
            valueField="${lowerEntityName}.${relationProperty.name}"
            slot-title={
              <VanText text="请选择${label}"></VanText>
            }>
          </VanPicker>`;
      } return '';
    } return '';
  }
  if (propertyTypeName === 'Boolean') {
    return `<VanFormSwitch modelValue={$sync(${vModel})} ${formItemAttrs.join(' ')}></VanFormSwitch>`;
  } if (propertyTypeName === 'Integer' || propertyTypeName === 'Long') {
    return `<VanFormStepperNumber modelValue={$sync(${vModel})} placeholder="请输入${property.label || property.name
    }" ${formItemAttrs.join(' ')}></VanFormStepperNumber>`;
  } if (propertyTypeName === 'Double') {
    return `<VanFormStepperNumber modelValue={$sync(${vModel})} placeholder="请输入${property.label || property.name
    }" ${formItemAttrs.join(' ')}></VanFormStepperNumber>`;
  } if (propertyTypeName === 'Decimal') {
    return `<VanFormStepperNumber modelValue={$sync(${vModel})} placeholder="请输入${property.label || property.name
    }" ${formItemAttrs.join(' ')}></VanFormStepperNumber>`;
  } if (propertyTypeName === 'String' && propertyTypeMaxLength > 256) {
    return `<VanFormField type="textarea" modelValue={$sync(${vModel})} placeholder="请输入${property.label || property.name
    }" ${formItemAttrs.join(' ')}></VanFormField>`;
  } if (propertyTypeName === 'Date') {
    return `<VanFormCalendar modelValue={$sync(${vModel})} ${formItemAttrs.join(' ')}
      slot-title={
        <VanText text="请选择${property.label || property.name}"></VanText>
      }></VanFormCalendar>`;
  } if (propertyTypeName === 'Time') {
    return `<VanFormTimePicker type="time" modelValue={$sync(${vModel})} ${formItemAttrs.join(' ')}
      slot-title={
        <VanText text="请选择${property.label || property.name}"></VanText>
      }></VanFormTimePicker>`;
  } if (propertyTypeName === 'DateTime') {
    return `<VanFormDatePicker type="datetime" modelValue={$sync(${vModel})} ${formItemAttrs.join(' ')}
      slot-title={
        <VanText text="请选择${property.label || property.name}"></VanText>
      }></VanFormDatePicker>`;
  }
  const namespaceArr = typeof propertyTypeNamespace === 'string' ? propertyTypeNamespace.split('.') : [];
  const type = namespaceArr.pop();
  if (type === 'enums') {
    const enumTypeAnnotationStr = `${propertyTypeNamespace}.${propertyTypeName}`;
    return `<VanPicker
            placeholder="请选择${label}"
            modelValue={$sync(${vModel})}
            dataSource={nasl.util.EnumToList<${enumTypeAnnotationStr}>()}
            valueField="item"
            slot-title={
              <VanText text="请选择${label}"></VanText>
            }>
          </VanPicker>`;
  }
  return `<VanFormField modelValue={$sync(${vModel})} placeholder="请输入${property.label || property.name
  }" ${formItemAttrs.join(' ')}></VanFormField>`;
}

type MinMaxString = `${'min' | 'max'}(${string})`;
/**
 * 类型守卫函数，判断字符串是否符合min/max格式
 */
function isMinMaxString(str: string): str is MinMaxString {
  return /^(min|max)\([-+]?\d+\)$/.test(str);
}

/**
 * 解析带min/max前缀的数字字符串，确保结果在 JS 安全整数范围内
 * @param str - 格式为 "min(数字)" 或 "max(数字)" 的字符串
 * @returns 处理后的安全整数
 */
function parseSafeNumberRule(str: string): string {
  const match = str.match(/^(min|max)\(([-+]?\d+)\)$/);
  if (!match) {
    return str;
  }
  const [, prefix, numStr] = match;
  try {
    // 使用BigInt确保精度
    const bigNum = BigInt(numStr);
    const minSafe = BigInt(Number.MIN_SAFE_INTEGER);
    const maxSafe = BigInt(Number.MAX_SAFE_INTEGER);
    let safeNumber;
    if (bigNum < minSafe) {
      safeNumber = Number.MIN_SAFE_INTEGER;
    } else if (bigNum > maxSafe) {
      safeNumber = Number.MAX_SAFE_INTEGER;
    } else {
      safeNumber = Number(bigNum); // 转换回number
    }
    return `${prefix}(${safeNumber})`;
  } catch (error) {
    return str;
  }
}

/**
 * 表单项
 * @param {*} entity
 * @param {*} properties
 * @param {*} nameGroup
 * @param {*} selectNameGroupMap
 * @param {*} options
 * @returns
 */
export function genFormItemsTemplate(entity: naslTypes.Entity, properties: Array<naslTypes.EntityProperty>, nameGroup: NameGroup, selectNameGroupMap: Map<string, NameGroup>, options = {
  needRules: true,
}) {
  return `
  ${properties.map((property) => {
    const label = (property.label || property.name).replace(/"/g, '&quot;');
    const required = !!property.required && options.needRules;
    const rules: Array<string> = [];
    if (options.needRules && property.rules && property.rules.length) {
      property.rules.forEach((rule) => {
        let curRule = rule;
        if (!rule.endsWith(')')) {
          curRule += '()';
        }
        if (isMinMaxString(curRule)) {
          curRule = parseSafeNumberRule(curRule);
        }
        rules.push(`nasl.validation.${curRule}`);
      });
    }
    if (required) rules.push('nasl.validation.required()');
    const formItemAttrs: string[] = [
      'layout="center"',
      `slotLabel={<VanText text="${label}"></VanText>}`,
    ];
    if (required) {
      formItemAttrs.push('isRequired={true}');
    }

    if (rules.length > 0) {
      formItemAttrs.push(`rules={[${rules.join(',')}]}`);
    }

    return genPropertyEditableTemplate(entity, property, nameGroup, selectNameGroupMap, formItemAttrs);
  }).join('\n')}`;
}

import * as naslTypes from '@nasl/ast-mini';
import {
  firstLowerCase,
  getFirstDisplayedProperty,
  filterProperty,
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
export function genQueryLogic(allEntities: Array<naslTypes.Entity>, nameGroup: NameGroup, supportPage: boolean = true, supportSort: boolean, supportFilter: boolean): string {
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
            <ElText _if={${valueExpression}} text="是"></ElText>
            <ElText _if={!${valueExpression}} text="否"></ElText>
            `;
  }
  return `<ElText text={${valueExpression}}></ElText>`;
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
        return `<ElFormSelect ${formItemAttrs.join(' ')}
                clearable={true}
                placeholder="请选择${label}"
                dataSource={${dataSourceValue}}
                textField="${lowerEntityName}.${displayedProperty.name}"
                valueField="${lowerEntityName}.${relationProperty.name}"
                modelValue={$sync(${vModel})}>
            </ElFormSelect>`;
      } return '';
    } return '';
  }
  if (propertyTypeName === 'Boolean') {
    return `<ElFormSelect ${formItemAttrs.join(' ')}
        clearable={true}
        placeholder="请选择${label}"
        modelValue={$sync(${vModel})}>
        <ElOption value={true} label="是"><ElText text="是" /></ElOption>
        <ElOption value={false} label="否"><ElText text="否" /></ElOption>
    </ElFormSelect>`;
  } if (propertyTypeName === 'Integer' || propertyTypeName === 'Long') {
    return `<ElFormInputNumber ${formItemAttrs.join(' ')}
        theme="column"
        placeholder="请输入${label}"
        modelValue={$sync(${vModel})}>
    </ElFormInputNumber>`;
  } if (propertyTypeName === 'Double') {
    return `<ElFormInputNumber ${formItemAttrs.join(' ')}
        theme="column"
        placeholder="请输入${label}"
        modelValue={$sync(${vModel})}>
    </ElFormInputNumber>`;
  } if (propertyTypeName === 'Decimal') {
    return `<ElFormInputNumber ${formItemAttrs.join(' ')}
        theme="column"
        placeholder="请输入${label}"
        modelValue={$sync(${vModel})}>
    </ElFormInputNumber>`;
  } if (propertyTypeName === 'String' && propertyTypeMaxLength > 256) {
    return `<ElFormInput ${formItemAttrs.join(' ')}
        placeholder="请输入${label}"
        modelValue={$sync(${vModel})}
        type="textarea">
    </ElFormInput>`;
  } if (propertyTypeName === 'Date') {
    return `<ElFormDatePicker ${formItemAttrs.join(' ')}
        type="date"
        clearable={true}
        placeholder="请选择${label}"
        prefixIconName="Calendar"
        clearIconName="CircleClose"
        format="YYYY-MM-DD"
        valueFormat="YYYY-MM-DD"
        modelValue={$sync(${vModel})}>
    </ElFormDatePicker>`;
  } if (propertyTypeName === 'Time') {
    return `<ElFormTimePicker ${formItemAttrs.join(' ')}
        placeholder="请选择${label}"
        prefixIconName="Clock"
        clearIconName="CircleClose"
        modelValue={$sync(${vModel})}>
    </ElFormTimePicker>`;
  } if (propertyTypeName === 'DateTime') {
    return `<ElFormDatePicker ${formItemAttrs.join(' ')}
        type="datetime"
        clearable={true}
        placeholder="请选择${label}"
        prefixIconName="Clock"
        clearIconName="CircleClose"
        modelValue={$sync(${vModel})}>
    </ElFormDatePicker>`;
  }
  const namespaceArr = propertyTypeNamespace.split('.');
  const type = namespaceArr.pop();
  if (type === 'enums') {
    const enumTypeAnnotationStr = `${propertyTypeNamespace}.${propertyTypeName}`;
    return `<ElFormSelect ${formItemAttrs.join(' ')}
                clearable={true}
                placeholder="请选择${label}"
                textField="text"
                valueField="value"
                dataSource={nasl.util.EnumToList<${enumTypeAnnotationStr}>()}
                modelValue={$sync(${vModel})}>
            </ElFormSelect>`;
  }
  return `<ElFormInput ${formItemAttrs.join(' ')} placeholder="请输入${label}" modelValue={$sync(${vModel})}></ElFormInput>`;
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
  needDefaultValue: true,
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
      `slotLabel={<ElText text="${label}"></ElText>}`,
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

/**
 * 过滤条件
 * @param {*} entity
 * @param {*} nameGroup
 * @param {*} selectNameGroupMap
 */
export function genFilterTemplate(entity: naslTypes.Entity, nameGroup: NameGroup, selectNameGroupMap: Map<string, NameGroup>) {
  const properties = entity.properties.filter(filterProperty('inFilter'));
  nameGroup.vModelName = nameGroup.viewVariableFilter;
  return `<ElFlex>
  <ElForm inline={true} ref="${nameGroup.viewElementFilterForm}">
        ${genFormItemsTemplate(entity, properties, nameGroup, selectNameGroupMap, {
    needRules: false,
    needDefaultValue: false,
  })}
      <ElButton
          type="primary"
          text="查 询"
          onClick={
              function ${nameGroup.viewLogicReload}(event) {
                $refs.${nameGroup.viewElementMainView}.reload()
              }
          }>
      </ElButton>
  </ElForm>
    </ElFlex>`;
}

export function genSaveModalTemplate(entity: naslTypes.Entity, nameGroup: NameGroup, selectNameGroupMap: Map<string, NameGroup>) {
  const properties = entity.properties.filter(filterProperty('inForm'));
  nameGroup.vModelName = nameGroup.viewVariableInput;

  return `<ElDialog ref="${nameGroup.viewElementSaveModal}"
    slotHeader={
      <>
        <ElText _if={${nameGroup.viewVariableIsUpdate}} text="修改"></ElText>
        <ElText _if={!${nameGroup.viewVariableIsUpdate}} text="创建"></ElText>
      </>
    }
    slotDefault={
        <ElForm ref="${nameGroup.viewElementSaveModalForm}">
            ${genFormItemsTemplate(entity, properties, nameGroup, selectNameGroupMap)}
        </ElForm>
    }
    slotFooter={
        <ElFlex justify="center" alignment="center">
            <ElButton
                _if={${nameGroup.viewVariableIsUpdate}}
                type="primary"
                text="提交修改"
                onClick={
                  function ${nameGroup.viewLogicUpdateSubmit}(event) {
                    if ($refs.${nameGroup.viewElementSaveModalForm}.validated().valid) {
                      ${entity.getNamespace()}.${entity.name}Entity.update(${nameGroup.viewVariableInput})
                      $refs.${nameGroup.viewElementSaveModal}.close()
                      $refs.${nameGroup.viewElementMainView}.reload()
                    }
                  }
                }>
            </ElButton>
            <ElButton
              _if={!${nameGroup.viewVariableIsUpdate}}
                type="primary"
                text="立即创建"
                onClick={
                    function ${nameGroup.viewLogicSubmit}(event) {
                        if ($refs.${nameGroup.viewElementSaveModalForm}.validated().valid) {
                          ${entity.getNamespace()}.${entity.name}Entity.create(${nameGroup.viewVariableInput})
                          $refs.${nameGroup.viewElementSaveModal}.close()
                          $refs.${nameGroup.viewElementMainView}.reload()
                        }
                      }
                }>
            </ElButton>
        </ElFlex>
    }>
  </ElDialog>`;
}

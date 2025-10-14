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

/**
 * 生成后端数据查询逻辑
 * @param {*} allEntities
 * @param {*} nameGroup
 * @param {*} supportSort
 * @param {*} supportFilter
 * @returns
 */
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
            <Text _if={${valueExpression}} children="是"></Text>
            <Text _if={!${valueExpression}} children="否"></Text>
            `;
  }
  return `<Text children={${valueExpression}}></Text>`;
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
        return `<Select ${formItemAttrs.join(' ')}
                allowClear={true}
                placeholder="请选择${label}"
                dataSource={${dataSourceValue}}
                textField="${lowerEntityName}.${displayedProperty.name}"
                valueField="${lowerEntityName}.${relationProperty.name}">
            </Select>`;
      } return '';
    } return '';
  }
  if (propertyTypeName === 'Boolean') {
    return `<Select ${formItemAttrs.join(' ')}
        allowClear={true}
        placeholder="请选择${label}"
        name="${property.name}">
        <SelectOption value={true} label="是"><Text children="是" /></SelectOption>
        <SelectOption value={false} label="否"><Text children="否" /></SelectOption>
    </Select>`;
  } if (propertyTypeName === 'Integer' || propertyTypeName === 'Long') {
    return `<InputNumber ${formItemAttrs.join(' ')}
        name="${property.name}"
        theme="column"
        placeholder="请输入${label}">
    </InputNumber>`;
  } if (propertyTypeName === 'Double') {
    return `<InputNumber ${formItemAttrs.join(' ')}
        theme="column"
        name="${property.name}"
        placeholder="请输入${label}">
    </InputNumber>`;
  } if (propertyTypeName === 'Decimal') {
    return `<InputNumber ${formItemAttrs.join(' ')}
        theme="column"
        name="${property.name}"
        placeholder="请输入${label}">
    </InputNumber>`;
  } if (propertyTypeName === 'String' && propertyTypeMaxLength > 256) {
    return `<TextArea ${formItemAttrs.join(' ')}
        name="${property.name}"
        placeholder="请输入${label}">
    </TextArea>`;
  } if (propertyTypeName === 'Date') {
    return `<DatePicker ${formItemAttrs.join(' ')}
        name="${property.name}"
        placeholder="请选择${label}">
    </DatePicker>`;
  } if (propertyTypeName === 'Time') {
    return `<TimePicker ${formItemAttrs.join(' ')}
        name="${property.name}"
        placeholder="请选择${label}">
    </TimePicker>`;
  } if (propertyTypeName === 'DateTime') {
    return `<DatePicker ${formItemAttrs.join(' ')}
        name="${property.name}"
        showTime={true}
        placeholder="请选择${label}">
    </DatePicker>`;
  }
  const namespaceArr = typeof propertyTypeNamespace === 'string' ? propertyTypeNamespace.split('.') : [];
  const type = namespaceArr.pop();
  if (type === 'enums') {
    const enumTypeAnnotationStr = `${propertyTypeNamespace}.${propertyTypeName}`;
    return `<Select ${formItemAttrs.join(' ')}
                name="${property.name}"
                allowClear={true}
                placeholder="请选择${label}"
                textField="text"
                valueField="value"
                dataSource={nasl.util.EnumToList<${enumTypeAnnotationStr}>()}>
            </Select>`;
  }
  return `<Input ${formItemAttrs.join(' ')} placeholder="请输入${label}" name="${property.name}"></Input>`;
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
      `labelText="${label}"`,
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
  return `<Flex direction="vertical" style="width: 100%;">
  <QueryForm ref="${nameGroup.viewElementFilterForm}" submitter={false}>
        ${genFormItemsTemplate(entity, properties, nameGroup, selectNameGroupMap, {
    needRules: false,
    needDefaultValue: false,
  })}
      <Button
          type="primary"
          children="查 询"
          onClick={
              function ${nameGroup.viewLogicReload}(event) {
                $refs.${nameGroup.viewElementMainView}.reload()
              }
          }>
      </Button>
  </QueryForm>
    </Flex>`;
}

export function genSaveModalTemplate(entity: naslTypes.Entity, nameGroup: NameGroup, selectNameGroupMap: Map<string, NameGroup>) {
  const properties = entity.properties.filter(filterProperty('inForm'));
  nameGroup.vModelName = nameGroup.viewVariableInput;

  return `<Modal ref="${nameGroup.viewElementSaveModal}"
    slotTitle={
      <>
        <Text _if={${nameGroup.viewVariableIsUpdate}} children="修改"></Text>
        <Text _if={!${nameGroup.viewVariableIsUpdate}} children="创建"></Text>
      </>
    }
    slotDefault={
        <Form ref="${nameGroup.viewElementSaveModalForm}">
            ${genFormItemsTemplate(entity, properties, nameGroup, selectNameGroupMap)}
        </Form>
    }
    slotFooter={
        <Flex justify="center" alignment="center">
            <Button
                _if={${nameGroup.viewVariableIsUpdate}}
                type="primary"
                children="提交修改"
                onClick={
                  function ${nameGroup.viewLogicUpdateSubmit}(event) {
                    if ($refs.${nameGroup.viewElementSaveModalForm}.validate()) {
                      ${entity.getNamespace()}.${entity.name}Entity.update(${nameGroup.viewVariableInput})
                      $refs.${nameGroup.viewElementSaveModal}.close()
                      $refs.${nameGroup.viewElementMainView}.reload()
                    }
                  }
                }>
            </Button>
            <Button
              _if={!${nameGroup.viewVariableIsUpdate}}
                type="primary"
                children="立即创建"
                onClick={
                    function ${nameGroup.viewLogicSubmit}(event) {
                        if ($refs.${nameGroup.viewElementSaveModalForm}.validate()) {
                          ${entity.getNamespace()}.${entity.name}Entity.create(${nameGroup.viewVariableInput})
                          $refs.${nameGroup.viewElementSaveModal}.close()
                          $refs.${nameGroup.viewElementMainView}.reload()
                        }
                      }
                }>
            </Button>
        </Flex>
    }>
  </Modal>`;
}

export function genFormSetvalueLogic(entity: naslTypes.Entity, nameGroup: NameGroup) {
  const properties = entity.properties.filter(filterProperty('inForm'));
  const setValues = properties.map((property) => {
    return `$refs.${nameGroup.viewElementMainView}.setValue('${property.name}', ${nameGroup.viewVariableEntity}.${property.name});`;
  });
  return setValues.join('\n');
}

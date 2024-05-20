import {
  firstLowerCase,
  getFirstDisplayedProperty,
  filterProperty,
  transEntityMetadataTypes,
} from './utils';

function genWhereExpression(entity) {
  const properties = entity.properties.filter((property) => property?.display.inFilter);
  const expressions = properties.map((property) => {
    if (!property.relationEntity && ['String', 'Text'].includes(property.typeAnnotation.typeName)) {
      return `LIKE(${entity.name}.${property.name}, filter.${property.name})`;
    }
    return `${entity.name}.${property.name} == filter.${property.name}`;
  });
  return expressions.join('&&');
}

export function genQueryLogic(allEntities, nameGroup, supportSort, supportFilter) {
  allEntities = Array.from(allEntities);
  const entity = allEntities.shift();
  if (!entity) {
    return '';
  }
  const namespace = entity.getNamespace();
  const entityLowerName = firstLowerCase(entity.name);
  return `export function ${nameGroup.logic}(page: Long, size: Long${supportSort ? ', sort: String, order: String' : ''}${supportFilter ? ', filter: any' : ''}) {
        let result;
        result = PAGINATE(FROM(${namespace}.${entity.name}, ${entity.name} => $
        ${allEntities.map((relationEntity) => {
    const onExpressions = entity.properties
      ?.filter((property) => property.relationEntity === relationEntity.name)
      .map((leftProperty) => {
        return `${entity.name}.${leftProperty.name} == ${relationEntity.name}.${leftProperty.relationProperty}`;
      }).join('\n');
    return `.LEFT_JOIN(${namespace}.${relationEntity.name}, ${relationEntity.name} => ON(() => ${onExpressions}))`;
  }).join('\n')}
  ${supportFilter ? `.WHERE(() => ${genWhereExpression(entity)})` : ''}
        ${supportSort ? '.ORDER_BY(() => [sort, order])' : ''}
        .SELECT(() => ({
            ${entityLowerName}: ${entity.name},
            ${allEntities.map((relationEntity) => `${firstLowerCase(relationEntity.name)}: relationEntity.name`).join(',')}
        }))), page, size)
        return result;
    }`;
}

export function genColumnMeta(property, nameGroup) {
  const { entity } = property;
  const currentName = nameGroup.currentName || 'current';

  const dataSource = entity.parentNode;
  const lowerEntityName = firstLowerCase(entity.name);
  let valueExpression = `${currentName}.item.${lowerEntityName}.${property.name}`;
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
  };
}

export function genTextTemplate(property, nameGroup) {
  const { valueExpression } = genColumnMeta(property, nameGroup);
  if (property.typeAnnotation.typeName === 'Boolean') {
    return `
            <UText _if={${valueExpression}} text="是"></UText>
            <UText _if={!${valueExpression}} text="否"></UText>
            `;
  }
  return `<UText text={${valueExpression}}></UText>`;
}

export function genFormItemsTemplate(entity, properties, nameGroup, selectNameGroupMap, options = {
  needRules: true,
}) {
  const dataSource = entity.parentNode;

  return `
  ${properties.map((property) => {
    const vModel = `${nameGroup.vModelName}.${property.name}`;
    const label = (property.label || property.name).replace(/"/g, '&quot;');
    const required = !!property.required && options.needRules;
    const rules = [];
    if (options.needRules && property.rules && property.rules.length) {
      property.rules.forEach((rule) => rules.push(`nasl.validation.${rule}`));
    }
    if (required) rules.push('nasl.validation.required()');
    let formItem = `<UFormItem
          ${required ? 'required={true}' : ''}
          ${rules.length ? ` rules={[${rules.join(',')}]}` : ''}
          layout="center"
          slotLabel={
              <UText text="${label}"></UText>
          }>`;
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
          const dataSourceValue = `${selectNameGroup.logic}(elements.$ce.page, elements.$ce.size)`;
          formItem += `
                      <USelect
                          clearable={true}
                          placeholder="请选择${label}"
                          dataSource={${dataSourceValue}}
                          pageSize={50}
                          textField="${lowerEntityName}.${displayedProperty.name}"
                          valueField="${lowerEntityName}.${relationProperty.name}"
                          pagination={true}
                          value={$sync(${vModel})}>
                      </USelect>
                  `;
        } else return '';
      } else return '';
    } else if (propertyTypeName === 'Boolean') {
      formItem += `
              <USelect
                  clearable={true}
                  value={$sync(${vModel})}
                  placeholder="请输入${label}">
                  <USelectItem value={true} text="是"></USelectItem>
                  <USelectItem value={false} text="否"></USelectItem>
              </USelect>
          `;
    } else if (propertyTypeName === 'Integer' || propertyTypeName === 'Long') {
      formItem += `
              <UNumberInput
                  value={$sync(${vModel})}
                  placeholder="请输入${label}">
              </UNumberInput>
          `;
    } else if (propertyTypeName === 'Double') {
      formItem += `
              <UNumberInput
                  value={$sync(${vModel})}
                  precision={0}
                  step={0}
                  placeholder="请输入${label}">
              </UNumberInput>
          `;
    } else if (propertyTypeName === 'Decimal') {
      formItem += `
              <UNumberInput
                  value={$sync(${vModel})}
                  precision={0}
                  step={0}
                  placeholder="请输入${label}">
              </UNumberInput>
          `;
    } else if (propertyTypeName === 'String' && propertyTypeMaxLength > 256) {
      formItem += `
              <UTextArea
                  value={$sync(${vModel})}
                  placeholder="请输入${label}">
              </UTextArea>
          `;
    } else if (propertyTypeName === 'Date') {
      formItem += `
              <UDatePicker
                  clearable={true}
                  value={$sync(${vModel})}
                  placeholder="请输入${label}">
              </UDatePicker>
          `;
    } else if (propertyTypeName === 'Time') {
      formItem += `
              <UTimePicker
                  value={$sync(${vModel})}
                  placeholder="请输入${label}">
              </UTimePicker>
          `;
    } else if (propertyTypeName === 'DateTime') {
      formItem += `
              <UDateTimePicker
                  clearable={true}
                  value={$sync(${vModel})}
                  placeholder="请输入${label}">
              </UDateTimePicker>
          `;
    } else {
      const namespaceArr = propertyTypeNamespace.split('.');
      const type = namespaceArr.pop();
      if (type === 'enums') {
        const enumeration = dataSource.app.findNodeByCompleteName(`${propertyTypeNamespace}.${propertyTypeName}`);
        const enumnamespace = enumeration?.getNamespace() || '';
        const name = enumeration?.name || '';
        const enumTypeAnnotationStr = `__enumTypeAnnotation_${enumnamespace}.${name}`;
        formItem += `
                  <USelect
                      clearable={true}
                      value={$sync(${vModel})}
                      placeholder="请输入${label}"
                      dataSource={$utils.EnumToList('${enumTypeAnnotationStr}')}>
                  </USelect>
              `;
      } else {
        formItem += `<UInput value={$sync(${vModel})} placeholder="请输入${label}"></UInput>`;
      }
    }
    formItem += '</UFormItem>';
    return formItem;
  }).join('\n')}`;
}

export function genFilterTemplate(entity, nameGroup, selectNameGroupMap) {

}

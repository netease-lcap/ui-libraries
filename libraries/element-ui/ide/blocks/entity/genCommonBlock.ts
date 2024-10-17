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
        ${supportSort ? '.ORDER_BY([sort, order])' : ''}
        .SELECT({
            ${entityLowerName}: ${entity.name},
            ${allEntities.map((relationEntity) => `${firstLowerCase(relationEntity.name)}: ${relationEntity.name}`).join(',')}
        }))${supportPage ? ', page, size)' : ''}
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
export function genPropertyEditableTemplate(entity: naslTypes.Entity, property: naslTypes.EntityProperty, nameGroup: NameGroup, selectNameGroupMap: Map<string, NameGroup>) {
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
        return `<ElSelectPro
                clearable={true}
                placeholder="请选择${label}"
                dataSource={${dataSourceValue}}
                textField="${lowerEntityName}.${displayedProperty.name}"
                valueField="${lowerEntityName}.${relationProperty.name}">
            </ElSelectPro>`;
      } return '';
    } return '';
  }
  if (propertyTypeName === 'Boolean') {
    return `<ElSelectPro
        clearable={true}
        placeholder="请选择${label}">
        <ElOptionPro value={true} label="是"></ElOptionPro>
        <ElOptionPro value={false} label="否"></ElOptionPro>
    </ElSelectPro>`;
  } if (propertyTypeName === 'Integer' || propertyTypeName === 'Long') {
    return `<ElInputNumberPro
        theme="column"
        placeholder="请输入${label}">
    </ElInputNumberPro>`;
  } if (propertyTypeName === 'Double') {
    return `<ElInputNumberPro
        theme="column"
        placeholder="请输入${label}">
    </ElInputNumberPro>`;
  } if (propertyTypeName === 'Decimal') {
    return `<ElInputNumberPro
        theme="column"
        placeholder="请输入${label}">
    </ElInputNumberPro>`;
  } if (propertyTypeName === 'String' && propertyTypeMaxLength > 256) {
    return `<ElTextareaPro
        placeholder="请输入${label}">
    </ElTextareaPro>`;
  } if (propertyTypeName === 'Date') {
    return `<ElDatePickerPro
        clearable={true}
        placeholder="请选择${label}">
    </ElDatePickerPro>`;
  } if (propertyTypeName === 'Time') {
    return `<ElTimePickerPro
        placeholder="请选择${label}">
    </ElTimePickerPro>`;
  } if (propertyTypeName === 'DateTime') {
    return `<ElDateTimePickerPro
        clearable={true}
        placeholder="请选择${label}">
    </ElDateTimePickerPro>`;
  }
  const namespaceArr = propertyTypeNamespace.split('.');
  const type = namespaceArr.pop();
  if (type === 'enums') {
    const enumTypeAnnotationStr = `${propertyTypeNamespace}.${propertyTypeName}`;
    return `<ElSelectPro
                clearable={true}
                placeholder="请选择${label}"
                textField="text"
                valueField="value"
                dataSource={nasl.util.EnumToList<${enumTypeAnnotationStr}>()}>
            </ElSelectPro>`;
  }
  return `<ElInputPro placeholder="请输入${label}"></ElInputPro>`;
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
        if (!rule.endsWith(')')) {
          rule += '()';
        }
        rules.push(`nasl.validation.${rule}`);
      });
    }
    if (required) rules.push('nasl.validation.required()');
    let defaultValueExpression = '';
    if (property.defaultValue && property.defaultValue.expression && options.needDefaultValue) {
      const defaultValue = property.defaultValue.expression.toVue();
      defaultValueExpression = `initialValue={${defaultValue}}`;
    }
    let formItem = `<ElFormItemPro
          ${required ? 'requiredMark="show"' : ''}
          ${rules.length ? ` rules={[${rules.join(',')}]}` : ''}
          layout="center"
          name="${property.name}"
          ${defaultValueExpression}
          slotLabel={
            <ElText text="${label}"></ElText>
          }>`;
    formItem += `${genPropertyEditableTemplate(entity, property, nameGroup, selectNameGroupMap)}`;
    formItem += '</ElFormItemPro>';
    return formItem;
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
  <ElFormPro layoutMode="grid" ref="${nameGroup.viewElementFilterForm}">
        ${genFormItemsTemplate(entity, properties, nameGroup, selectNameGroupMap, {
    needRules: false,
    needDefaultValue: false,
  })}
        <ElFormItemPro layout="center" labelWidth="{0}">
            <ElButton
                type="primary"
                text="查 询"
                onClick={
                    function ${nameGroup.viewLogicReload}(event) {
                      ${nameGroup.viewVariableFilter} = $refs.${nameGroup.viewElementFilterForm}.getFormData();
                      $refs.${nameGroup.viewElementMainView}.reload()
                    }
                }>
            </ElButton>
        </ElFormItemPro>
  </ElFormPro>
    </ElFlex>`;
}

export function genSaveModalTemplate(entity: naslTypes.Entity, nameGroup: NameGroup, selectNameGroupMap: Map<string, NameGroup>) {
  const dataSource = entity.parentNode;
  const properties = entity.properties.filter(filterProperty('inForm'));
  nameGroup.vModelName = nameGroup.viewVariableInput;

  return `<ElDialog ref="${nameGroup.viewElementSaveModal}"
    onOpened={
      function ${nameGroup.viewLogicModalOpened}(event) {
        if(${nameGroup.viewVariableIsUpdate}) {
          $refs.${nameGroup.viewElementSaveModalForm}.setFormData(${nameGroup.viewVariableInput})
        }
      }
    }
    onClose={
      function ${nameGroup.viewLogicModalClose}(event) {
        $refs.${nameGroup.viewElementSaveModalForm}.resetForm()
      }
    }
    slotTitle={
      <>
        <ElText _if={${nameGroup.viewVariableIsUpdate}} text="修改"></ElText>
        <ElText _if={!${nameGroup.viewVariableIsUpdate}} text="创建"></ElText>
      </>
    }
    slotDefault={
        <ElFormPro ref="${nameGroup.viewElementSaveModalForm}">
            ${genFormItemsTemplate(entity, properties, nameGroup, selectNameGroupMap)}
        </ElFormPro>
    }
    slotFooter={
        <ElFlex justify="center" alignment="center">
            <ElButton
                _if={${nameGroup.viewVariableIsUpdate}}
                type="primary"
                text="提交修改"
                onClick={
                  function ${nameGroup.viewLogicUpdateSubmit}(event) {
                    if ($refs.${nameGroup.viewElementSaveModalForm}.validate().valid) {
                      ${entity.getNamespace()}.${entity.name}Entity.update($refs.${nameGroup.viewElementSaveModalForm}.getFormData())
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
                        if ($refs.${nameGroup.viewElementSaveModalForm}.validate().valid) {
                          ${entity.getNamespace()}.${entity.name}Entity.create($refs.${nameGroup.viewElementSaveModalForm}.getFormData())
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

import {
  filterProperty,
  firstLowerCase,
  transEntityMetadataTypes,
  getFirstDisplayedProperty,
  genUniqueQueryNameGroup,
} from './utils';

function genCreateFormTemplate(entity, nameGroup, selectNameGroupMap) {
  const namespace = entity.getNamespace();
  const entityName = entity.name;
  const entityFullName = `${namespace}.${entityName}`;
  const dataSource = entity.parentNode;

  const properties = entity.properties.filter(filterProperty('inForm'));

  return ` export function view() {
        let ${nameGroup.viewVariableEntity}: ${entityFullName};

        return <UForm ref="${nameGroup.viewElementMainView}">
            ${properties.map((property) => {
    const vModel = `${nameGroup.viewVariableEntity}.${property.name}`;
    const label = property.label || property.name;
    const required = !!property.required;
    const rules = [];
    if (property.rules && property.rules.length) {
      property.rules.forEach((rule) => rules.push(rule));
    }
    if (required) rules.push('required');
    const rulesStr = rules.join(' | ');
    let formItem = `<UFormItem
                    ${required ? ' :required="true"' : ''}
                    ${rulesStr.length ? ` rules="${rulesStr}"` : ''}
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
  }).join('\n')}
            <UFormItem
                layout="center">
                <UButton
                    color="primary"
                    text="立即创建"
                    onClick={
                        function ${nameGroup.viewLogicSubmit}(event) {
                            if ($refs.${nameGroup.viewElementMainView}.validate().valid) {
                                ${namespace}.${entity.name}.logics.create(${nameGroup.viewVariableEntity})
                                nasl.ui.showMessage('创建成功！')
                            }
                        }
                    }></UButton>
            </UFormItem>
        </UForm>
    }`;
}

function genQueryLogic(allEntities, nameGroup, supportFilter, supportSort, parentNode) {
  const entity = allEntities?.[0];
  const namespace = entity.getNamespace();
  const entityLowerName = entity.name.toLowerCase();
  return `export function ${nameGroup.logic}(page: Long, size: Long) {
        let result;
        result = PAGINATE(FROM(${namespace}.${entity.name}, ${entity.name} => $
        .SELECT(() => ({
            ${entityLowerName}: ${entity.name},
        }))), page, size)
        return result;
    }`;
}

export function genCreateBlock(entity, viewElement) {
  const likeComponent = viewElement?.likeComponent;
  const dataSource = entity.parentNode;
  const module = dataSource.app;
  const { ns } = entity;

  const nameGroup = {
    viewElementMainView: likeComponent.getViewElementUniqueName('form1'),
    viewVariableEntity: likeComponent.getVariableUniqueName(firstLowerCase(entity.name)),
    viewLogicSubmit: likeComponent.getLogicUniqueName('submit'),
  };

  // 收集所有和本实体关联的实体
  const selectNameGroupMap = new Map();
  const newLogics = [];
  entity.properties.forEach((property) => {
    // 有外键关联
    if (property.relationEntity) {
      const relationEntity = dataSource?.findEntityByName(property.relationEntity);
      if (relationEntity) {
        const displayedProperty = getFirstDisplayedProperty(relationEntity);
        if (displayedProperty) {
          const viewElementSelect = likeComponent.getViewElementUniqueName('select');
          const selectNameGroup = genUniqueQueryNameGroup(module, likeComponent, viewElementSelect, false, relationEntity.name);
          selectNameGroup.viewElementSelect = viewElementSelect;
          // 存在多个属性关联同一个实体的情况，因此加上属性名用以唯一标识
          const key = [property.name, relationEntity.name].join('-');
          selectNameGroupMap.set(key, selectNameGroup);
          const newLogic = genQueryLogic([relationEntity], selectNameGroup, false, false, module);
          newLogics.push(newLogic);
        }
      }
    }
  });

  return `${genCreateFormTemplate(entity, nameGroup, selectNameGroupMap)}
    export namespace app.logics {
        ${newLogics.join('\n')}
    }
    `;
}

import * as naslTypes from '@nasl/ast-mini';
import {
  filterProperty,
  firstLowerCase,
  getFirstDisplayedProperty,
  genUniqueQueryNameGroup,
  getEntityPromaryKeyProperty,
  NameGroup,
  getViewUniqueVariableNames,
  getAllEntityPromaryKeyProperty,
  getCurrentName,
} from './utils';
import {
  genQueryLogic, genColumnMeta,
  genFilterTemplate, genFormItemsTemplate,
  genPropertyEditableTemplate,
  isMinMaxString,
  parseSafeNumberRule,
  genTextTemplate,
} from './genCommonBlock';

function canEditable(property: naslTypes.EntityProperty) {
  const namespaceType = property?.typeAnnotation?.typeNamespace?.split('.').pop();
  const isComplexType = (
    ['Map', 'List'].includes(property?.typeAnnotation?.typeName) ||
    (property?.typeAnnotation?.typeKind === 'reference' && ['entities', 'structures'].includes(namespaceType))
  );
  return !property.readonly && !isComplexType;
}

function genEditChangeFunction(property: naslTypes.EntityProperty, nameGroup: NameGroup) {
  const { entity } = property;
  const lowerEntityName = firstLowerCase(entity.name);
  return `function ${nameGroup.viewLogicEditChange}(event) {
    ${entity.getNamespace()}.${entity.name}Entity.update(event.row.${lowerEntityName})
  }`;
}

function genEditChangeFunctionRef(property: naslTypes.EntityProperty, nameGroup: NameGroup) {
  return `elements.${nameGroup.viewElementTableColumn}.bindEvents.edit-change.logics.${nameGroup.viewLogicEditChange}`;
}

function genEditComponent(entity: naslTypes.Entity, property: naslTypes.EntityProperty, nameGroup: NameGroup, selectNameGroupMap: Map<string, NameGroup>, formItemAttrs: Array<string> = []) {
  if (!canEditable(property)) {
    return genTextTemplate(property, nameGroup);
  }
  const lowerEntityName = firstLowerCase(entity.name);
  const currentName = nameGroup.currentName || 'current';
  const vModel = `${currentName}.item.${lowerEntityName}.${property.name}`;
  return genPropertyEditableTemplate(entity, property, nameGroup, selectNameGroupMap, formItemAttrs, vModel);
}

function genTableEditColumnTemplate(entity: naslTypes.Entity, property: naslTypes.EntityProperty, nameGroup: NameGroup, selectNameGroupMap: Map<string, NameGroup>, options: any = {
  isBindEventLogicRef: false,
}) {
  const isFirstCanEditable = (property1) => {
    const properties = entity.properties.filter(filterProperty('inTable'));
    for (let i = 0; i < properties.length; i += 1) {
      const prop = properties[i];
      if (canEditable(prop)) {
        return prop.name === property1.name;
      }
    }
    return false;
  };
  const isBindEventLogicRef = options.isBindEventLogicRef || !isFirstCanEditable(property);
  const { lowerEntityName, title } = genColumnMeta(property, nameGroup);
  const required = !!property.required;
  const rules: Array<string> = [];
  if (property.rules && property.rules.length) {
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

  const formItemAttrs: string[] = [];

  if (required) {
    formItemAttrs.push('isRequired={true}');
  }

  if (rules.length > 0) {
    formItemAttrs.push(`rules={[${rules.join(',')}]}`);
  }
  const currentName = nameGroup.currentName || 'current';
  formItemAttrs.push(`preview={${currentName}.isPreview}`);

  if (property.typeAnnotation
    && property.typeAnnotation.typeName === 'Decimal'
    && property.typeAnnotation.ruleMap && property.typeAnnotation.ruleMap.scale !== undefined) {
    formItemAttrs.push(`precision={${property.typeAnnotation.ruleMap.scale}}`);
  }

  return `<ElTableColumn
      prop="${lowerEntityName}.${property.name}"
      ${canEditable(property) ? 'type="editable" style="width: 300px"' : ''}
      ${isFirstCanEditable(property) ? `ref="${nameGroup.viewElementTableColumn}"` : ''}
      slotHeader={
        <ElText text="${title}"></ElText>
      }
      slotDefault={
        (current) => <>${genEditComponent(entity, property, nameGroup, selectNameGroupMap, formItemAttrs)}</>
      }
      ${
        canEditable(property) ? `onEditChange={
          ${isBindEventLogicRef ? genEditChangeFunctionRef(property, nameGroup) : genEditChangeFunction(property, nameGroup)}
        }` : ''
      }
    >
  </ElTableColumn>`;
}

export function genEditTableTemplate(entity: naslTypes.Entity, nameGroup: NameGroup, selectNameGroupMap: Map<string, NameGroup>) {
  const namespace = entity.getNamespace();
  const entityName = entity.name;
  const currentName = nameGroup.currentName || 'current';
  const properties = entity.properties.filter(filterProperty('inTable'));
  const dataSourceValue = `app.logics.${nameGroup.logic}(elements.$ce.currentPage, elements.$ce.pageSize, elements.$ce.sort, elements.$ce.order, ${nameGroup.viewVariableFilter})`;
  const idProperties = getAllEntityPromaryKeyProperty(entity);
  return `<ElTable
          ref="${nameGroup.viewElementMainView}"
          dataSource={${dataSourceValue}}
          rowKey="${firstLowerCase(entity.name)}.${getEntityPromaryKeyProperty(entity)}"
          pagination={true}
          defaultPageSize={20}
          defaultCurrentPage={1}>
              ${properties.map((property) => `${genTableEditColumnTemplate(entity, property, nameGroup, selectNameGroupMap)}`).join('\n')}
              <ElTableColumn
                  slotHeader={
                      <ElText text="操作"></ElText>
                  }
                  slotDefault={
                      (current) => <ElFlex>
                          <ElLink
                              text="删除"
                              onClick={
                                  function ${nameGroup.viewLogicRemove}(event) {
                                      ${namespace}.${entityName}Entity.delete(${idProperties.map((property) => `${currentName}.item.${firstLowerCase(entity.name)}.${property.name}`).join(',')})
                                      $refs.${nameGroup.viewElementMainView}.reload()
                                  }
                              }>
                          </ElLink>
                      </ElFlex>
                  }>
              </ElTableColumn>
      </ElTable>`;
}

function genSaveModalTemplate(entity: naslTypes.Entity, nameGroup: NameGroup, selectNameGroupMap: Map<string, NameGroup>) {
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

export function genTableEditBlock(entity: naslTypes.Entity, refElement: naslTypes.ViewElement) {
  const likeComponent = refElement?.likeComponent || refElement;
    const dataSource = entity.parentNode;
    const module = dataSource.app;
    const namespace = entity.getNamespace();
    const entityName = entity.name;
    const entityFullName = `${namespace}.${entityName}`;

    const viewElementMainView = likeComponent.getViewElementUniqueName('el_table');
    const nameGroup = genUniqueQueryNameGroup(module, likeComponent, viewElementMainView);
    nameGroup.viewElementMainView = viewElementMainView;
    nameGroup.viewElementFilterForm = likeComponent.getViewElementUniqueName('el_form_filter');
    nameGroup.viewElementSaveModal = likeComponent.getViewElementUniqueName('el_dialog_save');
    nameGroup.viewElementSaveModalForm = likeComponent.getViewElementUniqueName('el_dialog_save_form');
    nameGroup.viewLogicRemove = likeComponent.getLogicUniqueName('remove');
    nameGroup.viewLogicInit = likeComponent.getLogicUniqueName('init');
    nameGroup.viewLogicCreate = likeComponent.getLogicUniqueName('create');
    nameGroup.viewLogicModify = likeComponent.getLogicUniqueName('modify');
    nameGroup.viewLogicSubmit = likeComponent.getLogicUniqueName('submit');
    nameGroup.viewLogicUpdateSubmit = likeComponent.getLogicUniqueName('updateSubmit');
    nameGroup.viewLogicReload = likeComponent.getLogicUniqueName('reload');
    nameGroup.viewVariableEntity = likeComponent.getVariableUniqueName(firstLowerCase(entity.name));
    nameGroup.viewVariableInput = getViewUniqueVariableNames(likeComponent.getVariableUniqueName('input'), nameGroup.viewVariableEntity);
    nameGroup.viewVariableFilter = getViewUniqueVariableNames(likeComponent.getVariableUniqueName('filter'), nameGroup.viewVariableEntity);
    nameGroup.viewVariableIsUpdate = getViewUniqueVariableNames(likeComponent.getVariableUniqueName('isUpdate'), nameGroup.viewVariableEntity);
    nameGroup.viewLogicModalOpened = likeComponent.getLogicUniqueName('modalOpened');
    nameGroup.viewLogicModalClose = likeComponent.getLogicUniqueName('modalClose');
    nameGroup.viewLogicEditChange = likeComponent.getLogicUniqueName('editchange');
    nameGroup.viewElementTableColumn = likeComponent.getViewElementUniqueName('el_table_column');

    // 当前节点的currentName
    nameGroup.currentName = getCurrentName(refElement);
    if (likeComponent.getDirectoryUniqueName) {
      nameGroup.viewDirectoryEntity = likeComponent.getDirectoryUniqueName(entity.name?.toLowerCase());
    }

    // 收集所有和本实体关联的实体
    const entitySet: Set<naslTypes.Entity> = new Set();
    entitySet.add(entity);
    const selectNameGroupMap = new Map();
    const newLogics: Array<string> = [];
    entity.properties.forEach((property) => {
      if (property.relationEntity) {
        // 有外键关联
        const relationEntity = dataSource?.findEntityByName(property.relationEntity);
        if (relationEntity) {
          const displayedProperty = getFirstDisplayedProperty(relationEntity);
          if (displayedProperty) {
            entitySet.add(relationEntity);
            const viewElementSelect = likeComponent.getViewElementUniqueName('el_select');
            const selectNameGroup = genUniqueQueryNameGroup(module, likeComponent, viewElementSelect, false, relationEntity.name);
            selectNameGroup.viewElementSelect = viewElementSelect;
            // 存在多个属性关联同一个实体的情况，因此加上属性名用以唯一标识
            const key = [property.name, relationEntity.name].join('-');
            selectNameGroupMap.set(key, selectNameGroup);
            const newLogic = genQueryLogic([relationEntity], selectNameGroup, false, false, false);
            newLogics.push(newLogic);
          }
        }
      }
    });
    const allEntities = [...entitySet];
    const entityLogic = genQueryLogic(allEntities, nameGroup, true, true, true);
    newLogics.push(entityLogic);

    return `export function view() {
      ${
        nameGroup.viewDirectoryEntity
        ? `
        $Variable({
          directory: ${nameGroup.viewDirectoryEntity},
        })
        let ${nameGroup.viewVariableEntity}: ${entityFullName};
        $Variable({
          directory: ${nameGroup.viewDirectoryEntity},
        })
        let ${nameGroup.viewVariableInput}: ${entityFullName};
        $Variable({
          directory: ${nameGroup.viewDirectoryEntity},
        })
        let ${nameGroup.viewVariableFilter}: ${entityFullName};
        $Variable({
          directory: ${nameGroup.viewDirectoryEntity},
        })
        let ${nameGroup.viewVariableIsUpdate}: Boolean;`
        : `let ${nameGroup.viewVariableEntity}: ${entityFullName};
          let ${nameGroup.viewVariableInput}: ${entityFullName};
          let ${nameGroup.viewVariableFilter}: ${entityFullName};
          let ${nameGroup.viewVariableIsUpdate}: Boolean;`
      }
  
      const $lifecycles = {
          onCreated: [
              function ${nameGroup.viewLogicInit}(event) {
                nasl.util.Clear(${nameGroup.viewVariableFilter},'deep');
                return;
              },
          ]
      }
  
      return <ElFlex direction="vertical" mode="block">
          ${genFilterTemplate(entity, nameGroup, selectNameGroupMap)}
          <ElFlex alignment="center" justify="end" style="width: 100%">
              <ElButton
                  type="primary"
                  text="创 建"
                  onClick={
                      function ${nameGroup.viewLogicCreate}(event) {
                          ${nameGroup.viewVariableIsUpdate} = false
                          ${nameGroup.viewVariableInput} = nasl.util.Clone(${nameGroup.viewVariableEntity});
                          $refs.${nameGroup.viewElementSaveModal}.open()
                      }
                  }></ElButton>
          </ElFlex>
          ${genEditTableTemplate(entity, nameGroup, selectNameGroupMap)}
          ${genSaveModalTemplate(entity, nameGroup, selectNameGroupMap)}
      </ElFlex>
    }
      export namespace app.logics {
          ${newLogics.join('\n')}
      }`;
}

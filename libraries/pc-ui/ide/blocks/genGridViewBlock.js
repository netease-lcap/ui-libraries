import {
  filterProperty,
  firstLowerCase,
  getFirstDisplayedProperty,
  genUniqueQueryNameGroup,
  getEntityPromaryKeyProperty,
} from './utils';
import { genQueryLogic, genTextTemplate, genColumnMeta } from './genCommonBlock';

function genGridViewCardTemplate(property, nameGroup) {
  const { title } = genColumnMeta(property, nameGroup);

  return `<ULinearLayout gap="small">
    <UText text="${title}"></UText>
    ${genTextTemplate(property, nameGroup)}
  </ULinearLayout> `;
}

export function genGridViewTemplate(entity, nameGroup, options = {
  hasFileter: false,
  modifyable: false,
}) {
  const namespace = entity.getNamespace();
  const entityName = entity.name;
  const currentName = nameGroup.currentName || 'current';
  const properties = entity.properties.filter(filterProperty('inTable'));
  const dataSourceValue = `app.logics.${nameGroup.logic}(elements.$ce.page, elements.$ce.size${options.hasFileter ? `,${nameGroup.viewVariableFilter}` : ''})`;
  return `<UGridView
        ref="${nameGroup.viewElementMainView}"
        dataSource={${dataSourceValue}}
        valueField={${nameGroup.lowerEntity}.${getEntityPromaryKeyProperty(entity)}}
        pageSize={50}
        pageNumber={1}
        pageable={true}
        remotePaging={true}
        showSizer={true}
        repeat={4}
        border={false}
        readonly={true}
        showFoot={true}
        style="height:auto"
        slotItem={
            (current) => <UCard>
                <ULinearLayout direction="vertical" gap="small">
                    ${properties.map((property) => `${genGridViewCardTemplate(property, nameGroup)}`).join('\n')}
                    <ULinearLayout gap="small">
                        <ULink
                            text="修改"
                            ${options.modifyable ? `onClick={
                                function ${nameGroup.viewLogicModify}(event) {
                                    ${nameGroup.viewVariableIsUpdate} = true
                                    ${nameGroup.viewVariableInput} = nasl.util.Clone(${currentName}.item.${firstLowerCase(entity.name)})
                                    $refs.${nameGroup.viewElementSaveModal}.open()
                                }
                            }` : ''}>
                        </ULink>
                        <ULink
                            text="删除"
                            onClick={
                                function ${nameGroup.viewLogicRemove}(event) {
                                    ${namespace}.${entityName}.logics.delete(${currentName}.item.${firstLowerCase(entity.name)}.${getEntityPromaryKeyProperty(entity)})
                                    $refs.${nameGroup.viewElementMainView}.reload()
                                }
                            }>
                        </ULink>
                    </ULinearLayout>
                </ULinearLayout>
            </UCard>
        }>
    </UGridView>`;
}

export function genGridViewBlock(entity, refElement) {
  const likeComponent = refElement?.likeComponent;
  const dataSource = entity.parentNode;
  const module = dataSource.app;

  const viewElementMainView = likeComponent.getViewElementUniqueName('gridView');
  const nameGroup = genUniqueQueryNameGroup(module, likeComponent, viewElementMainView);
  nameGroup.viewElementMainView = viewElementMainView;
  nameGroup.viewVariableEntity = likeComponent.getVariableUniqueName(firstLowerCase(entity.name));
  nameGroup.viewLogicRemove = likeComponent.getLogicUniqueName('remove');
  nameGroup.viewVariableFilter = likeComponent.getVariableUniqueName('filter');
  nameGroup.lowerEntity = firstLowerCase(entity.name);

  // 当前节点的currentName
  nameGroup.currentName = refElement.getCurrentName();

  // 收集所有和本实体关联的实体
  const entitySet = new Set();
  entitySet.add(entity);
  entity.properties.forEach((property) => {
    if (property.relationEntity) {
      // 有外键关联
      const relationEntity = dataSource?.findEntityByName(property.relationEntity);
      if (relationEntity) {
        const displayedProperty = getFirstDisplayedProperty(relationEntity);
        if (displayedProperty) entitySet.add(relationEntity);
      }
    }
  });
  const allEntities = [...entitySet];

  return `export function view() {
    return ${genGridViewTemplate(entity, nameGroup)}
  }
    export namespace app.logics {
        ${genQueryLogic(allEntities, nameGroup, false, true, module)}
    }`;
}

import {
  filterProperty,
  firstLowerCase,
  getFirstDisplayedProperty,
  genUniqueQueryNameGroup,
} from './utils';

function getEntityKeyProperty(entity) {
  return entity.properties.find((p) => p.primaryKey)?.name || 'id';
}

function genTableColumnTemplateMeta(property, currentName = 'current') {
  const { entity } = property;

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
  return { lowerEntityName, valueExpression, title };
}

function genTableColumnTemplate(property, currentName) {
  const { lowerEntityName, valueExpression, title } = genTableColumnTemplateMeta(property, currentName);
  const getText = (property1) => {
    if (property1.typeAnnotation.typeName === 'Boolean') {
      return `
            <UText if="${valueExpression}" text="是"></UText>
            <UText if="!${valueExpression}" text="否"></UText>
            `;
    }
    return `<UText text={${valueExpression}}></UText>`;
  };
  return `<UTableViewColumn
    field="${lowerEntityName}.${property.name}"
    slotTitle={
        <UText text="${title}"></UText>
    }
    slotCell={
        (current) => <ULinearLayout gap="small">
            ${getText(property)}
        </ULinearLayout>
    }
    slotExpander={
        (current) => <UTableViewExpander
            item={current.item}>
        </UTableViewExpander>
    }>
  </UTableViewColumn>`;
}

function genTableTemplate(entity, nameGroup, modifyable, entryFromCall) {
  const namespace = entity.getNamespace();
  const entityName = entity.name;
  const currentName = nameGroup.currentName || 'current';
  const properties = entity.properties.filter(filterProperty('inTable'));
  const dataSourceValue = `${nameGroup.logic}(elements.$ce.page, elements.$ce.size, elements.$ce.sort, elements.$ce.order)`;
  return `export function view() {
    return <UTableView
        ref="${nameGroup.viewElementMainView}"
        dataSource={${dataSourceValue}}
        valueField="${firstLowerCase(entity.name)}.${getEntityKeyProperty(entity)}"
        pagination={true}
        showSizer={true}
        pageSize={20}
        pageNumber={1}>
            <UTableViewColumn
                type="index"
                width={60}
                slotTitle={
                    <UText text="序号"></UText>
                }
                slotExpander={
                    (current) => <UTableViewExpander
                        item={current.item}>
                    </UTableViewExpander>
                }>
            </UTableViewColumn>
            ${properties.map((property) => `${genTableColumnTemplate(property, currentName)}`).join('\n')}
            <UTableViewColumn
                slotTitle={
                    <UText text="操作"></UText>
                }
                slotCell={
                    (current) => <ULinearLayout gap="small">
                        <ULink
                            onClick={
                                function ${nameGroup.viewLogicModify}(event) {

                                }
                            }>
                        </ULink>
                        <ULink
                            onClick={
                                function ${nameGroup.viewLogicRemove}(event) {
                                    ${namespace}.${entityName}.logics.delete(${currentName}.item.${firstLowerCase(entity.name)}.${getEntityKeyProperty(entity)})
                                    $refs.${nameGroup.viewElementMainView}.reload()
                                }
                            }>
                        </ULink>
                    </ULinearLayout>
                }
                slotExpander={
                    (current) => <UTableViewExpander
                        item={current.item}>
                    </UTableViewExpander>
                }>
            </UTableViewColumn>
    </UTableView>
  }`;
}

export function genTableBlock(entity, refElement) {
  const likeComponent = refElement?.likeComponent;
  const dataSource = entity.parentNode;
  const module = dataSource.app;

  // 生成唯一name
  // 加到页面上的params、variables、logics等都需要唯一name
  // 页面上有ref引用的element也需要唯一name
  const viewElementMainView = likeComponent.getViewElementUniqueName('tableView');
  const nameGroup = genUniqueQueryNameGroup(module, likeComponent, viewElementMainView);
  nameGroup.viewElementMainView = viewElementMainView;
  nameGroup.viewVariableEntity = likeComponent.getVariableUniqueName(firstLowerCase(entity.name));
  nameGroup.viewLogicRemove = likeComponent.getLogicUniqueName('remove');
  // 当前节点的currentName
  nameGroup.currentName = refElement.getCurrentName();

  return `${genTableTemplate(entity, nameGroup)}`;
}

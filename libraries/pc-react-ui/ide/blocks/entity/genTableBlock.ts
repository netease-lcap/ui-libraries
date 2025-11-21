import * as naslTypes from '@nasl/ast-mini';
import {
  filterProperty,
  firstLowerCase,
  getFirstDisplayedProperty,
  genUniqueQueryNameGroup,
  getEntityPromaryKeyProperty,
  NameGroup,
  getAllEntityPromaryKeyProperty,
  getCurrentName,
} from './utils';
import { genQueryLogic, genTextTemplate, genColumnMeta } from './genCommonBlock';

function genTableColumnTemplate(property: naslTypes.EntityProperty, nameGroup: NameGroup) {
  const { lowerEntityName, title } = genColumnMeta(property, nameGroup);
  return `<TableColumn
    dataIndex="${lowerEntityName}.${property.name}"
    slotTitle={
        <Text children="${title}"></Text>
    }
    slotRender={
        (current) => <>${genTextTemplate(property, nameGroup)}</>
    }>
  </TableColumn>`;
}

export function genTableTemplate(entity: naslTypes.Entity, nameGroup: NameGroup, options = {
  hasFilter: false,
  modifyable: false,
}) {
  const namespace = entity.getNamespace();
  const entityName = entity.name;
  const currentName = nameGroup.currentName || 'current';
  const properties = entity.properties.filter(filterProperty('inTable'));
  const dataSourceValue = `app.logics.${nameGroup.logic}(elements.$ce.current, elements.$ce.pageSize, elements.$ce.sorter, elements.$ce.order${options.hasFilter ? `,${nameGroup.viewVariableFilter}` : ''})`;
  const idProperties = getAllEntityPromaryKeyProperty(entity);
  return `<Table
        ref="${nameGroup.viewElementMainView}"
        dataSource={${dataSourceValue}}
        rowKey="${firstLowerCase(entity.name)}.${getEntityPromaryKeyProperty(entity)}"
        pageSize={20}
        current={1}>
            ${properties.map((property) => `${genTableColumnTemplate(property, nameGroup)}`).join('\n')}
            <TableColumn
                slotTitle={
                    <Text children="操作"></Text>
                }
                slotRender={
                    (current) => <Flex>
                        <Link
                            children="修改"
                            ${options.modifyable ? `onClick={
                                function ${nameGroup.viewLogicModify}(event) {
                                    ${nameGroup.viewVariableIsUpdate} = true
                                    ${nameGroup.viewVariableInput} = nasl.util.Clone(${currentName}.item.${firstLowerCase(entity.name)})
                                    $refs.${nameGroup.viewElementSaveModal}.open()
                                }
                            }` : ''}>
                        </Link>
                        <Link
                            children="删除"
                            onClick={
                                function ${nameGroup.viewLogicRemove}(event) {
                                    ${namespace}.${entityName}Entity.delete(${idProperties.map((property) => `${currentName}.item.${firstLowerCase(entity.name)}.${property.name}`).join(',')})
                                    $refs.${nameGroup.viewElementMainView}.reload()
                                }
                            }>
                        </Link>
                    </Flex>
                }>
            </TableColumn>
    </Table>`;
}

export function genTableBlock(entity: naslTypes.Entity, refElement: naslTypes.ViewElement) {
  const likeComponent = refElement?.likeComponent || refElement;
  const dataSource = entity.parentNode;
  const module = dataSource.app;

  // 生成唯一name
  // 加到页面上的params、variables、logics等都需要唯一name
  // 页面上有ref引用的element也需要唯一name
  const viewElementMainView = likeComponent.getViewElementUniqueName('table');
  const nameGroup = genUniqueQueryNameGroup(module, likeComponent, viewElementMainView);
  nameGroup.viewElementMainView = viewElementMainView;
  nameGroup.viewVariableEntity = likeComponent.getVariableUniqueName(firstLowerCase(entity.name));
  nameGroup.viewLogicRemove = likeComponent.getLogicUniqueName('remove');
  // 当前节点的currentName
  nameGroup.currentName = getCurrentName(refElement);

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

  console.log(`export function view() {
      return ${genTableTemplate(entity, nameGroup)}
    }
    export namespace app.logics {
        ${genQueryLogic(allEntities, nameGroup, true, true, false)}
    }`);

  return `export function view() {
      return ${genTableTemplate(entity, nameGroup)}
    }
    export namespace app.logics {
        ${genQueryLogic(allEntities, nameGroup, true, true, false)}
    }`;
}

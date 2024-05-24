import {
  filterProperty,
  firstLowerCase,
} from './utils';

function genGetTemplate(entity, nameGroup) {
  const properties = entity.properties.filter(filterProperty('inDetail'));

  return `<VanCellGroup>
      ${properties
    .map((property) => {
      const temptitle = property.label || property.name;
      let formItem = `<VanCell isLink slotTitle={
            <VanText text="${temptitle}"></VanText>
          }>`;
      formItem += `{ ${`${nameGroup.viewVariableEntity}.${property.name}`} }</VanCell>`;
      return formItem;
    })
    .join('\n')}
    </VanCellGroup>`;
}

export function genGetBlock(entity, refElement) {
  const likeComponent = refElement?.likeComponent;
  const namespace = entity.getNamespace();
  const entityName = entity.name;
  const entityFullName = `${namespace}.${entityName}`;

  // 生成唯一name
  // 加到页面上的params、variables、logics等都需要唯一name
  // 页面上有ref引用的element也需要唯一name
  const nameGroup = {};
  nameGroup.viewParamId = likeComponent.getParamUniqueName('id');
  nameGroup.viewVariableEntity = likeComponent.getVariableUniqueName(firstLowerCase(entity.name));
  nameGroup.viewLogicLoad = likeComponent.getLogicUniqueName('load');

  return `export function view(${nameGroup.viewParamId}: Long) {
    let ${nameGroup.viewVariableEntity}: ${entityFullName};

    const $lifecycles = {
        onCreated: [
            function ${nameGroup.viewLogicLoad}() {
                ${nameGroup.viewVariableEntity} = ${namespace}.${entity.name}Entity.get(${nameGroup.viewParamId})
            },     
        ]      
    }

    return ${genGetTemplate(entity, nameGroup)}
  }`;
}

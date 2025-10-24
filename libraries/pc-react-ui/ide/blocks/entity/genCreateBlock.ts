import * as naslTypes from '@nasl/ast-mini';
import {
  filterProperty,
  getFirstDisplayedProperty,
  genUniqueQueryNameGroup,
  NameGroup,
  firstLowerCase,
} from './utils';
import { genQueryLogic, genFormItemsTemplate, genFormSetvalueLogic } from './genCommonBlock';

function genCreateFormTemplate(entity: naslTypes.Entity, nameGroup: NameGroup, selectNameGroupMap: Map<string, NameGroup>) {
  const namespace = entity.getNamespace();
  const properties = entity.properties.filter(filterProperty('inForm'));
  nameGroup.vModelName = nameGroup.viewVariableEntity;

  return `<Form ref="${nameGroup.viewElementMainView}" submitter={false}>
            ${genFormItemsTemplate(entity, properties, nameGroup, selectNameGroupMap)}
            <Button
              type="primary"
              children="立即创建"
                  onClick={
                      function ${nameGroup.viewLogicSubmit}(event) {
                          if ($refs.${nameGroup.viewElementMainView}.validate()) {
                              ${namespace}.${entity.name}Entity.create($refs.${nameGroup.viewElementMainView}.getValues())
                              nasl.ui.showMessage('创建成功！')
                          }
                      }
                  }></Button>
        </Form>`;
}

export function genCreateBlock(entity: naslTypes.Entity, refElement: naslTypes.ViewElement) {
  const likeComponent = refElement?.likeComponent || refElement;
  const dataSource = entity.parentNode;
  const module = dataSource.app;
  const namespace = entity.getNamespace();
  const entityName = entity.name;
  const entityFullName = `${namespace}.${entityName}`;

  // 生成唯一name
  // 加到页面上的params、variables、logics等都需要唯一name
  // 页面上有ref引用的element也需要唯一name
  const nameGroup = {
    viewElementMainView: likeComponent.getViewElementUniqueName('form'),
    viewVariableEntity: likeComponent.getVariableUniqueName(firstLowerCase(entity.name)),
    viewLogicSubmit: likeComponent.getLogicUniqueName('submit'),
    viewLogicLoad: likeComponent.getLogicUniqueName('load'),
    viewDirectoryEntity: null,
  };
  if (likeComponent.getDirectoryUniqueName) {
    nameGroup.viewDirectoryEntity = likeComponent.getDirectoryUniqueName(entity.name?.toLowerCase());
  }

  // 收集所有和本实体关联的实体
  const selectNameGroupMap = new Map();
  const newLogics: Array<string> = [];
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
          const newLogic = genQueryLogic([relationEntity], selectNameGroup, false, false, false);
          newLogics.push(newLogic);
        }
      }
    }
  });

  return `export function view() {
    ${
      nameGroup.viewDirectoryEntity
      ? `
      $Variable({
        directory: ${nameGroup.viewDirectoryEntity},
      })
      let ${nameGroup.viewVariableEntity}: ${entityFullName};`
      : `let ${nameGroup.viewVariableEntity}: ${entityFullName};`
    }

    const $lifecycles = {
        onMounted: [
            function ${nameGroup.viewLogicLoad}() {
              ${genFormSetvalueLogic(entity, nameGroup)}
            },     
        ]      
    }

    return ${genCreateFormTemplate(entity, nameGroup, selectNameGroupMap)}
  }
    export namespace app.logics {
        ${newLogics.join('\n')}
    }
    `;
}

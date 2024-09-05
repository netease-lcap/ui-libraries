import * as naslTypes from '@nasl/ast-mini';
import {
  firstLowerCase,
  getFirstDisplayedProperty,
  genUniqueQueryNameGroup,
  getEntityPromaryKeyProperty,
  NameGroup,
} from './utils';
import { genQueryLogic } from './genCommonBlock';

function genSelectTemplate(entity: naslTypes.Entity, nameGroup: NameGroup) {
  const dataSourceValue = `app.logics.${nameGroup.logic}()`;
  const property = getFirstDisplayedProperty(entity);
  return `<ElSelectPro
        clearable={true}
        placeholder="请选择"
        ref="${nameGroup.viewElementMainView}"
        dataSource={${dataSourceValue}}
        textField="${nameGroup.lowerEntity}.${property.name}"
        valueField="${nameGroup.lowerEntity}.${getEntityPromaryKeyProperty(entity)}">
    </ElSelectPro>`;
}

export function genSelectBlock(entity: naslTypes.Entity, refElement: naslTypes.ViewElement) {
  const likeComponent = refElement?.likeComponent;
  const dataSource = entity.parentNode;
  const module = dataSource.app;

  const viewElementMainView = likeComponent.getViewElementUniqueName('select');
  const nameGroup = genUniqueQueryNameGroup(module, likeComponent, viewElementMainView, false);
  nameGroup.viewElementMainView = viewElementMainView;
  nameGroup.lowerEntity = firstLowerCase(entity.name);

  const allEntities = [entity];

  return `export function view() {
    return ${genSelectTemplate(entity, nameGroup)}
  }
        export namespace app.logics {
            ${genQueryLogic(allEntities, nameGroup, false, false, false)}
        }`;
}

import * as naslTypes from '@nasl/ast-mini';
import { getFirstDisplayedProperty, genUniqueQueryNameGroup, NameGroup } from './utils';
import {
  genQueryLogic,
  genColumnMeta,
  genPropertyEditableTemplate,
  isMinMaxString,
  parseSafeNumberRule,
} from './genCommonBlock';

function genEditChangeFunction(property: naslTypes.EntityProperty, nameGroup: NameGroup) {
  const { entity } = property;
  if (entity && entity.concept === 'Entity') {
    return `function ${nameGroup.viewLogicEditChange}(event) {
        ${entity.getNamespace()}.${entity.name}Entity.update(${
      nameGroup.eventItemSuffix ? `event.row.${nameGroup.eventItemSuffix}` : 'event.row'
    })
    }`;
  }
  // 不是实体生成空方法
  return `function ${nameGroup.viewLogicEditChange}(event) {}`;
}

function genEditChangeFunctionRef(property: naslTypes.EntityProperty, nameGroup: NameGroup) {
  return `elements.${nameGroup.viewElementTableColumn}.bindEvents.edit-change.logics.${nameGroup.viewLogicEditChange}`;
}

/**
 * 列的text生成
 * @param {*} property
 * @param {*} nameGroup
 * @returns
 */
export function genTextTemplate(property: naslTypes.EntityProperty, nameGroup: NameGroup) {
  const { valueExpression } = nameGroup;
  if (property.typeAnnotation.typeName === 'Boolean') {
    return `
            <ElText _if={${valueExpression}} text="是"></ElText>
            <ElText _if={!${valueExpression}} text="否"></ElText>
            `;
  }
  return `<ElText text={${valueExpression}}></ElText>`;
}

function genEditComponent(
  entity: naslTypes.Entity,
  property: naslTypes.EntityProperty,
  nameGroup: NameGroup,
  selectNameGroupMap: Map<string, NameGroup>,
  formItemAttrs: Array<string> = [],
  editable: boolean = true,
) {
  if (!editable) {
    return genTextTemplate(property, nameGroup);
  }
  const vModel = `${nameGroup.valueExpression}`;
  return genPropertyEditableTemplate(entity, property, nameGroup, selectNameGroupMap, formItemAttrs, vModel);
}

function genTableEditColumnTemplate(
  entity: naslTypes.Entity,
  property: naslTypes.EntityProperty,
  nameGroup: NameGroup,
  selectNameGroupMap: Map<string, NameGroup>,
  options: any = {
    isBindEventLogicRef: false,
    editable: false,
  },
) {
  const canEditable = (property) => options?.editable;
  const isBindEventLogicRef = options?.isBindEventLogicRef;
  const { title } = genColumnMeta(property, nameGroup);
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

  formItemAttrs.push('isRequired={false}');

  if (rules.length > 0) {
    formItemAttrs.push(`rules={[${rules.join(',')}]}`);
  }
  const currentName = nameGroup.currentName || 'current';
  formItemAttrs.push(`preview={${currentName}.isPreview}`);

  return `<ElTableColumn
      prop="${nameGroup.propValue}"
      ${canEditable(property) ? 'type="editable" style="width: 300px"' : ''}
      ${!isBindEventLogicRef ? `ref="${nameGroup.viewElementTableColumn}"` : ''}
      slotHeader={
        <ElText text="${title}"></ElText>
      }
      slotDefault={
        (current) => <>${genEditComponent(
          entity,
          property,
          nameGroup,
          selectNameGroupMap,
          formItemAttrs,
          canEditable(property),
        )}</>
      }
      ${
        canEditable(property)
          ? `onEditChange={
          ${
            isBindEventLogicRef
              ? genEditChangeFunctionRef(property, nameGroup)
              : genEditChangeFunction(property, nameGroup)
          }
        }`
          : ''
      }
    >
  </ElTableColumn>`;
}

export function genTableColumnEditBlock(
  entity: naslTypes.Entity,
  property: naslTypes.EntityProperty,
  refElement: naslTypes.ViewElement,
  options: {
    nameGroup: NameGroup;
    selectNameGroupMap: Map<string, NameGroup>;
    isBindEventLogicRef: boolean;
    editable: boolean;
  },
) {
  const selectNameGroupMap = options?.selectNameGroupMap || new Map();
  const newLogics: Array<string> = [];
  if (property.relationEntity && selectNameGroupMap.size === 0) {
    const dataSource = entity.parentNode;
    const module = dataSource.app;
    const entitySet: Set<naslTypes.Entity> = new Set();
    entitySet.add(entity);
    const likeComponent = refElement?.likeComponent || refElement;
    // 有外键关联
    const relationEntity = dataSource?.findEntityByName(property.relationEntity);
    if (relationEntity) {
      const displayedProperty = getFirstDisplayedProperty(relationEntity);
      if (displayedProperty) {
        entitySet.add(relationEntity);
        const viewElementSelect = likeComponent.getViewElementUniqueName('el_select');
        const selectNameGroup = genUniqueQueryNameGroup(
          module,
          likeComponent,
          viewElementSelect,
          false,
          relationEntity.name,
        );
        selectNameGroup.viewElementSelect = viewElementSelect;
        // 存在多个属性关联同一个实体的情况，因此加上属性名用以唯一标识
        const key = [property.name, relationEntity.name].join('-');
        selectNameGroupMap.set(key, selectNameGroup);
        const newLogic = genQueryLogic([relationEntity], selectNameGroup, false, false, false);
        newLogics.push(newLogic);
      }
    }
  }

  return `
    export function view() {
        return ${genTableEditColumnTemplate(entity, property, options.nameGroup, selectNameGroupMap, {
          isBindEventLogicRef: options.isBindEventLogicRef,
          editable: options.editable,
        })}
    }
  ${
    newLogics.length > 0
      ? `export namespace app.logics {
          ${newLogics.join('\n')}
      }`
      : ''
  }
`;
}

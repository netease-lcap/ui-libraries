import {
  firstLowerCase,
} from './utils';

function genWhereExpression(entity) {
  const properties = entity.properties.filter((property) => property?.display.inFilter);
  const expressions = properties.map((property) => {
    if (!property.relationEntity && ['String', 'Text'].includes(property.typeAnnotation.typeName)) {
      return `LIKE(${entity.name}.${property.name}, filter.${property.name})`;
    }
    return `${entity.name}.${property.name} == filter.${property.name}`;
  });
  return expressions.join('&&');
}

export function genQueryLogic(allEntities, nameGroup, supportSort, supportFilter) {
  allEntities = Array.from(allEntities);
  const entity = allEntities.shift();
  if (!entity) {
    return '';
  }
  const namespace = entity.getNamespace();
  const entityLowerName = firstLowerCase(entity.name);
  return `export function ${nameGroup.logic}(page: Long, size: Long${supportSort ? ', sort: String, order: String' : ''}${supportFilter ? ', filter: any' : ''}) {
        let result;
        result = PAGINATE(FROM(${namespace}.${entity.name}, ${entity.name} => $
        ${allEntities.map((relationEntity) => {
    const onExpressions = entity.properties
      ?.filter((property) => property.relationEntity === relationEntity.name)
      .map((leftProperty) => {
        return `${entity.name}.${leftProperty.name} == ${relationEntity.name}.${leftProperty.relationProperty}`;
      }).join('\n');
    return `.LEFT_JOIN(${namespace}.${relationEntity.name}, ${relationEntity.name} => ON(() => ${onExpressions}))`;
  }).join('\n')}
  ${supportFilter ? `.WHERE(() => ${genWhereExpression(entity)})` : ''}
        ${supportSort ? '.ORDER_BY(() => [sort, order])' : ''}
        .SELECT(() => ({
            ${entityLowerName}: ${entity.name},
            ${allEntities.map((relationEntity) => `${firstLowerCase(relationEntity.name)}: relationEntity.name`).join(',')}
        }))), page, size)
        return result;
    }`;
}

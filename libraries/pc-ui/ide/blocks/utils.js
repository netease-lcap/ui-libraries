export const filterProperty = (key) => (property) => {
  if (property.display) {
    return property.display[key];
  }
  return !['id', 'createdTime', 'updatedTime'].includes(property.name);
};

export const firstUpperCase = (value) => value.replace(/^\S/, (letter) => letter.toUpperCase());
export const firstLowerCase = (value) => value.replace(/^\S/, (letter) => letter.toLowerCase());

export function transEntityMetadataTypes(typeAnnotation, app) {
  let { typeName: propertyTypeName } = typeAnnotation || {};
  if (typeAnnotation?.typeNamespace?.endsWith('.metadataTypes')) {
    const referenceNode = app.findNodeByCompleteName(`${typeAnnotation.typeNamespace}.${typeAnnotation.typeName}`) || {};
    const { typeName } = referenceNode.typeAnnotation || {};
    propertyTypeName = typeName;
  }
  return propertyTypeName;
}

export function getFirstDisplayedProperty(entity) {
  let property = entity.properties.find((property) => !property.readonly);
  if (!property) property = entity.properties[0];
  return property;
}

function capFirstLetter(word) {
  if (!word) return word;

  return word[0].toUpperCase() + word.slice(1);
}

/**
 * 生成数据查询唯一的命名组
 * @param viewName 页面名称
 * @param componentName 组件名称
 * @param suffix 其它后缀，比如实体名等等
 * @param defaultInView 是否在页面逻辑中用 load 简写
 */
export function genUniqueQueryNameGroup(
  scope,
  view,
  componentName,
  defaultInView,
  suffix,
) {
  const result = {};
  result.viewLogicLoad = view?.getLogicUniqueName?.(`load${defaultInView ? '' : capFirstLetter(componentName)}${suffix ? capFirstLetter(suffix) : ''}`);
  result.logic = scope?.getLogicUniqueName?.(
    `load${capFirstLetter(view.name)}${componentName ? capFirstLetter(componentName) : ''}${suffix ? capFirstLetter(suffix) : ''}`,
  );
  result.structure = scope?.getStructureUniqueName?.(firstUpperCase(`${result.logic}Structure`));
  return result;
}

export function getEntityPromaryKeyProperty(entity) {
  return entity.properties.find((p) => p.primaryKey)?.name || 'id';
}

import * as naslTypes from '@nasl/ast-mini';

export function genSelectBlock(enumNode: naslTypes.Enum, refElement: naslTypes.ViewElement) {
  const namespace = enumNode?.getNamespace() || '';
  const ideVersion = enumNode.app?.ideVersion;
  const valueField = ideVersion >= 4.3 ? 'item' : 'value';
  const name = enumNode?.name || '';
  const label = (enumNode.label || enumNode.name).replace(/"/g, '&quot;');
  const enumTypeAnnotationStr = `${namespace}.${name}`;
  return `export function view() {
    return <ElSelect
      clearable={true}
      placeholder="请选择${label}"
      textField="text"
      valueField="${valueField}"
      dataSource={nasl.util.EnumToList<${enumTypeAnnotationStr}>()}>
  </ElSelect>
  }`;
}

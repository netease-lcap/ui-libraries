import * as naslTypes from '@nasl/ast-mini';

export function genSelectBlock(enumNode: naslTypes.Enum, refElement: naslTypes.ViewElement) {
  const namespace = enumNode?.getNamespace() || '';
  const name = enumNode?.name || '';
  const label = (enumNode.label || enumNode.name).replace(/"/g, '&quot;');
  const enumTypeAnnotationStr = `${namespace}.${name}`;
  return `export function view() {
    return <ElSelectPro
      clearable={true}
      placeholder="请选择${label}"
      textField="text"
      valueField="value"
      dataSource={nasl.util.EnumToList<${enumTypeAnnotationStr}>()}>
  </ElSelectPro>
  }`;
}

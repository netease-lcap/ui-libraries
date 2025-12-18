import * as naslTypes from '@nasl/ast-mini';

export function genSelectBlock(enumNode: naslTypes.Enum, refElement: naslTypes.ViewElement) {
  const namespace = enumNode?.getNamespace() || '';
  const name = enumNode?.name || '';
  const label = (enumNode.label || enumNode.name).replace(/"/g, '&quot;');
  const enumTypeAnnotationStr = `${namespace}.${name}`;
  return `export function view() {
    return <VanPicker
        placeholder="请选择"
        dataSource={nasl.util.EnumToList<${enumTypeAnnotationStr}>()}
        valueField="item"
        slotTitle={
          <VanText text="请选择${label}"></VanText>
        }>
      </VanPicker>
  }`;
}

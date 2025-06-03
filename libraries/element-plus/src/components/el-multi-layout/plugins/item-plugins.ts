/* 组件功能扩展插件 */
export function handleLayout(props) {
  const myClass = props.get('class', '');
  return {
    class: `${myClass} el-multi-layout-item`,
  };
}

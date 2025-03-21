import * as ElementPlusIconsVue from '@element-plus/icons-vue';

export function handleIcon(props) {
  const clearIcon = props.get('clearIcon');
  const prefixIcon = props.get('prefixIcon');

  return {
    clearIcon: clearIcon ? ElementPlusIconsVue[clearIcon] : null,
    prefixIcon: prefixIcon ? ElementPlusIconsVue[prefixIcon] : null,
  };
}

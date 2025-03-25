import * as ElementPlusIconsVue from '@element-plus/icons-vue';

export function handleIcon(props) {
  const clearIcon = props.get('clearIcon');
  const prefixIcon = props.get('prefixIcon');

  return {
    clearIcon: clearIcon ? ElementPlusIconsVue[clearIcon] : null,
    prefixIcon: prefixIcon ? ElementPlusIconsVue[prefixIcon] : null,
  };
}

export { handleComponentInForm } from '@/components/el-form/plugins/form-item';
export { handleControllableValue } from '@/plugins/common/index';

export function handleTagName() {
  return {
    formTagName: 'el-form-time-select',
  };
}

export { handleComponentInForm } from '@/components/el-form/plugins/form-item';
export { handleControllableValue } from '@/plugins/common/index';
export * from './ide';

export function handleColor(props) {
  const lowColor = props.get('lowColor', '#F7BA2A');
  const mediumColor = props.get('mediumColor', '#F7BA2A');
  const highColor = props.get('highColor', '#F7BA2A');
  const colors = [lowColor, mediumColor, highColor];
  return {
    colors,
  };
}

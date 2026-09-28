import { $ide } from '@/plugins/constants';

export function handleBackTopShow(props) {
  const nodePath = props.get('data-nodepath');
  const classProps = props.get('class');
  if (nodePath) {
    return {
      class: classProps ? `van-back-top--active ${classProps}` : 'van-back-top--active',
    };
  }
  return {};
}
handleBackTopShow.type = $ide;

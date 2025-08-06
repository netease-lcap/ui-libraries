import { $ide } from '@/plugins/constants';

export function handleBackTopShow(props) {
  const nodePath = props.get('data-nodepath');
  if (nodePath) {
    return {
      class: 'van-back-top--active',
    };
  }
  return {};
}
handleBackTopShow.type = $ide;

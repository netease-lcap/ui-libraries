import { $ide } from '@/plugins/constants';

export function handlekey(props: any) {
  const nodePath = props.get('data-nodepath');
  if (nodePath) {
    let key = props.get('key');
    key = `${key} ${(Math.random() * 100).toFixed(0)}`;
    return {
      key,
    };
  }
  return {};
}
handlekey.type = $ide;

import { ElIcon } from '../../index';

export function handleIcon(props) {
  const icon = props.get('icon');
  const slots = props.get('slots');
  if (!icon) return {};

  const iconSlot = {
    icon: () => {
      return <ElIcon name={icon} />;
    },
  };

  return {
    slots: {
      ...slots,
      ...iconSlot,
    },
  };
}

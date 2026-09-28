import { useCallback } from '@/plugins/hooks';
import VanIcon from '@/components/van-icon';

export function handleRightIcon(props) {
  const rightIcon = props.get('rightIcon');
  const slots = props.get('slots');
  const getRightIcon = useCallback(() => {
    if (rightIcon) {
      return {
        'right-icon': () => <VanIcon name={rightIcon} class="van-collapse-item__right-icon" />,
      };
    }
    return {};
  }, [rightIcon]);
  return {
    slots: {
      ...slots,
      ...getRightIcon(),
    },
  };
}

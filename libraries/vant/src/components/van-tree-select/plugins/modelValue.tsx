import { useMemo, useControllableValue } from '@/plugins/hooks';

/**
 * 处理modelValue
 * @param props 属性
 * @returns 属性
 */
export function handleModelValue(props) {
  const multiple = props.get('multiple');
  const [activeId, setActiveId] = useControllableValue(props, {
    valuePropName: 'activeId',
  });
  const currentActiveId = useMemo(() => {
    if (multiple) {
        if (Array.isArray(activeId)) {
            return activeId;
        }
        return (activeId && [activeId]) || [];
    }
    if (Array.isArray(activeId)) {
        return activeId[0];
    }
    return activeId || null;
  }, [activeId, multiple]);
  const [mainActiveIndex, setMainActiveIndex] = useControllableValue(props, {
    valuePropName: 'mainActiveIndex',
  });
  const currentMainActiveIndex = useMemo(() => {
    return mainActiveIndex || null;
  }, [mainActiveIndex]);
  return {
    activeId: currentActiveId,
    mainActiveIndex: currentMainActiveIndex,
    'onUpdate:activeId': (value) => {
      setActiveId(value);
    },
    'onUpdate:mainActiveIndex': (value) => {
      setMainActiveIndex(value);
    },
  };
}
handleModelValue.order = 1;

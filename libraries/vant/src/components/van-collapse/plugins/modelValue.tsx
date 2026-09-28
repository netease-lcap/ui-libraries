import { useMemo, useControllableValue } from '@/plugins/hooks';

/**
 * 处理modelValue
 * @param props 属性
 * @returns 属性
 */
export function handleModelValue(props) {
    const [value, setValue] = useControllableValue(props);
    const accordion = props.get('accordion');
    const currentValue = useMemo(() => {
        if (accordion) {
            return Array.isArray(value) ? value[0] : value;
        }
        if (Array.isArray(value)) {
            return value;
        }
        return (value && [value]) || [];
    }, [value, accordion]);
    return {
        modelValue: currentValue,
        'onUpdate:modelValue': (value) => {
            setValue(value);
        },
    };
}
handleModelValue.order = 1;

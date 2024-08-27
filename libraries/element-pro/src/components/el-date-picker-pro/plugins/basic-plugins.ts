import { NaslComponentPluginOptions } from '@lcap/vue2-utils';
import { usePlaceholder } from '../hooks';

/* 组件功能扩展插件 */
export const useExtendsPlugin: NaslComponentPluginOptions = {
  props: [
    'range', 'inputAutoWidth', 'inputAlign',
    'placeholderRight', 'startTime', 'endTime',
    'maxTime', 'minTime',
  ],
  setup(props) {
    const { useComputed } = props;
    const placeholder = usePlaceholder(props, '请选择日期');

    const inputProps = useComputed<any>([
      'inputAutoWidth',
      'inputAlign',
    ], (
      inputAutoWidth = false,
      inputAlign = 'left',
    ) => {
      return {
        autoWidth: inputAutoWidth,
        align: inputAlign,
      };
    });

    return {
      placeholder,
      inputProps,
    };
  },
};

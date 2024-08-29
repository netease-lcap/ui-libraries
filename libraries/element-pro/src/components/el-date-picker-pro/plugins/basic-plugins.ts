import { NaslComponentPluginOptions, $render } from '@lcap/vue2-utils';
import { DateRangeValue, DateRangePicker, DateValue } from '@element-pro';
import {
  usePlaceholder,
  useDatePickerValue,
  useContextEvents,
  useDisableDate,
  getChangeEventByValue,
  usePresets,
  useInputProps,
} from '../hooks';

const DEFAULT_FORMAT = 'YYYY-MM-DD';

/* 组件功能扩展插件 */
export const useExtendsPlugin: NaslComponentPluginOptions = {
  props: [
    'range', 'autoWidth', 'align',
    'placeholderRight', 'startTime', 'endTime',
    'maxTime', 'minTime', 'enablePresets',
  ],
  setup(props) {
    const placeholder = usePlaceholder(props, '请选择日期');
    const { value, changeValue } = useDatePickerValue(props, DEFAULT_FORMAT);
    const events = useContextEvents(props, DEFAULT_FORMAT);
    const disableDate = useDisableDate(props, DEFAULT_FORMAT);
    const presets = usePresets(props);
    const inputProps = useInputProps(props);

    return {
      value,
      placeholder,
      inputProps,
      disableDate,
      presets,
      ...events,
      onChange: (v: DateValue | DateRangeValue, context) => {
        const [range] = props.get<[boolean]>(['range']);
        const onChange = props.get<any>('onChange') || (() => {});
        const changeEvent = getChangeEventByValue(v, range, DEFAULT_FORMAT);
        changeValue(context.dayjsValue, v);
        onChange({
          ...changeEvent,
          trigger: context.trigger,
        });
      },
      [$render]: (resultVNode, h, context) => {
        const range = props.getEnd('range') || false;

        if (!range) {
          return resultVNode;
        }

        delete context.propsData.props.inputProps;
        if (!context.propsData.props.rangeInputProps) {
          context.propsData.props.rangeInputProps = {};
        }
        context.propsData.props.rangeInputProps.inputProps = inputProps.value;

        return h(DateRangePicker, context.propsData, context.childrenNodes);
      },
    };
  },
};

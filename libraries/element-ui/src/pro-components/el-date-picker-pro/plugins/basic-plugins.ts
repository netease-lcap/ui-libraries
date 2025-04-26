import { CreateElement } from 'vue';
import { NaslComponentPluginOptions, $render } from '@lcap/vue2-utils';
import { DateRangeValue, DateRangePicker, DateValue, DateMultipleValue } from '@element-pro';
import {
  usePlaceholder,
  useDatePickerValue,
  useContextEvents,
  useDisableDate,
  getChangeEventByValue,
  usePresets,
} from '../hooks';

export { useFormFieldClass } from '../../../plugins/use-form-field-class';
export { usePopupTheme } from '../../../plugins/use-popup-theme';

const DEFAULT_FORMAT = 'YYYY-MM-DD';

/* 组件功能扩展插件 */
export const useExtendsPlugin: NaslComponentPluginOptions = {
  props: [
    'range', 'autoWidth', 'align',
    'placeholderRight', 'startValue', 'endValue',
    'maxTime', 'minTime', 'enablePresets',
    'multiple', 'prefixIcon', 'suffixIcon',
  ],
  setup(props) {
    const valueFormat = props.useComputed('converter', (v) => {
      if (!v || v === 'format') {
        return DEFAULT_FORMAT;
      }

      return v;
    });

    const placeholder = usePlaceholder(props, '请选择日期');
    const { value, changeValue } = useDatePickerValue(props, valueFormat);
    const events = useContextEvents(props, valueFormat);
    const disableDate = useDisableDate(props, DEFAULT_FORMAT);
    const presets = usePresets(props);

    const inputProps = props.useComputed<any>([
      'autoWidth',
      'align',
      'prefixIcon',
      'suffixIcon',
    ], (
      autoWidth = false,
      align = 'left',
      prefixIcon = 'el-icon-date',
      suffixIcon,
    ) => {
      const inputStyleProps: any = {
        autoWidth,
        align,
      };

      if (prefixIcon) {
        inputStyleProps.prefixIcon = (h: CreateElement) => h('el-icon', { attrs: { name: prefixIcon }, class: 'el-p-icon' });
      }

      if (suffixIcon) {
        inputStyleProps.suffixIcon = (h: CreateElement) => h('el-icon', { attrs: { name: suffixIcon }, class: 'el-p-icon' });
      }

      return inputStyleProps;
    });

    return {
      value,
      placeholder,
      inputProps,
      disableDate,
      presets,
      ...events,
      onChange: (v: DateValue | DateRangeValue | DateMultipleValue, context) => {
        const [range] = props.get<[boolean]>(['range']);
        const onChange = props.get<any>('onChange') || (() => {});
        const changeEvent = getChangeEventByValue(v, range, valueFormat, props.get<boolean>('multiple'));
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
        const { prefixIcon, suffixIcon, ...reset } = inputProps.value;
        context.propsData.props.rangeInputProps.inputProps = reset;
        context.propsData.props.rangeInputProps.prefixIcon = prefixIcon;
        context.propsData.props.rangeInputProps.suffixIcon = suffixIcon;

        return h(DateRangePicker, context.propsData, context.childrenNodes);
      },
    };
  },
};

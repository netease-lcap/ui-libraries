import { NaslComponentPluginOptions } from '@lcap/vue2-utils/plugins';

/* 组件功能扩展插件 */
export { useVModelSync } from '@lcap/vue2-utils/plugins/index';

const PickerOptionsProps = ['useShortcuts', 'firstDayOfWeek', 'maxDate', 'minDate', 'onPick'];
const DefaultShortcuts = [{
  text: '今天',
  onClick(picker) {
    picker.$emit('pick', new Date());
  },
}, {
  text: '昨天',
  onClick(picker) {
    const date = new Date();
    date.setTime(date.getTime() - 3600 * 1000 * 24);
    picker.$emit('pick', date);
  },
}, {
  text: '一周前',
  onClick(picker) {
    const date = new Date();
    date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
    picker.$emit('pick', date);
  },
}];
const DefaultRangeShortcuts = [{
  text: '最近一周',
  onClick(picker) {
    const end = new Date();
    const start = new Date();
    start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
    picker.$emit('pick', [start, end]);
  },
}, {
  text: '最近一个月',
  onClick(picker) {
    const end = new Date();
    const start = new Date();
    start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
    picker.$emit('pick', [start, end]);
  },
}, {
  text: '最近三个月',
  onClick(picker) {
    const end = new Date();
    const start = new Date();
    start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
    picker.$emit('pick', [start, end]);
  },
}];
export const usePickerOptions: NaslComponentPluginOptions = {
  props: PickerOptionsProps,
  setup(props) {
    console.log(props, 'props-------', props.get('type'));
    const dateType = props.get('type');
    const isRange = ['datetimerange', 'daterange'].some((item) => item === dateType);
    const DefaultShortcutsValue = isRange ? DefaultRangeShortcuts : DefaultShortcuts;
    const pickerOptions = props.useComputed(PickerOptionsProps, (useShortcuts: boolean, firstDayOfWeek: number, maxDate: string, minDate: string) => {
      return {
        // 配置开启快捷选项
        shortcuts: useShortcuts ? DefaultShortcutsValue : undefined,

        // 根据 minDate maxDate 生成禁用函数,
        disabledDate: (time) => {
          if (maxDate && time.getTime() > new Date(maxDate).getTime()) {
            return true;
          }
          if (minDate && time.getTime() < new Date(minDate).getTime()) {
            return true;
          }

          return false;
        },
        firstDayOfWeek: firstDayOfWeek || 7,
        // onPick,
      };
    });

    return {
      pickerOptions,
    };
  },
  order: 3,
};

export const useTransferChange: NaslComponentPluginOptions = {
  setup: (props) => {
    return {
      onChange: (value) => {
        console.log(value, 'value999999');
        // 获取当前绑定 change 事件
        const onChange = props.get('onChange');

        if (typeof onChange === 'function') {
          onChange({
            value,
          });
        }
      },
    };
  },
  order: 2,
};

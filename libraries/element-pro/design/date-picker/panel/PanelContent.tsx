import { defineComponent, PropType } from '@vue/composition-api';
import { usePrefixClass } from '../../hooks/useConfig';
import type { ElDatePickerProps } from '../type';

import ElDateHeader from '../base/Header';
import ElDateTable from '../base/Table';
import ElTimePickerPanel from '../../time-picker/panel/time-picker-panel';
import { getDefaultFormat } from '../../_common/js/date-picker/format';

export default defineComponent({
  name: 'ElPanelContent',
  props: {
    mode: String as PropType<ElDatePickerProps['mode']>,
    format: String as PropType<ElDatePickerProps['format']>,
    enableTimePicker: Boolean as PropType<ElDatePickerProps['enableTimePicker']>,
    timePickerProps: {
      type: Object as PropType<ElDatePickerProps['timePickerProps']>,
      default: () => ({}),
    },
    value: [String, Number, Array, Date],
    year: Number,
    month: Number,
    tableData: Array,
    time: String,
    popupVisible: Boolean,
    firstDayOfWeek: Number,
    partial: String,
    onYearChange: Function,
    onMonthChange: Function,
    onJumperClick: Function,
    onCellMouseEnter: Function,
    onCellClick: Function,
    onCellMouseLeave: Function,
    onTimePickerChange: Function,
  },
  setup(props) {
    const COMPONENT_NAME = usePrefixClass('date-picker__panel');

    const { timeFormat } = getDefaultFormat({
      mode: props.mode,
      format: props.format,
      enableTimePicker: props.enableTimePicker,
    });

    return { COMPONENT_NAME, timeFormat };
  },
  render() {
    const { COMPONENT_NAME, timeFormat } = this;

    return (
      <div class={`${COMPONENT_NAME}-content`}>
        <div class={`${COMPONENT_NAME}-${this.mode}`}>
          <ElDateHeader
            {...{
              props: {
                mode: this.mode,
                year: this.year,
                month: this.month,
                onMonthChange: (val: number) => this.onMonthChange?.(val, { partial: this.partial }),
                onYearChange: (val: number) => this.onYearChange?.(val, { partial: this.partial }),
                onJumperClick: ({ trigger }: { trigger: string }) => this.onJumperClick?.({ trigger, partial: this.partial }),
              },
            }}
          />

          <ElDateTable
            {...{
              props: {
                mode: this.mode,
                data: this.tableData,
                time: this.time,
                value: this.value,
                format: this.format,
                firstDayOfWeek: this.firstDayOfWeek,
                onCellClick: (date: Date, { e }: { e: MouseEvent }) => this.onCellClick?.(date, { e, partial: this.partial }),
                onCellMouseEnter: (date: Date) => this.onCellMouseEnter?.(date, { partial: this.partial }),
                onCellMouseLeave: this.onCellMouseLeave,
              },
            }}
          />
        </div>

        {this.enableTimePicker && (
          <div class={`${COMPONENT_NAME}-time`}>
            <div class={`${COMPONENT_NAME}-time-viewer`}>{this.time}</div>
            <ElTimePickerPanel
              {...{
                key: this.partial,
                props: {
                  position: this.partial,
                  format: timeFormat,
                  value: this.time,
                  onChange: this.onTimePickerChange,
                  isShowPanel: this.popupVisible,
                  ...this.timePickerProps,
                },
              }}
            />
          </div>
        )}
      </div>
    );
  },
});

import { defineComponent, PropType, computed } from '@vue/composition-api';
import ElDateFooter from '../base/Footer';
import type { ElDatePickerProps, ElDateRangePickerProps, DateValue } from '../type';

export default defineComponent({
  name: 'ElExtraContent',
  props: {
    presets: Object as PropType<ElDatePickerProps['presets'] | ElDateRangePickerProps['presets']>,
    enableTimePicker: Boolean as PropType<ElDatePickerProps['enableTimePicker']>,
    presetsPlacement: String as PropType<ElDatePickerProps['presetsPlacement']>,
    onPresetClick: Function,
    onConfirmClick: Function,
    // 支持时间戳模式：时间戳为Number类型
    selectedValue: [String, Number] as PropType<DateValue>,
  },
  setup(props) {
    const showPanelFooter = computed(() => props.enableTimePicker || props.presets);
    return { showPanelFooter };
  },
  render() {
    const { showPanelFooter } = this;

    return showPanelFooter ? (
      <ElDateFooter
        {...{
          props: {
            presets: this.presets,
            onPresetClick: this.onPresetClick,
            enableTimePicker: this.enableTimePicker,
            onConfirmClick: this.onConfirmClick,
            presetsPlacement: this.presetsPlacement,
            selectedValue: this.selectedValue,
          },
        }}
      />
    ) : null;
  },
});

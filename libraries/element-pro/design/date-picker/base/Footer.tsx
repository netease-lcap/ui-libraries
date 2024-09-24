import { defineComponent, computed } from '@vue/composition-api';
import { useConfig, usePrefixClass } from '../../hooks/useConfig';
import ElButton from '../../button';

export default defineComponent({
  name: 'ElDatePickerTable',
  props: {
    enableTimePicker: Boolean,
    presetsPlacement: String,
    presets: Object,
    selectedValue: [Date, String, Number],
    onPresetClick: Function,
    onConfirmClick: Function,
  },
  setup(props) {
    const COMPONENT_NAME = usePrefixClass('date-picker__footer');
    const presetsClass = usePrefixClass('date-picker__presets');
    const { t, global } = useConfig('datePicker');

    const footerClass = computed(() => [COMPONENT_NAME.value, `${COMPONENT_NAME.value}--${props.presetsPlacement}`]);

    return {
      footerClass,
      presetsClass,
      global,
      t,
    };
  },
  render() {
    const {
      footerClass, presetsClass, global, t,
    } = this;

    return (
      <div class={footerClass}>
        {
          <div class={presetsClass}>
            {this.presets
              && Object.keys(this.presets).map((key: string) => (
                <ElButton
                  key={key}
                  size="small"
                  variant="text"
                  onClick={(e: MouseEvent) => this.onPresetClick?.(this.presets[key], { e, preset: { [key]: this.presets[key] } })
                  }
                >
                  {key}
                </ElButton>
              ))}
          </div>
        }
        {this.enableTimePicker && (
          <ElButton
            {...{
              props: {
                size: 'small',
                theme: 'primary',
                disabled: !this.selectedValue,
                onClick: (e: MouseEvent) => this.onConfirmClick?.({ e }),
              },
            }}
          >
            {t(global.confirm)}
          </ElButton>
        )}
      </div>
    );
  },
});

import {
  defineComponent, PropType, ref, watch,
} from '@vue/composition-api';
import props from '../props';
import { COLOR_MODES } from '../const';
import { RadioGroup as ElRadioGroup, RadioButton as ElRadioButton } from '../../radio';
import { ElColorHandler, ElColorModes } from '../interfaces';
import { useBaseClassName } from '../hooks';

export default defineComponent({
  name: 'PanelHeader',
  components: {
    ElRadioGroup,
    ElRadioButton,
  },
  props: {
    ...props,
    mode: {
      type: String as PropType<ElColorModes>,
      default: 'color',
    },
    togglePopup: {
      type: Function as PropType<ElColorHandler>,
    },
    handleModeChange: {
      type: Function as PropType<ElColorHandler>,
      default: () => () => {},
    },
  },
  setup(props) {
    const baseClassName = useBaseClassName();
    const modeValue = ref(props.mode);
    watch(
      () => props.mode,
      (v) => {
        modeValue.value = v;
      },
    );
    return {
      baseClassName,
      modeValue,
    };
  },
  render() {
    if (this.colorModes?.length === 1) {
      return null;
    }
    const { baseClassName } = this;
    return (
      <div class={`${baseClassName}__head`}>
        <div class={`${baseClassName}__mode`}>
          {this.colorModes?.length === 1 ? (
            COLOR_MODES[this.colorModes[0]]
          ) : (
            <el-radio-group
              variant="default-filled"
              size="small"
              disabled={this.disabled}
              v-model={this.modeValue}
              onChange={this.handleModeChange}
            >
              {Object.keys(COLOR_MODES).map((key) => (
                <el-radio-button key={key} value={key}>
                  {COLOR_MODES[key]}
                </el-radio-button>
              ))}
            </el-radio-group>
          )}
        </div>
      </div>
    );
  },
});

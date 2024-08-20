import {
  defineComponent, PropType, ref, watch,
} from '@vue/composition-api';
import upperCase from 'lodash/upperCase';
import { ElColorHandler } from '../../../color-picker/interfaces';
import { ElColorPickerProps } from '../../type';
import props from '../../props';
import { FORMATS } from '../../const';
import { Color } from '../../utils';
import { Select as ElSelect, Option as ElOption } from '../../../select';
import { Input as ElInput } from '../../../input';
import FormatInputs from './inputs';
import { useBaseClassName } from '../../hooks';

export default defineComponent({
  name: 'FormatPanel',
  components: {
    ElSelect,
    ElInput,
    ElOption,
    FormatInputs,
  },
  inheritAttrs: false,
  props: {
    ...props,
    color: {
      type: Object as PropType<Color>,
    },
    handleFormatModeChange: {
      type: Function as PropType<ElColorHandler>,
      default: () => () => {},
    },
    handleFormatInputChange: {
      type: Function as PropType<ElColorHandler>,
      default: () => () => {},
    },
  },
  setup(props) {
    const baseClassName = useBaseClassName();
    const formatModel = ref<ElColorPickerProps['format']>(props.format);
    watch(
      () => [props.format],
      () => (formatModel.value = props.format),
    );

    /**
     * 格式化类型改变触发
     * @param v
     */
    const handleModeChange = (v: ElColorPickerProps['format']) => {
      formatModel.value = v;
      props.handleFormatModeChange(v);
    };

    return {
      formatModel,
      baseClassName,
      handleModeChange,
    };
  },
  render(h) {
    const formats: ElColorPickerProps['format'][] = [...FORMATS];
    const { baseClassName, handleModeChange } = this;
    const newProps = {
      ...this.$props,
      format: this.formatModel,
    };
    const selectInputProps = {
      ...((this.selectInputProps as Object) || {}),
    };
    return (
      <div class={`${baseClassName}__format`}>
        <div class={`${baseClassName}__format--item`}>
          <el-select
            size="small"
            class={`${baseClassName}__format-mode-select`}
            {...selectInputProps}
            popupProps={{
              overlayClassName: `${baseClassName}__select-options`,
            }}
            v-model={this.formatModel}
            onChange={handleModeChange}
            disabled={this.disabled}
          >
            {formats.map((item) => (
              <el-option key={item} value={item} label={upperCase(item)} style={{ fontSize: '12px' }} />
            ))}
          </el-select>
        </div>
        <div class={`${baseClassName}__format--item`}>
          {h('format-inputs', {
            props: newProps,
          })}
        </div>
      </div>
    );
  },
});

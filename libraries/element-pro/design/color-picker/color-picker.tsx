import { defineComponent, ref, toRefs } from '@vue/composition-api';
import useVModel from '../hooks/useVModel';
import { renderElNodeJSXDefault } from '../utils/render-tnode';
import props from './props';
import { Popup as ElPopup } from '../popup';
import ColorPanel from './panel';
import DefaultTrigger from './trigger';
import { ElColorContext } from './interfaces';
import { useBaseClassName } from './hooks';

export default defineComponent({
  name: 'ElColorPicker',
  components: {
    ElPopup,
    ColorPanel,
    DefaultTrigger,
  },
  props: {
    ...props,
  },
  setup(props) {
    const baseClassName = useBaseClassName();
    const visible = ref(false);
    const setVisible = (value: boolean) => (visible.value = value);

    const { value } = toRefs(props);
    const [innerValue, setInnerValue] = useVModel(value, props.defaultValue, props.onChange, 'change');

    const handleChange = (value: string, context: ElColorContext) => {
      setInnerValue(value, context);
    };

    const handlePaletteChange = (context: ElColorContext) => {
      props.onPaletteBarChange(context);
    };

    return {
      baseClassName,
      innerValue,
      visible,
      setVisible,
      setInnerValue,
      handleChange,
      handlePaletteChange,
    };
  },
  render() {
    const {
      popupProps, disabled, innerValue, baseClassName, setVisible, handleChange, handlePaletteChange,
    } = this;

    const renderPopupContent = () => {
      if (disabled) {
        return null;
      }
      return (
        <color-panel
          {...{
            props: {
              ...this.$props,
              value: innerValue,
            },
          }}
          togglePopup={setVisible}
          on={{ change: handleChange, handlePaletteChange }}
          ref="refColorPanel"
        />
      );
    };

    const popProps = {
      placement: 'bottom-left',
      trigger: 'click',
      attach: 'body',
      overlayClassName: [baseClassName],
      visible: this.visible,
      overlayInnerStyle: {
        padding: 0,
      },
      onVisibleChange: (
        visible: boolean,
        context: {
          trigger: string;
        },
      ) => {
        if (context.trigger === 'document') {
          this.setVisible(false);
        }
      },
      ...((popupProps as any) || {}),
    };

    return (
      <el-popup
        {...{
          props: {
            ...popProps,
          },
        }}
        content={renderPopupContent}
      >
        <div class={`${baseClassName}__trigger`} onClick={() => setVisible(!this.visible)}>
          {renderElNodeJSXDefault(
            this,
            'default',
            <default-trigger
              borderless={this.borderless}
              color={this.innerValue}
              disabled={disabled}
              clearable={this.clearable}
              input-props={this.inputProps}
              handleTriggerChange={this.setInnerValue}
              size={this.size}
            />,
          )}
        </div>
      </el-popup>
    );
  },
});

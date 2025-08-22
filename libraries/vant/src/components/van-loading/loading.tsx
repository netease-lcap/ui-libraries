import { defineComponent, ref, watch } from 'vue';
import { Loading as VantLoading, Icon } from 'vant';

export default defineComponent({
  name: 'VanLoading',
  props: {
    isLoading: {
      type: Boolean,
      default: false,
    },
    color: {
      type: String,
      default: '#c9c9c9',
    },
    type: {
      type: String,
      default: 'circular',
    },
    icon: {
      type: String,
      default: '',
    },
    size: {
      type: [Number, String],
      default: '30px',
    },
    textSize: {
      type: [Number, String],
      default: '14px',
    },
    textColor: {
      type: String,
      default: '#c9c9c9',
    },
    vertical: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { slots, expose }) {
    const isLoading = ref(props.isLoading);

    watch(
      () => props.isLoading,
      (newVal) => {
        isLoading.value = newVal;
      },
      { immediate: true },
    );

    const show = () => {
      isLoading.value = true;
    };
    const hide = () => {
      isLoading.value = false;
    };

    expose({
      show,
      hide,
    });
    return () => (
      <div style={{ position: 'relative' }}>
        {slots.default?.()}
        <VantLoading
          v-show={isLoading.value}
          color={props.color}
          type={props.type}
          size={props.size}
          textSize={props.textSize}
          textColor={props.textColor}
          vertical={props.vertical}
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
          v-slots={{
            // TODO LD: 换成 cw 的图标组件
            icon: props.icon ? () => <Icon name={props.icon} size={props.size} /> : null,
            default: slots.loadingText,
          }}
        />
      </div>
    );
  },
});

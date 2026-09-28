import { defineComponent, inject, PropType, KeepAlive } from 'vue';
import { RouterView } from 'vue-router';
import _ from 'lodash';

function useIsDesigner() {
  const injectedDesigner = inject<boolean>('VUE_APP_DESIGNER', false);
  return Boolean(
    injectedDesigner || _.get(window, '$uilibenv.IDE_DESIGNER', false) || _.get(window, '$env.VUE_APP_DESIGNER', false),
  );
}

export default defineComponent({
  name: 'ElRouterView',
  props: {
    designer: { type: Boolean, default: true },
    disableKeepAlive: { type: Boolean, default: true },
    keepAliveInclude: { type: [Array, String, RegExp] as PropType<string | RegExp | (string | RegExp)[]> },
    keepAliveExclude: { type: [Array, String, RegExp] as PropType<string | RegExp | (string | RegExp)[]> },
    keepAliveMax: { type: Number },
  },
  setup(props) {
    const inAbsoluteLayout = inject<boolean>('inAbsoluteLayout', false);
    const isDesigner = useIsDesigner();

    return () => {
      if (props.disableKeepAlive) {
        return <RouterView />;
      }

      return (
        <RouterView
          v-slots={{
            default: ({ Component }) => (Component ? (
              <KeepAlive include={props.keepAliveInclude} exclude={props.keepAliveExclude} max={props.keepAliveMax}>
                {Component}
              </KeepAlive>
              ) : null),
          }}
        />
      );
    };
  },
});

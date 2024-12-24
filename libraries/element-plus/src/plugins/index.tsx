import { ref } from 'vue';
import create from 'zustand-vue';

export function registerComponet(Component, options) {
  return {
    name: 'HocBaseComponents',
    components: { Component },
    setup(props, { attrs, slots }) {
      const componentRef = ref(null);
      return () => (
        <Component
          {...props}
          {...attrs}
          v-slots={slots}
          ref={componentRef}
        />
      );
    },
  };
}

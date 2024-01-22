/**
 * Use scopedSlots in Vue 2.6+
 * downgrade to slots in lower version
 */
export const SlotsMixin = {
  methods: {
    slots(name = 'default', props) {
      const { $slots, $scopedSlots } = this;
      const scopedSlot = $scopedSlots[name];

      if (scopedSlot) {
        return scopedSlot(props);
      }

      return $slots[name];
    },
    inDesigner() {
      // 开发态
      if (process.env.NODE_ENV !== 'production') {
        const searchParams = new URLSearchParams(window.location.search);
        // eslint-disable-next-line eqeqeq
        return searchParams.get('VUE_APP_DESIGNER') == 1;
      }

      return this.$env && this.$env.VUE_APP_DESIGNER;
    }
  },
};

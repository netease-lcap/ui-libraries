import { watch, computed } from 'vue';

export function name(props) {
  const set = props((state) => state.set);
  const slots = props((state) => state.slots);
  const type = props((state) => state.type);
  // const list = slots.default();
  const list = computed(() => slots.default());
  watch(type, (newVal, oldVal) => {
    console.log(newVal, '===newVal');
  });
  console.log(type.value, '==list');
  // props.set({ type: 'card' });
  // set({ type: 'card' });
}

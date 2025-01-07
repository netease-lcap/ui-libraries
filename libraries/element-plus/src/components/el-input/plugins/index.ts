import { watch } from 'vue';
import _ from 'lodash';

export function handleValue(props) {
  const setvalue = props((state) => state.setvalue);
  const emit = props((state) => state.emit);
  const propsValue = props((state) => state.value);
  const set = props((state) => state.set);
  const onInputProps = props((state) => state.onInput);
  watch(
    propsValue,
    (value) => {
      setvalue((state) => ({ state: { ...state.state, modelValue: value } }));
    },
    { immediate: true },
  );
  const onChange = (e) => {
    emit('update:value', e);
    if (propsValue.value === undefined) {
      setvalue((state) => ({ state: { ...state.state, modelValue: value } }));
    }
    return e;
  };
  watch(
    onInputProps,
    (value) => {
      set({ onInput: _.flow([onChange, value]) });
    },
    { immediate: true },
  );
  setvalue((state) => ({ deleteList: [...state.deleteList, 'value'] }));
}

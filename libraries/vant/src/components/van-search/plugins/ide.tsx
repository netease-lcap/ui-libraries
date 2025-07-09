import { defineComponent, h } from 'vue';
import { Search } from 'vant';

export default defineComponent({
  name: 'VanSearchIDE',
  props: {
    modelValue: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: '请输入搜索关键词',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    clearable: {
      type: Boolean,
      default: true,
    },
    clearTrigger: {
      type: String,
      default: 'focus',
    },
    inputAlign: {
      type: String,
      default: 'left',
    },
    iconAlign: {
      type: String,
      default: 'left',
    },
    shape: {
      type: String,
      default: 'square',
    },
    background: {
      type: String,
      default: '#f7f8fa',
    },
    maxlength: {
      type: Number,
      default: undefined,
    },
    autofocus: {
      type: Boolean,
      default: false,
    },
    actionText: {
      type: String,
      default: '',
    },
    showAction: {
      type: Boolean,
      default: false,
    },
    autocomplete: {
      type: Boolean,
      default: false,
    },
    spellcheck: {
      type: Boolean,
      default: false,
    },
  },
  emits: [
    'update:modelValue',
    'search',
    'input',
    'focus',
    'blur',
    'icon-search',
    'click-input',
    'clear',
    'action',
  ],
  setup(props, { emit }) {
    const handleInput = (value: string) => {
      emit('update:modelValue', value);
      emit('input', value);
    };

    const handleSearch = (value: string) => {
      emit('search', value);
    };

    const handleFocus = (event: any) => {
      emit('focus', event);
    };

    const handleBlur = (event: any) => {
      emit('blur', event);
    };

    const handleIconSearch = (event: any) => {
      emit('icon-search', event);
    };

    const handleClickInput = (event: any) => {
      emit('click-input', event);
    };

    const handleClear = (event: any) => {
      emit('clear', event);
    };

    const handleAction = (event: any) => {
      emit('action', event);
    };

    return () => h(Search, {
      modelValue: props.modelValue,
      placeholder: props.placeholder,
      disabled: props.disabled,
      readonly: props.readonly,
      clearable: props.clearable,
      clearTrigger: props.clearTrigger,
      inputAlign: props.inputAlign,
      iconAlign: props.iconAlign,
      shape: props.shape,
      background: props.background,
      maxlength: props.maxlength,
      autofocus: props.autofocus,
      actionText: props.actionText,
      showAction: props.showAction,
      autocomplete: props.autocomplete,
      spellcheck: props.spellcheck,
      onInput: handleInput,
      onSearch: handleSearch,
      onFocus: handleFocus,
      onBlur: handleBlur,
      onIconSearch: handleIconSearch,
      onClickInput: handleClickInput,
      onClear: handleClear,
      onAction: handleAction,
    });
  },
}); 
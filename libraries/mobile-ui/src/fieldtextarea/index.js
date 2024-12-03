import { sync } from '@lcap/vue2-utils';
import {
  isDef,
  isDefB,
  isObject,
  createNamespace,
} from '../utils';
import { resetScroll } from '../utils/dom/reset-scroll';
import { preventDefault } from '../utils/dom/event';
import { getRootScrollTop, setRootScrollTop } from '../utils/dom/scroll';

import { FieldMixin } from '../mixins/field';
import PreviewMixin from '../mixins/preview';

import Icon from '../icon';

const [createComponent, bem] = createNamespace('fieldtextarea');
function equal(value1, value2) {
  return String(value1) === String(value2);
}

export default createComponent({
  mixins: [
    FieldMixin,
    PreviewMixin,
    sync({
      value: 'currentValue',
      preview: 'isPreview',
      readonly: 'readonly',
      disabled: 'disabled',
    }),
  ],
  props: {
    value: {
      type: [Number, String],
    },
    defaultValue: {
      type: [Number, String],
      default: '',
    },
    placeholder: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: null,
    },
    readonly: {
      type: Boolean,
      default: null,
    },
    clearable: {
      type: Boolean,
      default: null,
    },
    maxlength: [Number, String],
    showWordLimit: Boolean,
    autosize: [Boolean, Object],
    clearTrigger: {
      type: String,
      default: 'focus',
    },
  },
  data() {
    const defaultValue = this.value ?? this.defaultValue;

    return {
      currentValue: defaultValue,
    };
  },
  computed: {
    ifLimit() {
      return this.showWordLimit && this.maxlength;
    },
  },
  mounted() {
    this.updateValue(this.currentValue);
    this.$nextTick(this.adjustSize);

    if (this.inDesigner()) {
      this.ob = new ResizeObserver((entries) => {
        this.adjustSize();
      });

      this.ob.observe(this.$refs.wrap);
    }
  },
  beforeDestroy() {
    if (this.ob) {
      this.ob.disconnect();
    }
  },
  methods: {
    getProp(key) {
      if (isDef(this[key])) {
        return this[key];
      }

      if (this.vanForm && isDef(this.vanForm[key])) {
        return this.vanForm[key];
      }
    },
    focus() {
      if (this.$refs.input) {
        this.$refs.input.focus();
      }
    },

    // @exposed-api
    blur() {
      if (this.$refs.input) {
        this.$refs.input.blur();
      }
    },
    clear() {
      this.currentValue = '';
      this.$emit('clear', this);
    },
    updateValue(value) {
      value = isDef(value) ? String(value) : '';

      const { maxlength } = this;
      if (isDefB(maxlength) && value.length > maxlength) {
        if (this.currentValue && this.currentValue.length === +maxlength) {
          value = this.currentValue;
        } else {
          value = value.slice(0, maxlength);
        }
      }

      const { input } = this.$refs;
      if (input && value !== input.value) {
        input.value = value;
      }

      if (value !== this.currentValue) {
        this.currentValue = value;
      }
    },

    onInput(event) {
      // not update v-model when composing
      if (event.target.composing) {
        return;
      }
      this.updateValue(event.target.value);

      this.$emit('input', event.target.value);
    },

    onFocus(event) {
      this.focused = true;
      this.$emit('focus', event);
      this.vanField && this.vanField.onFocus();
      this.$nextTick(this.adjustSize);
      // readonly not work in legacy mobile safari
      /* istanbul ignore if */
      const readonly = this.getProp('readonly');
      if (readonly) {
        this.blur();
      }
    },

    onBlur(event) {
      this.focused = false;
      this.updateValue(this.currentValue);
      this.$emit('blur', event);
      this.$nextTick(this.adjustSize);
      resetScroll();
      this.vanField && this.vanField.onBlur();
    },
    showClear() {
      const readonly = this.getProp('readonly');
      if (this.clearable && !readonly) {
        const hasValue = isDef(this.currentValue) && this.currentValue !== '';
        const trigger = this.clearTrigger === 'always' || (this.clearTrigger === 'focus' && this.focused);

        return hasValue && trigger;
      }
    },
    onClear(event) {
      preventDefault(event);
      this.$emit('input', '');
      this.$emit('update:value', '');
      this.currentValue = '';
      this.$emit('clear', event);
    },
    genWordLimit() {
      if (this.showWordLimit && this.maxlength) {
        const count = (this.currentValue || '').length;

        return (
          <div class={bem('word-limit')} ref="limit">
            <span class={bem('word-num')}>{count}</span>/{this.maxlength}
          </div>
        );
      }
    },
    afterValueChange() {
      this.currentValue = this.value;
    },
    // 还原vant2默认逻辑 https://github.com/youzan/vant/blob/2.x/src/field/index.js#L413
    adjustSize() {
      const { input } = this.$refs;

      if (!input) return;
      if (!this.autosize) return;

      const scrollTop = getRootScrollTop();
      input.style.height = 'auto';

      let height = input.scrollHeight;

      if (isObject(this.autosize)) {
        const { maxHeight, minHeight } = this.autosize;
        if (maxHeight) {
          height = Math.min(height, maxHeight);
        }
        if (minHeight) {
          height = Math.max(height, minHeight);
        }
      }

      if (height) {
        input.style.height = `${height}px`;

        // https://github.com/youzan/vant/issues/9178
        setRootScrollTop(scrollTop);
      }
    },
  },
  watch: {
    value(val) {
      this.updateValue(val);
      this.$nextTick(this.adjustSize);
    },
    currentValue(val) {
      this.$emit('input', val);
      this.$emit('update:value', val);
      this.$emit('change', val, this);

      this.$nextTick(this.adjustSize);
    },
  },
  render() {
    const ifLimit = this.ifLimit;
    const inputAlign = this.vanField?.getProp('inputAlign');

    if (this.isPreview) {
      return (
        <div class={bem('newwrap', { clearwrap: this.clearable, limit: ifLimit })} ref="wrap">
          <div class={bem('wrap-con')}>
            <span
              ref="input"
              class={bem('control', [inputAlign, { 'min-height': !this.autosize }])}
            >
              {this.currentValue || '--'}
            </span>
          </div>
        </div>
      );
    }

    return (
      <div class={bem('newwrap', { clearwrap: this.clearable, limit: ifLimit })} ref="wrap">
        <div class={bem('wrap-con')}>
          <textarea
            // vShow={this.showInput}
            ref="input"
            role="fieldtextarea"
            class={bem('control', [inputAlign, { 'min-height': !this.autosize }])}
            value={this.currentValue}
            // style={this.inputStyle}
            disabled={this.disabled}
            readonly={this.readonly}
            // set keyboard in modern browsers
            // inputmode={this.integer ? 'numeric' : 'decimal'}
            placeholder={this.placeholder}
            // aria-valuemax={this.max}
            // aria-valuemin={this.min}
            // aria-valuenow={this.currentValue}
            onInput={this.onInput}
            onFocus={this.onFocus}
            onBlur={this.onBlur}
            // onMousedown={this.onMousedown}
          />
          {this.showClear() && <Icon name="clear" class={bem('clear')} onTouchstart={this.onClear} />}
        </div>
        {this.genWordLimit()}
      </div>
    );
  },
});

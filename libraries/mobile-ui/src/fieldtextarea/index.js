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
    type: {
      type: String,
      default: 'textarea',
    },
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
    updateValue(value, trigger = 'onChange') {
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
      this.updateValue(this.currentValue, 'onBlur');
      this.$emit('blur', event);
      // this.validateWithTrigger('onBlur');
      // this.validateWithTriggerVusion('blur');
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
    adjustSize() {
      const { input, inputShadow, limit } = this.$refs;

      if (isObject(this.autosize || input?.autosize)) {
        let { maxHeight, minHeight } = this.autosize || input.autosize;
        const limitHeight = (!this.ifLimit || this.isPreview) ? 0 : parseInt(window.getComputedStyle(limit).height, 10);

        if (maxHeight) {
          maxHeight = String(maxHeight).replace(/px$/, '');
          maxHeight -= limitHeight;

          input.style.maxHeight = `${maxHeight}px`;
          if (inputShadow) {
            inputShadow.style.maxHeight = `${maxHeight}px`;
          }
        }
        if (minHeight) {
          minHeight = String(minHeight).replace(/px$/, '');
          minHeight -= limitHeight;

          input.style.minHeight = `${minHeight}px`;
          if (inputShadow) {
            inputShadow.style.minHeight = `${minHeight}px`;
          }
        }
      }
    },
  },
  watch: {
    // value: {
    //   handler: function (val, oldVal) {
    //     if (isDef(val) && !equal(val, this.currentValue)) {
    //       this.currentValue = val;
    //     }
    //   },
    //   immediate: true
    // },
    value(val) {
      this.updateValue(val);
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
            <div
              ref="input"
              class={bem('control', [inputAlign, { 'min-height': !this.autosize }, 'preview'])}
            >
              {this.currentValue || '--'}
            </div>
          </div>
        </div>
      );
    }

    return (
      <div class={bem('newwrap', { clearwrap: this.clearable, limit: ifLimit })} ref="wrap">
        <div class={bem('wrap-con')}>
          {/* 影子文本，用来撑开高度 */}
          <div ref="inputShadow" class={bem('control', [inputAlign, { 'min-height': !this.autosize }, 'shadow'])}>
            {this.currentValue}
          </div>
          <textarea
            // vShow={this.showInput}
            ref="input"
            // type={this.type}
            role="fieldtextarea"
            class={bem('control', [inputAlign, { 'min-height': !this.autosize }, 'absolute'])}
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

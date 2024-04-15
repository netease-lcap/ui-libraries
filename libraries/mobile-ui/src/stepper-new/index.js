import { createNamespace, isDef, addUnit } from '../utils';
import { resetScroll } from '../utils/dom/reset-scroll';
import { preventDefault } from '../utils/dom/event';
import {
  addNumber,
  formatNumber,
  NumberFormatter,
  noopFormatter,
} from '../utils/format/number';
import { isNaN } from '../utils/validate/number';
import { FieldMixin } from '../mixins/field';
import PreviewMixin from '../mixins/preview';

const [createComponent, bem] = createNamespace('stepper-new');

const LONG_PRESS_START_TIME = 600;
const LONG_PRESS_INTERVAL = 200;

function equal(value1, value2) {
  return String(value1) === String(value2);
}

const isNil = (val) => val === null || val === undefined || val === '';

export default createComponent({
  mixins: [FieldMixin, PreviewMixin],

  props: {
    value: {
      type: [Number, String],
    },
    theme: String,
    integer: Boolean,
    disabled: Boolean,
    allowEmpty: {
      type: Boolean,
      default: true,
    },
    inputWidth: [Number, String],
    buttonSize: [Number, String],
    asyncChange: Boolean,
    placeholder: String,
    disablePlus: Boolean,
    disableMinus: Boolean,
    disableInput: Boolean,
    decimalLength: [Number, String],
    name: {
      type: [Number, String],
      default: '',
    },
    min: {
      type: [Number, String],
      default: -Infinity,
    },
    max: {
      type: [Number, String],
      default: Infinity,
    },
    step: {
      type: [Number, String],
      default: 1,
    },
    defaultValue: {
      type: [Number, String],
      default: 1,
    },
    showPlus: {
      type: Boolean,
      default: true,
    },
    showMinus: {
      type: Boolean,
      default: true,
    },
    showInput: {
      type: Boolean,
      default: true,
    },
    longPress: {
      type: Boolean,
      default: true,
    },
    align: String,

    // 高级格式化
    advancedFormat: {
      type: Object,
      default: () => ({
        enable: false,
        value: '',
      }),
    },
    thousandths: {
      type: Boolean,
      default: false,
    },
    decimalPlaces: {
      type: Object,
      default: () => ({
        places: '',
        omit: false,
      }),
    },
    percentSign: {
      type: Boolean,
      default: false,
    },
    unit: {
      type: Object,
      default: () => ({
        type: 'prefix',
        value: '',
      }),
    },
  },

  data() {
    const defaultValue = this.value;
    const value = this.format(defaultValue);
    let currentFormatter = noopFormatter;

    if (this.advancedFormat) {
      let formatter;

      if (this.advancedFormat.enable) {
        formatter = this.advancedFormat.value;
      } else if (this.thousandths || this.percentSign || !isNil(this.decimalPlaces.places)) {
        formatter = '0';
        // 千分位
        if (this.thousandths) {
          formatter = `#,##0`;
        }

        // 小数位数
        if (this.decimalPlaces && this.decimalPlaces.places > 0) {
          formatter += '.';

          const char = this.decimalPlaces.omit ? '#' : '0';
          for (let i = 0; i < this.decimalPlaces.places; i++) {
            formatter += char;
          }
        } else if (this.decimalPlaces && isNil(this.decimalPlaces.places)) {
          formatter += '.*';
        }
      }

      if (formatter) {
        currentFormatter = new NumberFormatter(
          formatter,
          !this.advancedFormat.enable && {
            percentSign: this.percentSign, // 百分比
          },
        );
      }
    }

    const formattedValue = currentFormatter.format(value);

    if (!equal(value, this.value)) {
      this.$emit('update:value', value);
    }

    return {
      currentValue: value,
      formattedValue,
      currentFormatter,

      focused: false,
    };
  },

  computed: {
    showUnit() {
      return this.unit.value !== '';
    },
    minusDisabled() {
      return this.disabled || this.disableMinus || this.currentValue <= +this.min;
    },

    plusDisabled() {
      return this.disabled || this.disablePlus || this.currentValue >= +this.max;
    },

    inputStyle() {
      const style = {};

      if (this.inputWidth) {
        style.width = addUnit(this.inputWidth);
      }

      if (this.buttonSize) {
        style.height = addUnit(this.buttonSize);
      }
      if (this.align) {
        style.textAlign = this.align;
      }
      return style;
    },

    buttonStyle() {
      if (this.buttonSize) {
        const size = addUnit(this.buttonSize);

        return {
          width: size,
          height: size,
        };
      }
    },
  },

  watch: {
    max: 'check',
    min: 'check',
    integer: 'check',
    decimalLength: 'check',

    value: {
      handler(val) {
        if (!equal(val, this.currentValue)) {
          const value = this.format(val);
          this.currentValue = value;
        }
      },
      immediate: true,
    },
    currentValue(val) {
      this.$emit('update:value', val);
      this.$emit('change', val, { name: this.name });

      this.formattedValue = this.currentFormatter.format(val);
    },
  },

  methods: {
    ifDesigner() {
      return this.$env && this.$env.VUE_APP_DESIGNER;
    },
    check() {
      const val = this.format(this.currentValue);
      if (!equal(val, this.currentValue)) {
        this.currentValue = val;
      }
    },

    // formatNumber illegal characters
    formatNumber(value) {
      return formatNumber(String(value), !this.integer);
    },

    format(value) {
      if (this.allowEmpty && ['', null, undefined].indexOf(value) !== -1) {
        return value;
      }

      value = this.formatNumber(value);

      // format range
      value = value === '' ? 1 : +value; // 转换为数字
      value = isNaN(value) ? this.min : value; // 非数字转换为最小值
      value = Math.max(Math.min(this.max, value), this.min); // 超出范围转换为范围值

      // format decimal
      if (!isNil(this.decimalLength)) {
        // 保留小数位数
        value = value.toFixed(this.decimalLength);
      }

      return +value; // 转换为数字
    },

    onInput(event) {
      const { value } = event.target;

      // const parsedValue = this.currentFormatter.parse(value);

      // let formatted = this.formatNumber(parsedValue);

      // if (isDef(this.decimalLength) && formatted.indexOf('.') !== -1) {
      //   const pair = formatted.split('.');
      //   formatted = `${pair[0]}.${pair[1].slice(0, this.decimalLength)}`;
      // }

      // if (!equal(parsedValue, formatted)) {
      //   event.target.value = formatted;
      // }

      // if (formatted === String(+formatted)) {
      //   formatted = +formatted;
      // }

      // this.emitChange(formatted);
      this.$emit('input', value);
    },

    emitChange(value) {
      if (this.asyncChange) {
        this.$emit('change', value, { name: this.name });
        this.$emit('update:value', value);
      } else {
        this.currentValue = value;
      }
    },

    onChange() {
      const { type } = this;

      if (this.disableInput || this[`${type}Disabled`]) {
        this.$emit('overlimit', type);
        return;
      }

      const diff = type === 'minus' ? -this.step : +this.step;

      const value = this.format(addNumber(+this.currentValue, diff));

      this.emitChange(value);
      this.$emit(type);
    },

    onFocus(event) {
      // readonly not work in legacy mobile safari
      if (this.disableInput && this.$refs.input) {
        this.$refs.input.blur();
      } else {
        this.$emit('focus', event);
      }

      this.focused = true;
    },

    onBlur(event) {
      const value = this.format(event.target.value);
      this.emitChange(value);

      this.$emit('blur', event);

      resetScroll();

      this.focused = false;
    },

    longPressStep() {
      this.longPressTimer = setTimeout(() => {
        this.onChange();
        this.longPressStep(this.type);
      }, LONG_PRESS_INTERVAL);
    },

    onTouchStart() {
      if (!this.longPress) {
        return;
      }

      clearTimeout(this.longPressTimer);
      this.isLongPress = false;

      this.longPressTimer = setTimeout(() => {
        this.isLongPress = true;
        this.onChange();
        this.longPressStep();
      }, LONG_PRESS_START_TIME);
    },

    onTouchEnd(event) {
      if (!this.longPress) {
        return;
      }

      clearTimeout(this.longPressTimer);

      if (this.isLongPress) {
        preventDefault(event);
      }
    },

    onMousedown(event) {
      // fix mobile safari page scroll down issue
      // see: https://github.com/youzan/vant/issues/7690
      if (this.disableInput) {
        event.preventDefault();
      }
    },
  },

  render() {
    if (this.isPreview) {
      return (
        <div class={bem([this.theme])}>
          {this.showUnit && this.unit.type === 'prefix' && <div class={bem('unit', { prefix: true })}>{this.unit?.value}</div>}
          <input
            ref="input"
            class={bem('input')}
            style={this.inputStyle}
            readonly
            value={this.formattedValue}
          />
          {this.showUnit && this.unit.type === 'suffix' && <div class={bem('unit', { suffix: true })}>{this.unit?.value}</div>}
        </div>
      );
    }

    const createListeners = (type) => ({
      on: {
        click: (e) => {
          // disable double tap scrolling on mobile safari
          e.preventDefault();
          this.type = type;
          this.onChange();
          this.$emit('click', e);
        },
        touchstart: () => {
          this.type = type;
          this.onTouchStart();
        },
        touchend: this.onTouchEnd,
        touchcancel: this.onTouchEnd,
      },
    });

    return (
      <div class={bem([this.theme])}>
        <button vShow={this.showMinus} type="button" style={this.buttonStyle} class={bem('minus', { disabled: this.minusDisabled })} {...createListeners('minus')} />
        {this.showUnit && this.unit.type === 'prefix' && <div class={bem('unit', { prefix: true })}>{this.unit?.value}</div>}
        <input
          vShow={this.showInput}
          ref="input"
          type={this.integer ? 'tel' : 'text'}
          role="spinbutton"
          class={bem('input')}
          value={this.focused ? this.currentValue : this.formattedValue}
          style={this.inputStyle}
          disabled={this.disabled}
          readonly={this.disableInput}
          // set keyboard in modern browsers
          inputmode={this.integer ? 'numeric' : 'decimal'}
          placeholder={this.placeholder}
          onInput={this.onInput}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          onMousedown={this.onMousedown}
        />
        {this.showUnit && this.unit.type === 'suffix' && <div class={bem('unit', { suffix: true })}>{this.unit?.value}</div>}
        <button vShow={this.showPlus} type="button" style={this.buttonStyle} class={bem('plus', { disabled: this.plusDisabled })} {...createListeners('plus')} />
      </div>
    );
  },
});

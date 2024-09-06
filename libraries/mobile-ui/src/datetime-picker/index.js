import { sync } from '@lcap/vue2-utils';
import { createNamespace } from '../utils';
import { showFormat, isValidDate } from './utils';
import TimePicker from './TimePicker';
import DatePicker from './DatePicker';
import Popup from '../popup';
import Field from '../field';
import Tabs from '../tabs';
import Tab from '../tab';
import { EmptyCol } from '../emptycol';
import { FieldMixin } from '../mixins/field';
import { EventSlotCommandProvider } from '../mixins/EventSlotCommandProvider';
import PreviewMixin from '../mixins/preview';

import { validDisplayFormatters, validUnit, validType } from './shared';

const [createComponent, bem, t] = createNamespace('datetime-picker');

export default createComponent({
  mixins: [
    FieldMixin,
    EventSlotCommandProvider(['cancel', 'confirm']),
    PreviewMixin,
    sync({
      value: 'currentValue',
      startValue: 'currentStartValue',
      endValue: 'currentEndValue',
      preview: 'isPreview',
      readonly: 'readonly',
      disabled: 'disabled',
    }),
  ],
  props: {
    ...TimePicker.props,
    ...DatePicker.props,
    labelField: {
      type: String,
      default: '',
    },
    inputAlign: String,
    closeOnClickOverlay: Boolean,
    placeholder: {
      type: String,
    },
    range: Boolean,
    startValue: String,
    endValue: String,
    isNew: {
      type: Boolean,
      default: false,
    },
    visible: {
      type: Boolean,
    },
    popupOpened: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    const val = this.value;
    const start = this.startValue;
    const end = this.endValue;

    return {
      popupVisible: this.popupOpened,

      currentValue: val,
      currentStartValue: start,
      currentEndValue: end,

      // 临时值，用于记录区间change时的变化值
      tempStartValue: start,
      tempEndValue: end,

      // inDesigner: this.$env && this.$env.VUE_APP_DESIGNER,
    };
  },
  computed: {
    realType() {
      if (validType.includes(this.type)) {
        return this.type;
      }
      return validType[0];
    },
    realUnit() {
      if (validUnit[this.realType].includes(this.unit)) {
        return this.unit;
      }
      return validUnit[this.realType][0];
    },
    validateValue() {
      // 范围选择
      if (this.range) {
        return this.startValue || this.endValue;
      }

      return this.value;
    },

    isDesignerNew() {
      return this.$env && this.$env.VUE_APP_DESIGNER_NEW;
    },
  },
  watch: {
    // 用于设计器模式
    popupOpened(val) {
      this.popupVisible = val;
    },

    visible(val) {
      // 设计器模式下不触发
      if (this.inDesigner()) return;

      this.popupVisible = val;
    },
    value(val) {
      this.currentValue = val;
    },

    // range value
    startValue(val) {
      this.currentStartValue = val;
      this.tempStartValue = val;
    },
    endValue(val) {
      this.currentEndValue = val;
      this.tempEndValue = val;
    },
  },
  methods: {
    // 展示格式
    getDisplayFormatter() {
      // 高级格式化开启
      if (this.advancedFormatEnable && this.advancedFormatValue) {
        return this.advancedFormatValue;
      }

      const formatters = validDisplayFormatters[this.realType][this.realUnit];

      if (formatters.includes(this.showFormatter)) {
        return this.showFormatter;
      }

      // 兼容之前displayFormat配置
      return this.displayFormat || formatters[0];
    },
    designerOpen(e) {
      let currentElement = e.target;
      let nodePath = false;
      while (currentElement) {
        const np = currentElement.getAttribute('vusion-node-path');
        if (np) {
          nodePath = np;
          break;
        }
        currentElement = currentElement.parentElement;
      }
      if (this?.$attrs?.['vusion-node-path'] === nodePath) {
        this.$refs.popup.togglePModal();
      }
    },
    designerClose() {
      if (window.parent && this?.$attrs?.['vusion-node-path']) {
        window.parent?.postMessage(
          {
            protocol: 'vusion',
            sender: 'helper',
            type: 'send',
            command: 'setPopupStatusInfo',
            args: [
              {
                nodePath: this?.$attrs?.['vusion-node-path'],
                visible: false,
              },
            ],
          },
          '*',
        );
      }
      this.$refs.popup.togglePModal();
    },
    getTitle() {
      if (this.inDesigner()) {
        const value = isValidDate(this.value, this.realType) ? this.value : '';
        const start = isValidDate(this.startValue, this.realType) ? this.startValue : '';
        const end = isValidDate(this.endValue, this.realType) ? this.endValue : '';

        return this.range ? `${start} - ${end}` : value;
      }

      if (this.range) {
        let startTitle = '';
        let endTitle = '';

        if (isValidDate(this.currentStartValue, this.realType, this.realUnit)) {
          startTitle = showFormat(this.currentStartValue, {
            type: this.realType,
            unit: this.realUnit,
            formatter: this.getDisplayFormatter(),
          });
        }

        if (isValidDate(this.currentEndValue, this.realType, this.realUnit)) {
          endTitle = showFormat(this.currentEndValue, {
            type: this.realType,
            unit: this.realUnit,
            formatter: this.getDisplayFormatter(),
          });
        }

        return startTitle || endTitle ? `${startTitle} - ${endTitle}` : '';
      }

      if (isValidDate(this.currentValue, this.realType, this.realUnit)) {
        return showFormat(this.currentValue, {
          type: this.realType,
          unit: this.realUnit,
          formatter: this.getDisplayFormatter(),
        });
      }

      return '';
    },
    togglePopup() {
      this.popupVisible = !this.popupVisible;
      this.$emit('update:visible', this.popupVisible);
    },
    // @exposed-api
    open() {
      if (this.readonly || this.disabled) {
        return;
      }

      this.popupVisible = true;
      this.$emit('update:visible', this.popupVisible);
    },
    // @exposed-api
    close() {
      this.popupVisible = false;
      this.$emit('update:visible', this.popupVisible);
    },
    // @exposed-api
    getPicker() {
      return this.$refs.root.getPicker();
    },
    onConfirm(value) {
      this.$emit('confirm', value);
    },
    confirm() {
      if (this.range) {
        // date、datetime
        const { start, end } = this.$refs;
        const startValue = start.onConfirm();
        const endValue = end.onConfirm();

        this.currentStartValue = startValue;
        this.currentEndValue = endValue;
        this.$emit('update:startValue', startValue);
        this.$emit('update:endValue', endValue);

        this.onConfirm({
          start: startValue,
          end: endValue,
        });
      } else {
        const { root } = this.$refs;
        const value = root.onConfirm();
        this.currentValue = value;
        this.$emit('update:value', value);
        this.onConfirm(value);
      }

      this.close();
    },
    onCancel() {
      this.$emit('cancel');
    },
    cancel() {
      this.onCancel();
      this.close();
    },
    genToolBar() {
      if (this.isNew) {
        let topSlot = this.slots('picker-top');
        let titleSlot = this.slots('pannel-title');
        if (this.inDesigner() && !this.isDesignerNew) {
          if (!topSlot) {
            topSlot = <EmptyCol></EmptyCol>;
          }
          if (!titleSlot) {
            titleSlot = <EmptyCol></EmptyCol>;
          }
        }
        return (
          <div class={bem('picker-top')}>
            {topSlot && (
              <div vusion-slot-name="picker-top" style="display:flex; justify-content: space-between; align-items: center; min-height:32px;">
                {topSlot}
              </div>
            )}
            <div style="position:absolute; top: 50%; left:50%; transform: translate(-50%,-50%);" vusion-slot-name="pannel-title">
              {titleSlot || this.title}
            </div>
          </div>
        );
      }

      return (
        <div class={bem('toolbar')}>
          <button type="button" class={bem('cancel')} onClick={this.cancel}>
            {this.cancelButtonText || t('cancel')}
          </button>
          {this.title && <div class={['van-ellipsis', bem('title')]}>{this.title}</div>}
          <button type="button" class={bem('confirm')} onClick={this.confirm}>
            {this.confirmButtonText || t('confirm')}
          </button>
        </div>
      );
    },
    renderContent() {
      const Component = this.realType === 'time' ? TimePicker : DatePicker;

      if (this.range) {
        return (
          <Tabs line-width="150px" lazyRender={false}>
            <Tab title={t('rangeTabStart')}>
              <Component
                ref="start"
                class={bem()}
                scopedSlots={this.$scopedSlots}
                {...{
                  props: {
                    ...this.$props,
                    type: this.realType,
                    unit: this.realUnit,
                    value: this.currentStartValue,
                    maxDate: this.tempEndValue ?? this.$props.maxDate,
                  },
                  on: {
                    change: (picker, value) => {
                      this.tempStartValue = value;
                    },
                  },
                }}
              />
            </Tab>
            <Tab style={{ flex: '0 0 20px' }} title={t('rangeTabTo')} disabled></Tab>
            <Tab title={t('rangeTabEnd')}>
              <Component
                ref="end"
                class={bem()}
                scopedSlots={this.$scopedSlots}
                {...{
                  props: {
                    ...this.$props,
                    type: this.realType,
                    unit: this.realUnit,
                    value: this.currentEndValue,
                    // 当currentStartValue存在时，使用
                    minDate: this.tempStartValue ?? this.$props.minDate,
                  },
                  on: {
                    change: (picker, value) => {
                      this.tempEndValue = value;
                    },
                  },
                }}
              />
            </Tab>
          </Tabs>
        );
      }

      return (
        <Component
          ref="root"
          class={bem()}
          scopedSlots={this.$scopedSlots}
          {...{
            props: {
              ...this.$props,
              type: this.realType,
              unit: this.realUnit,
              value: this.currentValue,
            },
          }}
        />
      );
    },
    renderBottom() {
      if (!this.isNew) return null;

      let bottomSlot = this.slots('picker-bottom');
      if (this.inDesigner() && !this.isDesignerNew) {
        if (!bottomSlot) {
          bottomSlot = <EmptyCol></EmptyCol>;
        }
      }

      if (!bottomSlot) return null;

      return (
        <div class={bem('picker-bottom')} vusion-slot-name="picker-bottom">
          {bottomSlot}
        </div>
      );
    },
  },

  render() {
    const tempSlot = {
      title: () => this.slots('title'),
    };

    if (this.isPreview) {
      return (
        <div class={bem('wrapppdtpicker')} vusion-click-enabled="true">
          <Field
            label={this.labelField}
            value={this.getTitle() || '--'}
            scopedSlots={tempSlot}
            readonly
            isLink
            input-align={this.inputAlign || 'right'}
            // eslint-disable-next-line no-prototype-builtins
            notitle={!this.$slots.hasOwnProperty('title')}
            insel={true}
            nofi={true}
          />
        </div>
      );
    }

    return (
      <div class={bem('wrapppdtpicker')} vusion-click-enabled="true">
        <Field
          label={this.labelField}
          value={this.getTitle()}
          placeholder={this.placeholder}
          scopedSlots={tempSlot}
          readonly
          disabled={this.disabled}
          isLink
          onClick={this.inDesigner() ? this.designerOpen : this.open}
          input-align={this.inputAlign || 'right'}
          // eslint-disable-next-line no-prototype-builtins
          notitle={!this.$slots.hasOwnProperty('title')}
          insel={true}
          nofi={true}
        />

        <Popup
          ref="popup"
          get-container="body" // 放body下不易出现异常情况
          safe-area-inset-bottom
          onClick={(event) => {
            if (event && event.stopPropagation) {
              event.stopPropagation();
            }
          }}
          round
          vModel={this.popupVisible}
          class={bem('popup')}
          position={'bottom'}
          closeOnClickOverlay={this.closeOnClickOverlay}
          vusion-scope-id={this?.$vnode?.context?.$options?._scopeId}
          {...{
            attrs: { ...this.$attrs, 'vusion-empty-background': undefined },
          }}
          // onClickOverlay={this.togglePopup}
        >
          <div class={bem(this.isNew && 'content-wrapper')}>
            {this.inDesigner() && !this.isDesignerNew && (
              <div class={bem('designer-close-button')} vusion-click-enabled="true" onClick={this.designerClose}>
                点击关闭
              </div>
            )}
            {this.genToolBar()}
            {this.renderContent()}
            {this.renderBottom()}
          </div>
        </Popup>
      </div>
    );
  },
});

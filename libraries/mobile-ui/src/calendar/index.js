import { sync } from '@lcap/vue2-utils';
// Utils
import dayjs from '../utils/dayjs';
import { raf } from '../utils/dom/raf';
import { isDate } from '../utils/validate/date';
import { isNaN } from '../utils/validate/number';
import { getScrollTop } from '../utils/dom/scroll';
import {
  transErrorDate,
  transErrorMinOrMaxDate,
  t,
  bem,
  copyDate,
  copyDates,
  getNextDay,
  compareDay,
  calcDateNum,
  compareMonth,
  createComponent,
  getDayByOffset,
} from './utils';

// Components
import Popup from '../popup';
import Button from '../button';
import Toast from '../toast';
import Month from './components/Month';
import Header from './components/Header';
import Field from '../field';
import { EmptyCol } from '../emptycol';

import { FieldMixin } from '../mixins/field';
import { EventSlotCommandProvider } from '../mixins/EventSlotCommandProvider';
import PreviewMixin from '../mixins/preview';
import SyncValueMixin from '../mixins/sync-value';

const EventSlotCommandMap = {
  cancel: 'onCancel',
  confirm: 'onConfirm',
};

export default createComponent({
  mixins: [
    FieldMixin,
    EventSlotCommandProvider(EventSlotCommandMap),
    PreviewMixin,
    SyncValueMixin,
    sync({
      preview: 'isPreview',
      readonly: 'readonly',
      disabled: 'disabled',
    }),
  ],

  props: {
    title: String,
    color: String,
    readonly: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    formatter: Function,
    rowHeight: [Number, String],
    confirmText: String,
    rangePrompt: String,
    placeholder: {
      type: String,
    },
    labelField: {
      type: String,
      default: '',
    },
    // 废弃
    defaultDate: {
      type: [Date, Array, String],
      default: null,
    },
    value: {
      type: [Date, Array, String],
      default: null,
    },
    getContainer: [String, Function],
    allowSameDay: Boolean,
    confirmDisabledText: String,
    type: {
      type: String,
      default: 'single',
    },
    round: {
      type: Boolean,
      default: true,
    },
    position: {
      type: String,
      default: 'bottom',
    },
    poppable: {
      type: Boolean,
      default: true,
    },
    maxRange: {
      type: [Number, String],
      default: null,
    },
    lazyRender: {
      type: Boolean,
      default: true,
    },
    showMark: {
      type: Boolean,
      default: true,
    },
    showTitle: {
      type: Boolean,
      default: true,
    },
    showConfirm: {
      type: Boolean,
      default: true,
    },
    showSubtitle: {
      type: Boolean,
      default: true,
    },
    closeOnPopstate: {
      type: Boolean,
      default: true,
    },
    closeOnClickOverlay: {
      type: Boolean,
      default: false,
    },
    safeAreaInsetBottom: {
      type: Boolean,
      default: true,
    },
    minDate: {
      type: Date,
      validator: isDate,
      default: () => {
        const now = new Date();
        return new Date(now.getFullYear() - 1, now.getMonth(), now.getDate());
      },
    },
    maxDate: {
      type: Date,
      validator: isDate,
      default() {
        const now = new Date();
        return new Date(now.getFullYear(), now.getMonth() + 12, now.getDate());
      },
    },
    firstDayOfWeek: {
      type: [Number, String],
      default: 0,
      validator: (val) => val >= 0 && val <= 6,
    },
    inputAlign: String,
    isNew: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    const currentValue = this.value ?? this.defaultDate;

    return {
      currentValue,
      tempValue: currentValue,

      subtitle: '',
      popupShown: false,
      defaultMonthForSelect: null,
    };
  },

  computed: {
    currentDate() {
      return this.getInitialDate(this.tempValue);
    },

    months() {
      const months = [];
      const cursor = transErrorMinOrMaxDate(this.minDate, 'min');

      cursor.setDate(1);
      do {
        months.push(new Date(cursor));
        cursor.setMonth(cursor.getMonth() + 1);
      } while (compareMonth(cursor, transErrorMinOrMaxDate(this.maxDate, 'max')) !== 1);

      return months;
    },

    buttonDisabled() {
      const { currentDate } = this;

      return !currentDate;
    },

    dayOffset() {
      return this.firstDayOfWeek ? this.firstDayOfWeek % 7 : 0;
    },

    defaultMonthForSelectCom() {
      return this.defaultMonthForSelect;
    },
  },

  watch: {
    popupShown: 'init',

    type() {
      this.reset();
    },
    currentValue(val) {
      this.tempValue = val;
    },
    defaultDate: {
      handler(val) {
        this.currentValue = val;
        this.scrollIntoView();
      },
      immediate: true,
    },

    value: {
      handler(val) {
        this.currentValue = val;
        this.scrollIntoView();
      },
      immediate: true,
    },
  },

  mounted() {
    this.init();
  },

  /* istanbul ignore next */
  activated() {
    this.init();
  },

  methods: {
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
        this.popupShown = true;
        this.$refs.popforcas.togglePModal();
      }
    },
    designerClose() {
      // readme:ide会记录通过designerDbControl打开的浮窗，需要通过该命令清除，在触发方式双击变单击后，暂无作用
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
      this.$refs.popforcas.togglePModal();
      this.popupShown = false;
    },
    getTitle() {
      if (this.ifDesigner()) {
        return this.value ?? this.defaultDate;
      }

      const controledValue = this.value ?? this.defaultDate;
      if (controledValue && dayjs(controledValue).isValid()) {
        return dayjs(controledValue).format('YYYY-MM-DD');
      }

      if (this.currentValue && dayjs(this.currentValue).isValid()) {
        return dayjs(this.currentValue).format('YYYY-MM-DD');
      }

      return '';
    },
    setCurrentDate(val) {
      this.currentValue = val;

      const date = dayjs(this.currentValue);
      const value = date.isValid() ? date.format('YYYY-MM-DD') : this.currentValue;
      this.$emit('update:value', value);
      this.$emit('update:default-date', value);
    },
    ifDesigner() {
      return this.$env && this.$env.VUE_APP_DESIGNER;
    },
    togglePopup() {
      if (this.readonly || this.disabled) {
        return;
      }

      if (this.poppable) {
        this.popupShown = !this.popupShown;
      }
    },
    // @exposed-api
    reset(val = this.getInitialDate()) {
      this.currentValue = val;

      const date = dayjs(this.currentValue);
      const value = date.isValid() ? date.format('YYYY-MM-DD') : this.currentValue;
      this.$emit('update:value', value);
      this.$emit('update:default-date', value);
      this.scrollIntoView();
    },

    init() {
      if (this.poppable && !this.popupShown) {
        return;
      }

      this.$nextTick(() => {
        // add Math.floor to avoid decimal height issues
        // https://github.com/youzan/vant/issues/5640
        this.bodyHeight = Math.floor(this.$refs.body.getBoundingClientRect().height);
        this.onScroll();
        this.scrollIntoView();
      });
    },

    // @exposed-api
    scrollToDate(targetDate) {
      raf(() => {
        const displayed = this.popupShown || !this.poppable;

        /* istanbul ignore if */
        if (!targetDate || !displayed) {
          return;
        }

        this.months.some((month, index) => {
          if (compareMonth(month, targetDate) === 0) {
            const { body, months } = this.$refs;
            months[index].scrollIntoView(body);
            return true;
          }

          return false;
        });

        this.onScroll();
      });
    },

    // scroll to current month
    scrollIntoView() {
      const { currentDate } = this;

      if (currentDate) {
        const targetDate = currentDate;
        this.scrollToDate(targetDate);
      }
    },

    getInitialDate(val) {
      const { minDate, maxDate, value, defaultDate } = this;
      val = val || (value ?? defaultDate);

      let defaultVal = new Date();
      const min = transErrorMinOrMaxDate(minDate, 'min');
      const max = transErrorMinOrMaxDate(maxDate, 'max');
      if (compareDay(defaultVal, min) === -1) {
        defaultVal = min;
      } else if (compareDay(defaultVal, max) === 1) {
        defaultVal = max;
      }

      if (val) {
        return dayjs(val).toDate();
      }

      return dayjs(defaultVal).toDate();
    },

    // calculate the position of the elements
    // and find the elements that needs to be rendered
    onScroll() {
      const { body, months } = this.$refs;
      const top = getScrollTop(body);
      const bottom = top + this.bodyHeight;
      const heights = months.map((item) => item.getHeight());
      const heightSum = heights.reduce((a, b) => a + b, 0);

      // iOS scroll bounce may exceed the range
      if (bottom > heightSum && top > 0) {
        return;
      }

      let height = 0;
      let currentMonth;
      const visibleRange = [-1, -1];

      for (let i = 0; i < months.length; i++) {
        const visible = height <= bottom && height + heights[i] >= top;

        if (visible) {
          visibleRange[1] = i;

          if (!currentMonth) {
            currentMonth = months[i];
            visibleRange[0] = i;
          }

          if (!months[i].showed) {
            months[i].showed = true;
            this.$emit('month-show', {
              date: months[i].date,
              title: months[i].title,
            });
          }
        }

        height += heights[i];
      }

      months.forEach((month, index) => {
        month.visible = index >= visibleRange[0] - 1 && index <= visibleRange[1] + 1;
      });

      /* istanbul ignore else */
      if (currentMonth) {
        this.defaultMonthForSelect = currentMonth.getDate;
        this.subtitle = currentMonth.title;
      }
    },

    onClickDay(item) {
      if (this.readonly || this.disabled) {
        return;
      }

      const { date } = item;

      this.tempValue = date;
      this.$emit('select', dayjs(date).format('YYYY-MM-DD'));

      if (!this.showConfirm) {
        this.onConfirm();
      }
    },

    onConfirm() {
      this.currentValue = this.currentDate;

      const date = dayjs(this.currentValue);
      const value = date.isValid() ? date.format('YYYY-MM-DD') : this.currentValue;
      this.$emit('update:value', value);
      this.$emit('update:default-date', value);

      this.$emit('confirm', value);

      this.togglePopup();
    },

    onCancel() {
      this.togglePopup();
    },

    genMonth(date, index) {
      const showMonthTitle = index !== 0 || !this.showSubtitle;
      return (
        <Month
          ref="months"
          refInFor
          date={date}
          type={this.type}
          disabled={this.disabled}
          color={this.color}
          minDate={transErrorMinOrMaxDate(this.minDate, 'min')}
          maxDate={transErrorMinOrMaxDate(this.maxDate, 'max')}
          showMark={this.showMark}
          formatter={this.formatter}
          rowHeight={this.rowHeight}
          lazyRender={this.lazyRender}
          currentDate={this.currentDate}
          showSubtitle={this.showSubtitle}
          allowSameDay={this.allowSameDay}
          showMonthTitle={showMonthTitle}
          firstDayOfWeek={this.dayOffset}
          scopedSlots={{
            'top-info': this.$scopedSlots['top-info'],
            'bottom-info': this.$scopedSlots['bottom-info'],
          }}
          onClick={this.onClickDay}
        />
      );
    },

    genFooterContent() {
      const slot = this.slots('footer');

      if (slot) {
        return slot;
      }

      if (this.showConfirm) {
        const text = this.buttonDisabled ? this.confirmDisabledText : this.confirmText;

        return (
          <Button round block="blockb" type="info" color={this.color} class={bem('confirm')} disabled={this.buttonDisabled} nativeType="button" onClick={this.onConfirm}>
            {text || t('confirm')}
          </Button>
        );
      }
    },

    genFooter() {
      let bottomSlot = this.slots('picker-bottom');
      if (this.inDesigner()) {
        if (!bottomSlot) {
          bottomSlot = <EmptyCol></EmptyCol>;
        }
      }

      if (!bottomSlot && this.isNew) return null;
      return (
        <div class={bem('footer', { unfit: !this.safeAreaInsetBottom })}>
          {!this.isNew && this.genFooterContent()}
          {this.isNew && (
            <div class={bem('picker-bottom')} vusion-slot-name="picker-bottom">
              {bottomSlot}
            </div>
          )}
        </div>
      );
    },

    genTitleForNew() {
      let topSlot = this.slots('picker-top');
      let titleSlot = this.slots('pannel-title');
      if (this.inDesigner()) {
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
    },

    genTitle() {
      if (this.isNew) return this.genTitleForNew();
      return this.slots('title');
    },

    genCalendar() {
      return (
        <div class={bem([this.isNew && 'new'])}>
          {this.inDesigner() && (
            <div class={bem('designer-close-button')} vusion-click-enabled="true" onClick={this.designerClose}>
              点击关闭
            </div>
          )}
          <Header
            title={this.title}
            showTitle={this.showTitle}
            subtitle={this.subtitle}
            showSubtitle={this.showSubtitle}
            currentDate={this.currentDate}
            defaultMonthForSelect={this.defaultMonthForSelectCom}
            scopedSlots={{
              title: () => this.genTitle(),
            }}
            firstDayOfWeek={this.dayOffset}
            setCurrentDate={this.setCurrentDate}
            minDate={this.minDate}
            maxDate={this.maxDate}
            scrollToDate={this.scrollToDate}
          />
          <div ref="body" class={bem('body')} onScroll={this.onScroll}>
            {this.months.map(this.genMonth)}
          </div>
          {this.genFooter()}
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
        <div class={bem('wrapppcalendar')} vusion-click-enabled="true">
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

    if (this.poppable) {
      return (
        <div class={bem('wrapppcalendar')} vusion-click-enabled="true">
          <Field
            label={this.labelField}
            value={this.getTitle()}
            scopedSlots={tempSlot}
            readonly
            disabled={this.disabled}
            placeholder={this.placeholder}
            isLink
            input-align={this.inputAlign || 'right'}
            onClick={this.inDesigner() ? this.designerOpen : this.togglePopup}
            // eslint-disable-next-line no-prototype-builtins
            notitle={!this.$slots.hasOwnProperty('title')}
            insel={true}
            nofi={true}
          />
          <Popup
            safe-area-inset-bottom
            class={bem('popup')}
            vModel={this.popupShown}
            round={this.round}
            position={this.position}
            ref="popforcas"
            get-container="body" // 放body下不易出现异常情况
            closeOnClickOverlay={this.closeOnClickOverlay}
            vusion-scope-id={this?.$vnode?.context?.$options?._scopeId}
            {...{
              attrs: { ...this.$attrs, 'vusion-empty-background': undefined },
            }}
          >
            {this.genCalendar()}
          </Popup>
        </div>
      );
    }

    return this.genCalendar();
  },
});

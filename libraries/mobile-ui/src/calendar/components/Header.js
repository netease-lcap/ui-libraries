import { createNamespace } from '../../utils';
import { t, bem } from '../utils';
import Popup from '../../popup';
import Button from '../../button';

// import { MonthPicker } from 'vue-month-picker';


const [createComponent] = createNamespace('calendar-header');

export default createComponent({
  props: {
    title: String,
    subtitle: String,
    showTitle: Boolean,
    showSubtitle: Boolean,
    firstDayOfWeek: Number,
    setCurrentDate: Function,
    scrollToDate: Function,
    minDate: Date,
    maxDate: Date,
    currentDate: null,
    defaultMonthForSelect: null,
  },
  methods: {
    genTitle() {
      if (this.showTitle) {
        const title = this.slots('title') || this.title || t('title');
        return <div class={bem('header-title')}>{title}</div>;
      }
    },

    genSubtitle() {
      if (this.showSubtitle) {
        return <div class={bem('header-subtitle')}>{this.subtitle}</div>;
      }
    },

    genWeekDays() {
      // '日, 一, 二, 三, 四, 五, 六'
      let weekdays = t('weekdays');
      weekdays = weekdays.split(',').map((s) => s.trim());

      const { firstDayOfWeek } = this;

      const renderWeekDays = [
        ...weekdays.slice(firstDayOfWeek, 7),
        ...weekdays.slice(0, firstDayOfWeek),
      ];

      return (
        <div class={bem('weekdays')}>
          {renderWeekDays.map((item) => (
            <span class={bem('weekday')}>{item}</span>
          ))}
        </div>
      );
    },
  },

  render() {
    return (
      <div class={bem('header')}>
        {this.genTitle()}
        {this.genSubtitle()}
        {this.genWeekDays()}
      </div>
    );
  },
});

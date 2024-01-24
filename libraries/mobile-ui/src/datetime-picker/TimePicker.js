import dayjs from '../utils/dayjs';
import { createNamespace } from '../utils';
import { padZero } from '../utils/format/string';
import { range } from '../utils/format/number';
import { sharedProps, TimePickerMixin } from './shared';

const [createComponent] = createNamespace('time-picker');

export default createComponent({
  mixins: [TimePickerMixin],

  props: {
    ...sharedProps,
    type: {
      type: String,
      default: 'time',
    },
    minHour: {
      type: [Number, String],
      default: 0,
    },
    maxHour: {
      type: [Number, String],
      default: 23,
    },
    minMinute: {
      type: [Number, String],
      default: 0,
    },
    maxMinute: {
      type: [Number, String],
      default: 59,
    },
    minSecond: {
      type: [Number, String],
      default: 0,
    },
    maxSecond: {
      type: [Number, String],
      default: 59,
    },
    unit: {
      type: String,
      default: 'minute'
    },
  },

  computed: {
    ranges() {
      // 时:分
      const columns =  [
        {
          type: 'hour',
          range: [+this.minHour, +this.maxHour],
        },
        {
          type: 'minute',
          range: [+this.minMinute, +this.maxMinute],
        },
      ];

      // 最小单位: 秒
      if (this.unit === 'second') {
        columns.push({
          type: 'second',
          range: [+this.minSecond, +this.maxSecond],
        });
      }

      return columns;
    },
  },

  watch: {
    filter: 'updateInnerValue',
    // 如果最大、最小有变化，需要更新内部值
    minHour() {
      this.$nextTick(() => {
        this.updateInnerValue();
      });
    },
    maxHour(value) {
      const [hour, minute] = this.innerValue.split(':');
      if (hour >= value) {
        this.innerValue = this.formatValue(`${value}:${minute}`);
        this.updateColumnValue();
      } else {
        this.updateInnerValue();
      }
    },
    minMinute: 'updateInnerValue',
    maxMinute(value) {
      const [hour, minute] = this.innerValue.split(':');
      if (minute >= value) {
        this.innerValue = this.formatValue(`${hour}:${value}`);
        this.updateColumnValue();
      } else {
        this.updateInnerValue();
      }
    },
    // todo second

    value(val) {
      val = this.formatValue(val);

      if (val !== this.innerValue) {
        this.innerValue = val;
        this.updateColumnValue();
      }
    },
  },

  methods: {
    // 将外部value转成内部统一格式
    formatValue(value) {
      // 空值
      if (!value) {
        value = `${padZero(this.minHour)}:${padZero(this.minMinute)}`;

        if (this.unit === 'second') {
          value += `:${padZero(this.minSecond)}`;
        }
      }

      let [hour, minute, second] = value.split(':');

      hour = padZero(range(hour, this.minHour, this.maxHour));
      minute = padZero(range(minute, this.minMinute, this.maxMinute));

      value = `${hour}:${minute}`;

      if (this.unit === 'second') {
        second = padZero(range(second, this.minSecond, this.maxSecond));
        value += `:${second}`
      }

      return value;
    },

    updateInnerValue() {
      const [hourIndex, minuteIndex, secondIndex] = this.getPicker().getIndexes();
      const [hourColumn, minuteColumn, secondColumn] = this.originColumns;

      const hour = hourColumn.values[hourIndex] || hourColumn.values[0];
      const minute = minuteColumn.values[minuteIndex] || minuteColumn.values[0];

      let innerValue = `${hour}:${minute}`;

      if (this.unit === 'second') {
        const second = secondColumn.values[secondIndex] || secondColumn.values[0];
        innerValue += `:${second}`
      }

      this.innerValue = this.formatValue(innerValue);
      this.updateColumnValue();
    },

    onChange(picker) {
      this.updateInnerValue();

      this.$nextTick(() => {
        this.$nextTick(() => {
          this.$emit('change', picker);
        });
      });
    },

    updateColumnValue() {
      const { formatter } = this;
      const pair = this.innerValue.split(':');
      const values = [formatter('hour', pair[0]), formatter('minute', pair[1])];

      if (this.unit === 'second') {
        values.push(formatter('second', pair[2]))
      }

      this.$nextTick(() => {
        this.getPicker().setValues(values);
      });
    },
  },
});

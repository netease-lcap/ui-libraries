import dayjs from '../utils/dayjs';
import { createNamespace } from '../utils';
import { isDate } from '../utils/validate/date';
import { padZero } from '../utils/format/string';
import {
  getTrueValue,
  getMonthEndDay,
  transErrorDate,
  transErrorMinOrMaxDate,
} from './utils';
import { sharedProps, TimePickerMixin } from './shared';

const currentYear = new Date().getFullYear();
const [createComponent] = createNamespace('date-picker');

export default createComponent({
  mixins: [TimePickerMixin],

  props: {
    ...sharedProps,
    type: {
      type: String,
      default: 'datetime', // date | datetime
    },
    minDate: {
      type: [Date, String],
      default: () => new Date(currentYear - 20, 0, 1),
      validator: isDate,
    },
    maxDate: {
      type: [Date, String],
      default: () => new Date(currentYear + 20, 11, 31),
      validator: isDate,
    },
    converter: {
      type: String,
      default: 'format',
    },

    unit: {
      type: String,
      default: 'date',
    },
  },

  computed: {
    ranges() {
      if (this.type === 'datetime') {
        const {
          maxYear,
          maxDate,
          maxMonth,
          maxHour,
          maxMinute,
          maxSecond,
        } = this.getBoundary(
          'max',
          this.innerValue ? this.innerValue : this.minDate
        );

        const {
          minYear,
          minDate,
          minMonth,
          minHour,
          minMinute,
          minSecond,
        } = this.getBoundary(
          'min',
          this.innerValue ? this.innerValue : this.minDate
        );

        let result = [
          {
            type: 'year',
            range: [minYear, maxYear],
          },
          {
            type: 'month',
            range: [minMonth, maxMonth],
          },
          {
            type: 'day',
            range: [minDate, maxDate],
          },
          {
            type: 'hour',
            range: [minHour, maxHour],
          },
          {
            type: 'minute',
            range: [minMinute, maxMinute],
          },
        ];

        if (this.unit === 'second') {
          result.push({
            type: 'second',
            range: [minSecond, maxSecond],
          })
        }

        return result;
      }

      if (this.unit === 'year') { // 年度
        const {
          maxYear,
        } = this.getBoundary(
          'max',
          this.innerValue ? this.innerValue : this.minDate
        );

        const {
          minYear,
        } = this.getBoundary(
          'min',
          this.innerValue ? this.innerValue : this.minDate
        );

        return [
          {
            type: 'year',
            range: [minYear, maxYear],
          },
        ];
      } else if (this.unit === 'quarter') { // 季度
        const {
          maxYear,
        } = this.getBoundary(
          'max',
          this.innerValue ? this.innerValue : this.minDate
        );

        const {
          minYear,
        } = this.getBoundary(
          'min',
          this.innerValue ? this.innerValue : this.minDate
        );

        return [
          {
            type: 'year',
            range: [minYear, maxYear],
          },
          {
            type: 'quarter',
            range: [1, 4],
            format: (value) => `Q${value}`,
          },
        ];
      } else if (this.unit === 'month') {
        const {
          maxYear,
          maxMonth,
        } = this.getBoundary(
          'max',
          this.innerValue ? this.innerValue : this.minDate
        );

        const {
          minYear,
          minMonth,
        } = this.getBoundary(
          'min',
          this.innerValue ? this.innerValue : this.minDate
        );

        return [
          {
            type: 'year',
            range: [minYear, maxYear],
          },
          {
            type: 'month',
            range: [minMonth, maxMonth],
          },
        ];
      } else if (this.unit === 'week') {
        const {
          maxYear,
        } = this.getBoundary(
          'max',
          this.innerValue ? this.innerValue : this.minDate
        );

        const {
          minYear,
        } = this.getBoundary(
          'min',
          this.innerValue ? this.innerValue : this.minDate
        );

        return [
          {
            type: 'year',
            range: [minYear, maxYear],
          },
          {
            type: 'week',
            range: [1, 52],
            format: (value) => `W${value}`,
          },
        ];
      } else { // 默认日期（年月日）
        const {
          maxYear,
          maxMonth,
          maxDate,
        } = this.getBoundary(
          'max',
          this.innerValue ? this.innerValue : this.minDate
        );

        const {
          minYear,
          minMonth,
          minDate,
        } = this.getBoundary(
          'min',
          this.innerValue ? this.innerValue : this.minDate
        );

        return [
          {
            type: 'year',
            range: [minYear, maxYear],
          },
          {
            type: 'month',
            range: [minMonth, maxMonth],
          },
          {
            type: 'day',
            range: [minDate, maxDate],
          },
        ];
      }
    },
  },

  watch: {
    filter: 'updateInnerValue',
    minDate() {
      this.$nextTick(() => {
        this.updateInnerValue();
      });
    },
    maxDate(value) {
      if (this.innerValue.valueOf() >= value.valueOf()) {
        this.innerValue = value;
      } else {
        this.updateInnerValue();
      }
    },
    value: {
      handler(val) {
        // 将外部值转内部值
        this.innerValue = this.formatValue(val)
      },
      immediate: true,
    },
  },

  methods: {
    /**
     * 将外部value转成内部统一格式
     * @param {*} value
     * @returns {Date}
     */
    formatValue(value) {
      if (!isDate(value)) {
        try {
          if (!value || value === '') {
            value = new Date();
          } else {
            value = new Date(value);
          }
        } catch (e) {
          console.warn(e, 'error date');
          // 可能是2020/08这种格式，低版本iOS不兼容
          value = new Date(value.replace('/', '-'));
        }
      }

      if (!isDate(value)) {
        value = new Date();
      }

      // 此时value一定是Date类型
      if (this.type === 'datetime') {
        let minDate = transErrorMinOrMaxDate(this.minDate, 'min');
        let maxDate = transErrorMinOrMaxDate(this.maxDate, 'max');

        const dateMethods = {
          year: 'getFullYear',
          month: 'getMonth',
          day: 'getDate',
          hour: 'getHours',
          minute: 'getMinutes',
          second: 'getSeconds',
        };

        if (this.originColumns) {
          const dateColumns = this.originColumns.map(
            ({ type, values }, index) => {
              const { range } = this.ranges[index];
              const minDateVal = minDate[dateMethods[type]]();
              const maxDateVal = maxDate[dateMethods[type]]();
              const min = type === 'month' ? +values[0] - 1 : +values[0];
              const max =
                type === 'month'
                  ? +values[values.length - 1] - 1
                  : +values[values.length - 1];

              return {
                type,
                values: [
                  minDateVal < range[0]
                    ? Math.max(minDateVal, min)
                    : min || minDateVal,
                  maxDateVal > range[1]
                    ? Math.min(maxDateVal, max)
                    : max || maxDateVal,
                ],
              };
            }
          );

          const dates = Object.keys(dateMethods)
            .map(
              (type) =>
                dateColumns.filter((item) => item.type === type)[0]?.values
            )
            .filter((item) => item);
          minDate = new Date(...dates.map((val) => getTrueValue(val[0])));
          maxDate = new Date(...dates.map((val) => getTrueValue(val[1])));
        }

        value = Math.max(value, minDate.getTime());
        value = Math.min(value, maxDate.getTime());
        return new Date(value);
      }

      // date模式
      const getDates = (originColumns, ranges, dateMethods) => {
          const dateColumns = originColumns.map(
            ({ type, values }, index) => {
              const { range } = ranges[index];

              const minDateVal = dayjs(minDate)[dateMethods[type]]()
              const maxDateVal = dayjs(maxDate)[dateMethods[type]]()

              const min = +values[0];
              const max = +values[values.length - 1];

              return {
                type,
                values: [
                  minDateVal < range[0]
                    ? Math.max(minDateVal, min)
                    : min || minDateVal,
                  maxDateVal > range[1]
                    ? Math.min(maxDateVal, max)
                    : max || maxDateVal,
                ],
              };
            }
          );

          const dates = Object.keys(dateMethods).map((type) =>
              dateColumns.filter((item) => item.type === type)[0]?.values
          ).filter((item) => item);

          return dates;
      }

      let minDate = transErrorMinOrMaxDate(this.minDate, 'min');
      let maxDate = transErrorMinOrMaxDate(this.maxDate, 'max');
      if (this.unit === 'year') {
        const dateMethods = {
          year: 'year',
        };

        if (this.originColumns) {
          const dates = getDates(this.originColumns, this.ranges, dateMethods);
          const [[minYear, maxYear]] = dates;

          minDate = dayjs(minYear, 'YYYY').toDate()
          maxDate = dayjs(maxYear, 'YYYY').toDate()
        }
      } else if (this.unit === 'quarter') {
        const dateMethods = {
          year: 'year',
          quarter: 'quarter',
        };

        if (this.originColumns) {
          const dates = getDates(this.originColumns, this.ranges, dateMethods);
          const [[minYear, maxYear], [minQuarter, maxQuarter]] = dates;
          minDate = dayjs(`${minYear}-Q${minQuarter}`, 'YYYY-QQ').toDate()
          maxDate = dayjs(`${maxYear}-Q${maxQuarter}`, 'YYYY-QQ').toDate()
        }
      } else if (this.unit === 'month') {
        const dateMethods = {
          year: 'year',
          month: 'month',
        };

        if (this.originColumns) {
          const dates = getDates(this.originColumns, this.ranges, dateMethods);
          const [[minYear, maxYear], [minMonth, maxMonth]] = dates;
          minDate = dayjs(`${minYear}-${minMonth}`, 'YYYY-M').toDate()
          maxDate = dayjs(`${maxYear}-${maxMonth}`, 'YYYY-M').toDate()
        }
      } else if (this.unit === 'week') {
        const dateMethods = {
          year: 'year',
          week: 'isoWeek',
        };

        if (this.originColumns) {
          const dates = getDates(this.originColumns, this.ranges, dateMethods);
          const [[minYear, maxYear], [minWeek, maxWeek]] = dates;
          minDate = dayjs(`${minYear}-W${minWeek}`, 'GGGG-WWW').toDate()
          maxDate = dayjs(`${maxYear}-W${maxWeek}`, 'GGGG-WWW').toDate()
        }
      } else {
        const dateMethods = {
          year: 'year',
          month: 'month',
          day: 'date',
        };

        if (this.originColumns) {
          const dates = getDates(this.originColumns, this.ranges, dateMethods);
          const [[minYear, maxYear], [minMonth, maxMonth], [minDay, maxDay]] = dates;
          minDate = dayjs(`${minYear}-${minMonth}-${minDay}`, 'YYYY-M-D').toDate()
          maxDate = dayjs(`${maxYear}-${maxMonth}-${maxDay}`, 'YYYY-M-D').toDate()
        }
      }

      if (dayjs(value).isBefore(minDate)) {
        value = minDate;
      }

      if (dayjs(value).isAfter(maxDate)) {
        value = maxDate;
      }

      return dayjs(value).toDate();
    },

    getBoundary(type, value) {
      let boundary = this[`${type}Date`];
      boundary = transErrorMinOrMaxDate(boundary, type);

      const year = boundary.getFullYear();
      let month = 1;
      let date = 1;
      let hour = 0;
      let minute = 0;
      let second = 0

      if (type === 'max') {
        month = 12;
        date = getMonthEndDay(value.getFullYear(), value.getMonth() + 1);
        hour = 23;
        minute = 59;
        second = 59;
      }

      if (value.getFullYear() === year) {
        month = boundary.getMonth() + 1;
        if (value.getMonth() + 1 === month) {
          date = boundary.getDate();
          if (value.getDate() === date) {
            hour = boundary.getHours();
            if (value.getHours() === hour) {
              minute = boundary.getMinutes();
              if (value.getMinutes() === minute) {
                second = boundary.getSeconds();
              }
            }
          }
        }
      }

      return {
        [`${type}Year`]: year,
        [`${type}Month`]: month,
        [`${type}Date`]: date,
        [`${type}Hour`]: hour,
        [`${type}Minute`]: minute,
        [`${type}Second`]: second,
      };
    },

    updateInnerValue() {
      const indexes = this.getPicker().getIndexes();
      const getValue = (type) => {
        let index = 0;
        this.originColumns.forEach((column, columnIndex) => {
          if (type === column.type) {
            index = columnIndex;
          }
        });
        const { values } = this.originColumns[index];
        return getTrueValue(values[indexes[index]]);
      };

      if (this.type === 'datetime') {
        const year = getValue('year')
        const month = getValue('month')
        let day = getValue('day')

        const maxDay = getMonthEndDay(year, month);
        day = day > maxDay ? maxDay : day;

        const hour = getValue('hour');
        const minute = getValue('minute');

        let dateString = `${year}-${month}-${day} ${hour}:${minute}`;

        if (this.unit === 'second') {
          const second = getValue('second')
          dateString += `:${second}`
        }

        this.innerValue = this.formatValue(dayjs(dateString).toDate());
      } else {
        if (this.unit === 'year') {
          const year = getValue('year');
          this.innerValue = this.formatValue(dayjs(`${year}`, 'YYYY').toDate());
        } else if (this.unit === 'quarter') {
          const year = getValue('year')
          const quarter = getValue('quarter')

          this.innerValue = this.formatValue(dayjs(`${year}-Q${quarter}`, 'YYYY-QQ').toDate());
        } else if (this.unit === 'month') {
          const year = getValue('year')
          const month = getValue('month')

          this.innerValue = this.formatValue(dayjs(`${year}-${month}`).toDate());
        } else if (this.unit === 'week') {
          const year = getValue('year')
          const week = getValue('week')

          this.innerValue = this.formatValue(dayjs(`${year}-W${week}`, 'GGGG-WWW').toDate());
        } else {
          const year = getValue('year')
          const month = getValue('month')
          let day = getValue('day')

          const maxDay = getMonthEndDay(year, month);
          day = day > maxDay ? maxDay : day;

          this.innerValue = this.formatValue(dayjs(`${year}-${month}-${day}`).toDate());
        }
      }

      return this.innerValue;
    },

    onChange(picker) {
      this.updateInnerValue();

      this.$nextTick(() => {
        this.$nextTick(() => {
          // https://github.com/youzan/vant/issues/9775
          const value = this.updateInnerValue();
          this.$emit('change', picker, value);
        });
      });
    },

    updateColumnValue() {
      const value = this.innerValue ? this.innerValue : this.minDate;
      const date = dayjs(value);

      const values = this.originColumns.map((column) => {
        switch (column.type) {
          case 'year':
            return padZero(date.year())
          case 'quarter':
            return `Q${date.quarter()}`
          case 'month':
            return padZero(date.month() + 1)
          case 'week':
            return `W${date.isoWeek()}`
          case 'day':
            return padZero(date.date())
          case 'hour':
            return padZero(date.hour())
          case 'minute':
            return padZero(date.minute())
          case 'second':
            return padZero(date.second())
          default:
            // no default
            return null;
        }
      });

      this.$nextTick(() => {
        this.getPicker().setValues(values);
      });
    },
  },
});

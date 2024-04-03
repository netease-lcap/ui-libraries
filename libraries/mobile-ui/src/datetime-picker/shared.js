import { times, formatFu, valueFormat } from './utils';
import { padZero } from '../utils/format/string';
import { pickerProps } from '../picker/shared';
import Picker from '../picker';

export const sharedProps = {
  ...pickerProps,
  value: null,
  filter: Function,
  showToolbar: {
    type: Boolean,
    default: true,
  },
  formatter: {
    type: Function,
    default: (type, value) => value,
  },
  displayFormat: String,
  showFormatter: String,
  advancedFormatEnable: {
    type: Boolean,
    default: false,
  },
  advancedFormatValue: {
    type: String,
    default: '',
  },
  isNew: {
    type: Boolean,
    default: false,
  },
};

export const TimePickerMixin = {
  data() {
    return {
      innerValue: this.formatValue(this.value),
    };
  },

  computed: {
    originColumns() {
      return this.ranges.map(({
        type,
        range: rangeArr,
        format = value => padZero(value)
      }) => {
        let values = times(rangeArr[1] - rangeArr[0] + 1, (index) => {
          const value = format(rangeArr[0] + index);
          return value;
        });

        if (this.filter) {
          values = this.filter(type, values);
        }

        return {
          type,
          values,
        };
      });
    },

    columns() {
      return this.originColumns.map((column) => ({
        values: column.values.map((value) =>
          this.formatter(column.type, value)
        ),
      }));
    },
  },

  watch: {
    columns: 'updateColumnValue',

    innerValue(val, oldVal) {
      if (!oldVal) {
        this.$emit('input', null);
      } else {
        this.$emit('input', val);
      }
    },
  },

  mounted() {
    this.updateColumnValue();

    this.$nextTick(() => {
      this.updateInnerValue();
    });
  },

  methods: {
    // @exposed-api
    getPicker() {
      return this.$refs.picker;
    },

    cancel() {
      // readme: cancel->ref.cancel->oncancel
      this.$refs.picker.cancel();
    },
    confirm() {
      this.$refs.picker.confirm();
    },

    onConfirm() {
      if (this.readonly || this.disabled) {
        //
      } else {
        let value = this.innerValue;

        // 低代码可用type： date、 time、 datetime、 year-month(即将废弃)
        const isDateType = ['date', 'datetime'].includes(this.type);
        const useConverter =
          isDateType && ['json', 'timestamp', 'date'].includes(this.converter);

        if (useConverter) {
          if (this.converter === 'json') {
            value = new Date(value).toJSON();
          }
          if (this.converter === 'timestamp') {
            value = +new Date(value);
          }
          if (this.converter === 'date') {
            value = new Date(value);
          }
        } else {
          value = valueFormat(this.innerValue, this.type, true);
        }

        return value;
      }
    },
  },

  render() {
    const props = {};
    Object.keys(pickerProps).forEach((key) => {
      props[key] = this[key];
    });

    return (
      <Picker
        ref="picker"
        class={this.isNew ? 'van-picker--new' : ''}
        vusion-enable-click="true"
        toolbarPosition="none"
        // columns={this.columns}
        columnsprop={this.columns}
        readonly={this.readonly}
        disabled={this.disabled}
        scopedSlots={this.$scopedSlots}
        onChange={this.onChange}
        {...{ props }}
      />
    );
  },
};

export const validDisplayFormatters = {
  'date': {
    date: ['YYYY-MM-DD', 'M/D/YYYY', 'D/M/YYYY', 'YYYY年M月D日'],
    week: ['GGGG-WWWW', 'GGGG-W周', 'GGGG年第W周'],
    month: ['YYYY-MM', 'M/YYYY', 'YYYY年M月'],
    quarter: ['YYYY-QQ', 'YYYY年第Q季度', 'YYYY年QQ'],
    year: ['YYYY', 'YYYY年'],
  },
  'time': {
    minute: ['HH:mm', 'HH时mm分'],
    second: ['HH:mm:ss', 'HH时mm分ss秒'],
  },
  'datetime': {
    minute: ['YYYY-MM-DD HH:mm', 'YYYY年M月D日 HH时mm分'],
    second: ['YYYY-MM-DD HH:mm:ss', 'YYYY年M月D日 HH时mm分ss秒'],
  }
}

export const validUnit = {
  'date': ['date', 'week', 'month', 'quarter', 'year'],
  'time': ['minute', 'second'],
  'datetime': ['second', 'minute']
}

export const validType = ['date', 'time', 'datetime']

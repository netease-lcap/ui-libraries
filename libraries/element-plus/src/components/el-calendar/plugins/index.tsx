import _ from 'lodash';
import dayjs from 'dayjs';
import { CalendarProps } from 'element-plus';
import { useMemo, useControllableValue } from '@/plugins/hooks';
import { PluginAccumulateTypes } from '@/plugins/accumulate';

const CalendarAccumulate = new PluginAccumulateTypes<nasl.ui.ElCalendarOptions, CalendarProps>();
export default CalendarAccumulate.addPlugin({
  name: 'handleRange',
  handle: (props) => {
    const range = props.get('range') ?? '{}';
    const rangeProps = useMemo(() => {
      return _.isArray(range) ? { range: range.map((item) => new Date(item)) } : {};
    }, [range]);
    return {
      ...rangeProps,
    };
  },
}).addPlugin({
  name: 'handleValue',
  handle: (props) => {
    const [value, setValue] = useControllableValue(props);
    const modelValue = useMemo(
      () => _.match(value)
          .when(_.isString, () => new Date(value))
          .when(_.isDate, () => value)
          .otherwise(() => value),
      [value],
    );
    return {
      modelValue,
      'onUpdate:modelValue': (value) => {
        setValue(dayjs(value).format('YYYY-MM-DD'));
      },
    };
  },
});

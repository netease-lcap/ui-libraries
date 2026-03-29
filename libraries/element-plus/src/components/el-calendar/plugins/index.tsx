import _ from 'lodash';
import dayjs from 'dayjs';
import { CalendarProps } from 'element-plus';
import { useMemo, useControllableValue, useCallback, useRef } from '@/plugins/hooks';
import { PluginAccumulateTypes } from '@/plugins/accumulate';

import { useRequestDataSource, useHandleMapField, useFormatDataSource } from '@/plugins/common/dataSource';

const CalendarAccumulate = new PluginAccumulateTypes<nasl.ui.ElCalendarOptions<any, any, any, any, any>, CalendarProps>();
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
}).addPlugin({
  name: 'handleDataSource',
  handle: (props) => {
    const dataConfig = props.get('dataSource');
    const startKey = props.get('startKey') as unknown as string || 'startTime';
    const endKey = props.get('endKey') as unknown as string || 'endTime';
    const { data, run: reload, loading } = useRequestDataSource(dataConfig, {});
    const dataSource = useHandleMapField({
      dataSource: useFormatDataSource(data),
      fieldsMap: {
        startTime: startKey,
        endTime: endKey,
      },
    });
    return {
      data: dataSource,
    };
  },
}).addPlugin({
  name: 'handleSlots',
  handle: (props) => {
    const slots = props.get('slots');
    const showInDesigner = props.get('showInDesigner');
    // const cell = props.get('slotCell');
    const { cell = () => { },
    } = slots;
    const data = props.get('data');
    const dataRef = useRef(data);
    dataRef.value = data;
    const wrapCellRender = useCallback((data) => {
      const dataIsRender = _.find(dataRef.value, (item) => {
        if (dayjs(item?.startTime || '').isValid() && dayjs(item?.endTime || '').isValid()) {
          return dayjs(data?.day).isSame(item?.startTime, 'day')
            || dayjs(data?.day).isSame(item?.endTime, 'day')
            || (dayjs(data?.day).isAfter(item?.startTime, 'day') && dayjs(data?.day).isBefore(item?.endTime, 'day'));
        }
        return dayjs(data?.day).isSame(item?.startTime, 'day') || dayjs(data?.day).isSame(item?.endTime, 'day');
      });
      const isRender = showInDesigner ? true : dataIsRender;
      return isRender ? cell({ item: dataIsRender, ...data }) : null;
    }, [cell]);
    const dateCell = useCallback(({ data }) => {
      return (
        <div class="cw-date-cell">
          <div class={data.isSelected ? 'is-selected' : ''}>
            {dayjs(data.day).format('D')}
            {wrapCellRender(data)}
          </div>
        </div>
      );
    }, []);
    return {
      slots: {
        ...slots,
        'date-cell': dateCell,
      },
    };
  },
});

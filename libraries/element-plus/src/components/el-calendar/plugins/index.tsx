import _ from 'lodash';
import { ElConfigProvider } from 'element-plus';
import zhCn from 'element-plus/dist/locale/zh-cn.mjs';
import { $deletePropsList } from '@/plugins/constants';
import { useMemo } from '@/plugins/hooks';
import { useCallback } from '../../../plugins/hooks';

export * from './ide';

export function handleConfigProvider(props) {
  const Component = props.get('render');
  const render = useCallback((props, { attrs, slots }) => {
    return (
      <ElConfigProvider locale={zhCn}>
        <Component {...props} {...attrs} v-slots={slots} />
      </ElConfigProvider>
    );
  }, []);
  render.inheritAttrs = false;
  return {
    render,
  };
}
export function handleRange(props) {
  const range = props.get('range') ?? '{}';
  const rangeProps = useMemo(() => {
    const jsonRange = _.attempt(JSON.parse, range);
    return _.isArray(jsonRange) ? { range: jsonRange.map((item) => new Date(item)) } : {};
  }, [range]);
  return {
    ...rangeProps,
  };
}

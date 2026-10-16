import _ from 'lodash';
import { PluginAccumulateTypes } from '@/plugins/accumulate';
import { useCallback } from '@/plugins/hooks';

const FlexAccumulate = new PluginAccumulateTypes<nasl.ui.ElFlexOptions, any>();

export default FlexAccumulate.addPlugin({
  name: 'handleClassName',
  handle(props) {
    const classNameProps = props.get('class') ?? '';
    const mode = props.get('mode');
    const modeClass = mode === 'form-flex' ? 'el-form-flex' : '';
    const className = _.mergeClass(classNameProps, modeClass);
    return {
      class: className,
    };
  },
}).addPlugin({
  name: 'handleScroll',
  handle(props) {
    const onScroll = props.get('onScroll');
    const handleScroll = useCallback(
      (event: Event) => {
        const target = (event.currentTarget ?? event.target) as HTMLElement | null;
        return onScroll?.({
          scrollTop: target?.scrollTop ?? 0,
          scrollLeft: target?.scrollLeft ?? 0,
          scrollWidth: target?.scrollWidth ?? 0,
          scrollHeight: target?.scrollHeight ?? 0,
          clientWidth: target?.clientWidth ?? 0,
          clientHeight: target?.clientHeight ?? 0,
        });
      },
      [onScroll],
    );
    if (!onScroll) return {};
    return {
      onScroll: handleScroll,
    };
  },
});

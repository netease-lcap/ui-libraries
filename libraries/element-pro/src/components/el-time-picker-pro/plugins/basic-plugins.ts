import { TimeRangePicker } from '@element-pro';
import { type NaslComponentPluginOptions, $render } from '@lcap/vue2-utils';
import { isFunction, wrap } from 'lodash';

function useTimePickerValues(props) {

}

/* 组件功能扩展插件 */
export const useExtensPlugin: NaslComponentPluginOptions = {
  props: ['range', 'disableTimeFn'],
  setup(props) {
    const [disableTime, disableTimeFn] = props.get(['disableTime', 'disableTimeFn']);
    return {
      disabledTime: (h: number, m: number, s: number, context) => {
        if (!disableTimeFn) {
          return isFunction(disableTime) ? disableTime(h, m, s, context) : {};
        }
        const range = props.getEnd('range') || false;
        const current = {
          hour: h,
          minute: m,
          second: s,
          position: range && typeof context === 'object' && context.partial ? context.partial : undefined,
        };

        if (isFunction(disableTimeFn)) {
          return disableTimeFn(current);
        }

        return {};
      },
      [$render]: (resultVNode, h, context) => {
        const range = props.getEnd('range') || false;

        if (!range) {
          return resultVNode;
        }

        return h(TimeRangePicker, context.propsData, context.childrenNodes);
      },
    };
  },
};

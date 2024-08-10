/* 组件功能扩展插件 */
import { at } from 'lodash';
import Option from 'element-ui/lib/option';
export { useVModelSync, useDataSource, useInitialLoaded } from '@lcap/nasl-hoc-vue/index';

export const useRenderData = {
  props: ['valueField', 'textField', 'disabledField'],
  setup(props, { h }) {
    return {
      // 复写远程搜索函数
      remoteMethod: (query) => {
        const onLoadData = props.get('onLoadData');
        /**
         * 调用加载逻辑
         */
        onLoadData({
          filterText: query,
        });
      },
      slotDefault: () => {
        const data = props.get('data') || [];
        const slotDefault = props.get('slotDefault');
        if (!Array.isArray(data) || data.length === 0) {
          return typeof slotDefault === 'function' ? slotDefault() : null;
        }

        const textField = props.get('textField') || 'label';
        const valueField = props.get('valueField') || 'value';
        const disabledField = props.get('disabledField') || 'disabled';

        /**
         * 利用data，渲染el-option，这里默认数据源是 {label, value}
         */
        return data.map((d) => {
          const [label, value, disabled] = at(d, [textField, valueField, disabledField]);
          return h(Option, {
            key: d.value,
            attrs: {
              label,
              value,
              disabled,
            },
          })
        });
      }
    }
  },
  order: 8,
}

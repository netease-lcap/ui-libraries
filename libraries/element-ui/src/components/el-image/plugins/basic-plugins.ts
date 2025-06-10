/* eslint-disable no-shadow */
/* 组件功能扩展插件 */
import { NaslComponentPluginOptions } from '@lcap/vue2-utils/plugins';
import { Slot } from '@lcap/vue2-utils/plugins/types';
import { $ref, $render, createUseUpdateSync } from '@lcap/vue2-utils';
/* 组件功能扩展插件 */
// export { useVModelSync } from '@lcap/vue2-utils/plugins/index';

export const handleDateRange: NaslComponentPluginOptions = {
  setup: (props, { isDesigner }) => {
    const previewSrcList = props.useComputed(['previewSrcList'], (previewSrcList: any) => {
      const listRange = previewSrcList?.split(',');
      return Array.isArray(listRange) ? listRange : undefined;
    });
    return {
      previewSrcList,
      [$render]: (resultVNode, h, context) => {
        if (context.props?.isPlaceholder && isDesigner) {
          return props.get<Slot>('slotPlaceholder')();
        }

        return resultVNode;
      },
    };
  },
};

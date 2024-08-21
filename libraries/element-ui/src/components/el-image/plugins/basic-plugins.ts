/* eslint-disable no-shadow */
/* 组件功能扩展插件 */
import { NaslComponentPluginOptions } from '@lcap/vue2-utils/plugins';
/* 组件功能扩展插件 */
// export { useVModelSync } from '@lcap/vue2-utils/plugins/index';

export const handleDateRange: NaslComponentPluginOptions = {
  setup: (props) => {
    const previewSrcList = props.useComputed(['previewSrcList'], (previewSrcList: any) => {
      const listRange = previewSrcList?.split(',');
      return Array.isArray(listRange) ? listRange : undefined;
    });
    return {
      previewSrcList,
    };
  },
};

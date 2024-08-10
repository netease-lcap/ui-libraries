/* 组件功能扩展插件 */
export { useVModelSync } from '@lcap/nasl-hoc-vue/index';
import { NaslComponentPluginOptions } from '@/plugins/plugin';


export  const usePickerOptions: NaslComponentPluginOptions = {
    props: ['pickerSelectableRange', 'pickerFormat'],
    setup: (props) => {
      const pickerOptions = props.useComputed(['pickerSelectableRange', 'pickerFormat'], (selectableRange, format) => {
        if (!selectableRange && !format) {
          return null;
        }
        
        console.log(selectableRange, 'usePickerOptions---')
        return {
            selectableRange,
            format 
        }

      });
  
      return {
        pickerOptions,
      };
    },
    order: 2,
};

export const useSelectableRange2Array: NaslComponentPluginOptions = {
    props: ['pickerSelectableRange'],
    setup: (props) => {
      const pickerSelectableRange = props.useComputed('pickerSelectableRange', (selectableRange) => {
        if (!selectableRange) {
          return [];
        }
  
        if (Array.isArray(selectableRange)) {
          return selectableRange;
        }
        console.log(selectableRange, 'useSelectableRange2Array---')
        return selectableRange.split(',');
      });
  
      return {
        pickerSelectableRange,
      };
    },
    order: 1,
};
export const useTransferChange: NaslComponentPluginOptions  = {
    setup: (props) => {
      return {
        onChange: (value) => {
          // 获取当前绑定 change 事件
          const onChange = props.get('onChange');
  
          if (typeof onChange === 'function') {
            onChange({
              value
            });
          }
        }
      };
    },
    order: 2,
  }
// export const useSelectableRange2Array: NaslComponentPluginOptions = {
//     props: ['pickerSelectableRange'],
//     setup: (props) => {
//       const pickerSelectableRange = props.useComputed('pickerSelectableRange', (selectableRange) => {
//         if (!selectableRange) {
//           return [];
//         }
  
//         if (Array.isArray(selectableRange)) {
//           return selectableRange;
//         }
  
//         return selectableRange.split('-');
//       });
  
//       return {
//         pickerSelectableRange,
//       };
//     },
//     order: 1,
//   };
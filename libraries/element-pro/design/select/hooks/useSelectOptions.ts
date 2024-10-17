/**
 * Select 内部 option 处理
 * 将 slot 方式传入的 <el-option /> 元素与 prop 方式传入的 options 参数进行统一收编处理，便于数据管理和筛选
 */

import {
  ref, Ref, computed, onBeforeUpdate, ComponentInternalInstance, watch,
} from '@vue/composition-api';
import { VNode } from 'vue';
import get from 'lodash/get';
import {
  ElSelectProps, ElOptionProps, SelectOptionGroup, SelectValue,
} from '../type';
import { KeysType } from '../../common';
import Option from '../option';
import OptionGroup from '../optionGroup';

type UniOption = (ElOptionProps | SelectOptionGroup) & {
  index?: number;
  slots?: () => VNode;
};

export default function useSelectOptions(
  props: ElSelectProps,
  instance: ComponentInternalInstance,
  keys: Ref<KeysType>,
) {
  // 内部 options 记录
  const options = ref<UniOption[]>([]);

  // 指向当前 slots 数组，用来判断 slot 是否被更新
  let innerSlotRecord: VNode[] = null;

  const getOptions = () => {
    let dynamicIndex = 0;

    // 解析 props 中 options 字段的配置，以此初始化 innerOptions
    const innerOptions: UniOption[] = props.options?.map((option) => {
      const getFormatOption = (option: ElOptionProps) => {
        const { value, label, disabled } = keys.value;
        const res = {
          ...option,
          index: dynamicIndex,
          label: get(option, label),
          value: get(option, value),
          disabled: get(option, disabled),
        };
        dynamicIndex += 1;
        return res;
      };
      if ((option as SelectOptionGroup).group && (option as SelectOptionGroup).children) {
        return {
          ...option,
          children: (option as SelectOptionGroup).children.map((child) => getFormatOption(child)),
        };
      }
      return getFormatOption(option);
    }) || [];

    // props 中 options 参数优先级高于 slots
    if (props.options === undefined) {
      // 记录当前 slot 数组
      innerSlotRecord = instance.proxy.$slots.default;
      // 处理 slots 中 el-option 与 el-option-group
      const currentSlots = instance.proxy.$slots.default || [];
      currentSlots.forEach((child) => {
        const compoentName = (child.componentOptions.Ctor as any).options?.name;
        if (compoentName === Option.name) {
          // 独立选项
          innerOptions.push({
            // 单独处理 style 和 class 参数的透传
            class: child.data.staticClass,
            style: child.data.staticStyle,
            // 透传其他常规参数
            ...child.componentOptions.propsData,
            slots: () => child.componentOptions.children,
            index: dynamicIndex,
          } as ElOptionProps);
          dynamicIndex += 1;
        } else if (compoentName === OptionGroup.name) {
          // 分组选项
          const groupOption = {
            group: (child.componentOptions.propsData as ElOptionProps)?.label,
            ...child.componentOptions.propsData,
            children: [] as ElOptionProps[],
          };

          child.componentOptions.children?.forEach?.((groupChild) => {
            groupOption.children.push({
              // 单独处理 style 和 class 参数的透传
              class: groupChild.data.staticClass,
              style: groupChild.data.staticStyle,
              // 透传其他常规参数
              ...groupChild.componentOptions.propsData,
              slots: () => groupChild.componentOptions.children,
              index: dynamicIndex,
            } as ElOptionProps);
            dynamicIndex += 1;
          });

          innerOptions.push(groupOption);
        }
      });
    }

    options.value = innerOptions;
  };

  const optionsMap = computed(() => {
    const res = new Map<SelectValue, ElOptionProps>();
    optionsList.value.forEach((option: ElOptionProps) => {
      res.set(option.value, option);
    });
    return res;
  });

  const optionsList = computed(() => {
    const res: ElOptionProps[] = [];
    const getOptionsList = (options: ElOptionProps[]) => {
      options.forEach((option) => {
        if ((option as SelectOptionGroup).group) {
          getOptionsList((option as SelectOptionGroup).children);
        } else {
          res.push(option);
        }
      });
    };
    getOptionsList(options.value);
    return res;
  });

  // 组件初始化，构造内部 options 数组
  getOptions();
  // 监听 options 参数，变化时重新构造内部 options 数组
  watch(
    () => props.options,
    () => {
      getOptions();
    },
  );
  // 当组件 slot 变化时，重新构造内部 options 数组
  onBeforeUpdate(() => {
    if (props.options === undefined && innerSlotRecord !== instance.proxy.$slots.default) {
      getOptions();
    }
  });

  return {
    options,
    optionsMap,
    optionsList,
  };
}

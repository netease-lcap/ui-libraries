import { defineComponent, computed } from '@vue/composition-api';
import isObject from 'lodash/isObject';
import {
  ChevronLeftIcon as ElChevronLeftIcon,
  RoundIcon as ElRoundIcon,
  ChevronRightIcon as ElChevronRightIcon,
  ChevronUpIcon as ElChevronUpIcon,
  ChevronDownIcon as ElChevronDownIcon,
} from '@element-ui-icons';

import props from './pagination-mini-props';
import { usePrefixClass } from '../hooks/useConfig';
import { useGlobalIcon } from '../hooks/useGlobalIcon';
import ElButton from '../button';
import { JumperTrigger } from './type';

export default defineComponent({
  name: 'ElPaginationMini',

  props: { ...props },

  setup(props, { emit }) {
    const COMPONENT_NAME = usePrefixClass('pagination-mini');
    const {
      ChevronLeftIcon, RoundIcon, ChevronRightIcon, ChevronUpIcon, ChevronDownIcon,
    } = useGlobalIcon({
      ChevronLeftIcon: ElChevronLeftIcon,
      RoundIcon: ElRoundIcon,
      ChevronRightIcon: ElChevronRightIcon,
      ChevronUpIcon: ElChevronUpIcon,
      ChevronDownIcon: ElChevronDownIcon,
    });

    const titleConfig = computed<{
      prev?: string;
      current?: string;
      next?: string;
    }>(() => {
      if (isObject(props.tips)) return props.tips;
      if (props.tips === true) return { prev: '上一页', current: '当前', next: '下一页' };
      return {};
    });

    const disabledConfig = computed<{
      prev?: boolean;
      current?: boolean;
      next?: boolean;
    }>(() => {
      if (isObject(props.disabled)) return props.disabled;
      if (props.disabled === true) return { prev: true, current: true, next: true };
      return { prev: false, current: false, next: false };
    });

    function handleChange(context: { e: MouseEvent; trigger: JumperTrigger }) {
      emit('change', context);
      props.onChange?.(context);
    }

    return {
      COMPONENT_NAME,
      ChevronLeftIcon,
      RoundIcon,
      ChevronRightIcon,
      ChevronUpIcon,
      ChevronDownIcon,
      titleConfig,
      disabledConfig,
      handleChange,
    };
  },
  render() {
    const {
      COMPONENT_NAME,
      ChevronLeftIcon,
      RoundIcon,
      ChevronRightIcon,
      ChevronUpIcon,
      ChevronDownIcon,
      titleConfig,
      disabledConfig,
      handleChange,
    } = this;

    const jumperClass = [
      COMPONENT_NAME,
      {
        [`${COMPONENT_NAME}--outline`]: this.variant === 'outline',
      },
    ];

    return (
      <div class={jumperClass}>
        <ElButton
          title={titleConfig.prev}
          variant={this.variant}
          size={this.size}
          shape="square"
          onClick={(e: MouseEvent) => handleChange({ e, trigger: 'prev' })}
          icon={this.layout === 'horizontal' ? () => <ChevronLeftIcon /> : () => <ChevronUpIcon />}
          class={`${COMPONENT_NAME}__prev`}
          disabled={disabledConfig.prev}
        />

        {this.showCurrent && (
          <ElButton
            title={titleConfig.current}
            variant={this.variant}
            size={this.size}
            shape="square"
            onClick={(e: MouseEvent) => handleChange({ e, trigger: 'current' })}
            icon={() => <RoundIcon />}
            class={`${COMPONENT_NAME}__current`}
            disabled={disabledConfig.current}
          />
        )}

        <ElButton
          title={titleConfig.next}
          variant={this.variant}
          size={this.size}
          shape="square"
          onClick={(e: MouseEvent) => handleChange({ e, trigger: 'next' })}
          icon={this.layout === 'horizontal' ? () => <ChevronRightIcon /> : () => <ChevronDownIcon />}
          class={`${COMPONENT_NAME}__next`}
          disabled={disabledConfig.next}
        />
      </div>
    );
  },
});

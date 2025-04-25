import { defineComponent, computed, toRefs, ref } from '@vue/composition-api';
import { StarFilledIcon } from '@element-ui-icons';
import useVModel from '../hooks/useVModel';
import props from './props';
import { useConfig } from '../hooks/useConfig';
import Tooltip from '../tooltip/index';
import { renderElNodeJSXDefault } from '../utils/render-tnode';
import type { ElRateProps } from './type';

export default defineComponent({
  name: 'ElRate',

  props: { ...props },

  setup(props: ElRateProps) {
    const activeColor = Array.isArray(props.color) ? props.color[0] : props.color;
    let defaultColor = Array.isArray(props.color) ? props.color[1] : 'var(--el-bg-color-component)';

    if (props.distinguishColor) {
      defaultColor = props.voidColor || 'var(--el-bg-color-component)';
    }

    const { value: inputValue } = toRefs(props);
    const [starValue, setStarValue] = useVModel(inputValue, props.defaultValue, props.onChange, 'change');

    const hoverValue = ref(undefined);
    const rootRef = ref<HTMLTableElement>();
    const { classPrefix } = useConfig('classPrefix');

    const displayValue = computed(() => Number(hoverValue.value || starValue.value));
    const displayText = computed(() =>
      props.texts.length === 0 ? ['极差', '失望', '一般', '满意', '惊喜'] : props.texts,
    );
    const displayScore = computed(() => {
      if (!props.showScore) return '';
      const template = props.scoreTemplate;
      const valueToDisplay = Number.isNaN(displayValue.value) ? 0 : displayValue.value || 0;
      return template.replace('{value}', String(valueToDisplay));
    });

    const getActiveColor = (value: number) => {
      const { colors } = props;

      if (!props.distinguishColor) {
        return activeColor;
      }
      if (value <= (props.lowThreshold ?? 2)) return colors?.[0];
      if (value <= (props.highThreshold ?? 4)) return colors?.[1];
      return colors?.[2];
    };
    const getStarValue = (event: MouseEvent, index: number) => {
      if (props.allowHalf) {
        const { left } = rootRef.value?.getBoundingClientRect?.();
        const firstStar = rootRef.value.firstChild.nextSibling as HTMLElement;
        const { width } = firstStar?.getBoundingClientRect?.();
        const { clientX } = event;
        const starMiddle = width * (index - 0.5) + props.gap * (index - 1);

        if (clientX - left >= starMiddle) return index;
        if (clientX - left < starMiddle) return index - 0.5;
      }

      return index;
    };

    const mouseEnterHandler = (event: MouseEvent, index: number) => {
      if (props.disabled) return;
      hoverValue.value = getStarValue(event, index);
    };

    const mouseLeaveHandler = () => {
      if (props.disabled) return;
      hoverValue.value = undefined;
    };

    const clickHandler = (event: MouseEvent, index: number) => {
      if (props.disabled) return;
      const value = getStarValue(event, index);
      if (props.clearable && value === starValue.value) {
        hoverValue.value = undefined;
        setStarValue(null);
      } else {
        setStarValue(value);
      }
    };

    const getStarCls = (index: number) => {
      if (props.allowHalf && index + 0.5 === displayValue.value) return `${classPrefix.value}-rate__item--half`;
      if (index >= displayValue.value) return '';
      if (index < displayValue.value) return `${classPrefix.value}-rate__item--full`;
    };

    const activeIconStyle = computed(() => ({
      fontSize: props.size,
      color: getActiveColor(displayValue.value),
    }));

    const inactiveIconStyle = computed(() => ({
      fontSize: props.size,
      color: defaultColor,
    }));
    return {
      classPrefix,
      mouseLeaveHandler,
      getStarCls,
      clickHandler,
      mouseEnterHandler,
      activeColor,
      defaultColor,
      displayText,
      displayValue,
      rootRef,
      activeIconStyle,
      inactiveIconStyle,
      displayScore,
    };
  },
  methods: {
    renderRateIcon() {
      return renderElNodeJSXDefault(this, 'icon', <StarFilledIcon />);
    },
  },
  render() {
    const {
      classPrefix,
      mouseLeaveHandler,
      getStarCls,
      clickHandler,
      mouseEnterHandler,
      displayText,
      displayValue,
      displayScore,
    } = this;

    return (
      <div class={`${classPrefix}-rate`} onMouseleave={mouseLeaveHandler}>
        <ul class={`${classPrefix}-rate__list`} style={{ gap: `${this.gap}px` }} ref="rootRef">
          {[...Array(Number(this.count))].map((_, index) => (
            <li
              key={index}
              class={[`${classPrefix}-rate__item`, getStarCls(index)]}
              onClick={(event: MouseEvent) => clickHandler(event, index + 1)}
              onMousemove={(event: MouseEvent) => mouseEnterHandler(event, index + 1)}>
              {(this.showText || this.showScore) ? (
                <Tooltip key={index} content={this.showScore ? displayScore : displayText[displayValue - 1]}>
                  <div class={`${classPrefix}-rate__star-top`} style={{ ...this.activeIconStyle }}>
                    {this.renderRateIcon()}
                  </div>
                  <div
                    class={`${classPrefix}-rate__star-bottom`}
                    style={{
                      ...this.inactiveIconStyle,
                    }}>
                    {this.renderRateIcon()}
                  </div>
                </Tooltip>
              ) : (
                <div>
                  <div
                    class={`${classPrefix}-rate__star-top`}
                    style={{
                      ...this.activeIconStyle,
                    }}>
                    {this.renderRateIcon()}
                  </div>
                  <div
                    class={`${classPrefix}-rate__star-bottom`}
                    style={{
                      ...this.inactiveIconStyle,
                    }}>
                    {this.renderRateIcon()}
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
        {(this.showText || this.showScore) && (
          <div class={`${classPrefix}-rate__text`}>{this.showScore ? displayScore : displayText[displayValue - 1]}</div>
        )}
      </div>
    );
  },
});

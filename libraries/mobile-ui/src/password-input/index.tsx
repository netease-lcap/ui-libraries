// Utils
import { createNamespace, addUnit } from '../utils';
import { emit, inherit } from '../utils/functional';
import { BORDER_BOTTOM, BORDER_LEFT, BORDER_SURROUND } from '../utils/constant';

// Types
import { CreateElement, RenderContext } from 'vue/types';
import { DefaultSlots } from '../utils/types';

export type PasswordInputProps = {
  mask: boolean;
  info?: string;
  value: string;
  length: number | string;
  gutter: number;
  focused?: boolean;
  errorInfo?: string;
  readonly?: boolean;
  disabled?: boolean;
};

const [createComponent, bem] = createNamespace('password-input');

function PasswordInput(
  h: CreateElement,
  props: PasswordInputProps,
  slots: DefaultSlots,
  ctx: RenderContext<PasswordInputProps>
) {
  const { mask, value, length, gutter, focused, errorInfo, readonly, disabled } = props;
  const info = errorInfo || props.info;

  const Points = [];
  for (let i = 0; i < length; i++) {
    const char = value[i];
    const showBorder = !gutter;
    const showCursor = focused && i === value.length;

    let style;
    if (i !== 0 && gutter) {
      style = { marginLeft: addUnit(gutter) };
    }

    Points.push(
      <li
        class={[{ [BORDER_SURROUND]: showBorder }, bem('item', { focus: showCursor, dis: disabled })]}
        style={style}
      >
        {mask ? (
          <i style={{ visibility: char ? 'visible' : 'hidden' }} />
        ) : (
          char
        )}
        {showCursor && <div class={bem('cursor')} />}
      </li>
    );
  }

  return (
    <div class={bem()}>
      <ul
        class={[bem('security'), { [BORDER_SURROUND]: false &&!gutter }]}
        onTouchstart={(event: TouchEvent) => {
          event.stopPropagation();
          emit(ctx, 'focus', event);
        }}
        {...inherit(ctx, true)}
      >
        {Points}
      </ul>
      {info && <div class={bem(errorInfo ? 'error-info' : 'info')}>{info}</div>}
    </div>
  );
}

PasswordInput.props = {
  info: String,
  gutter: [Number, String],
  focused: Boolean,
  errorInfo: String,
  mask: {
    type: Boolean,
    default: true,
  },
  value: {
    type: String,
    default: '',
  },
  length: {
    type: [Number, String],
    default: 6,
  },
  readonly: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
};

export default createComponent<PasswordInputProps>(PasswordInput);

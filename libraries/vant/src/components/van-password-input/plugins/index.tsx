export function handlePasswordInputStyle(props) {
  const gutter = props.get('gutter') ?? '0px';
  const size = props.get('size') ?? '35px';
  const color = props.get('color') ?? '#1989fa';
  const backgroundColor = props.get('backgroundColor') ?? '#f2f3f5';
  const borderColor = props.get('borderColor') ?? '#ebedf0';
  const borderRadius = props.get('borderRadius') ?? '4px';

  return {
    style: {
      '--password-input-gutter': gutter,
      '--password-input-size': size,
      '--password-input-color': color,
      '--password-input-background-color': backgroundColor,
      '--password-input-border-color': borderColor,
      '--password-input-border-radius': borderRadius,
    },
  };
}

export function handlePasswordInputProps(props) {
  const modelValue = props.get('modelValue') ?? '';
  const length = props.get('length') ?? 6;
  const placeholder = props.get('placeholder') ?? '请输入密码';
  const disabled = props.get('disabled') ?? false;
  const readonly = props.get('readonly') ?? false;
  const autofocus = props.get('autofocus') ?? false;
  const mask = props.get('mask') ?? true;
  const showCursor = props.get('showCursor') ?? true;
  const error = props.get('error') ?? false;
  const errorMessage = props.get('errorMessage');
  const maxlength = props.get('maxlength');
  const minlength = props.get('minlength');
  const required = props.get('required') ?? false;
  const name = props.get('name');

  return {
    modelValue,
    length,
    placeholder,
    disabled,
    readonly,
    autofocus,
    mask,
    showCursor,
    error,
    errorMessage,
    maxlength,
    minlength,
    required,
    name,
  };
}

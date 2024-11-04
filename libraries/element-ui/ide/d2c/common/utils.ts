/**
 * 输入 style obj 返回行内样式字符串
 */
export function styleObjToStr(style: { [key: string]: string | undefined }) {
  const { customStyle } = style;
  delete style.customStyle;
  const styleStr = Object.entries(style)
    .filter(([, value]) => value)
    .map(([key, value]) => `${key}: ${value}`)
    .join('; ');
  if (customStyle) {
    return `${styleStr}; --custom-start: auto; ${customStyle}`;
  }
  return styleStr;
}

export function styleStrToObj(style: string) {
  // 按照 --custom-start 分割
  const [styleStr, customStyle] = style.split('--custom-start:');
  const styleObj: { [key: string]: string } = {};
  styleStr.split(';').forEach((item) => {
    const [key, value] = item.split(':');
    if (key && value) {
      styleObj[key.trim()] = value.trim();
    }
  });
  styleObj.customStyle = customStyle;
  return styleObj;
}

export function randomString(str: string) {
  // 相同的输入，输出相同的结果，只能包括数字和字母
  let hash = 0;
  if (str.length === 0) return hash;
  for (let i = 0; i < str.length; i += 1) {
    const char = str.charCodeAt(i);
    hash = (hash * 32) - hash + char;
    // eslint-disable-next-line no-bitwise
    hash &= hash;
  }
  return hash.toString(36).replace(/[^\w]+/g, '');
}

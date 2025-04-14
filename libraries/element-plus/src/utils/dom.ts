import { $rootStyle } from '@/plugins/constants';

export function setElStyle(style: Record<string, any>, el: HTMLElement) {
  const exclude = ['zIndex', 'postion', 'left', 'right', 'top', 'bottom'];

  Object.keys(style).forEach((key) => {
    if (exclude.includes(key)) {
      return;
    }

    el.style[key] = style[key];
  });
}

export function categoryStyles(style: Record<string, string> = {}) {
  return Object.entries(style).reduce(
    (acc, [key, value]) => {
      const styleKey = $rootStyle.includes(key) ? 'style' : 'innerStyle';
      acc[styleKey][key] = value;
      return acc;
    },
    { style: {}, innerStyle: {} },
  );
}

import _ from 'lodash';
import { $rootStyle, $bothStyle } from '@/plugins/constants';

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
      if ($bothStyle.includes(key)) {
        acc.style[key] = value;
        acc.innerStyle[key] = value;
        return acc;
      }
      acc[styleKey][key] = value;
      return acc;
    },
    { style: {}, innerStyle: {} },
  );
}

export function categoryProps(props: Record<string, any> = {}) {
  const matches = (str: string) => /^(data-|ide-)/.test(str);
  const propsWithDataStart = Object.keys(props).reduce((outerProps: Record<string, any>, key) => {
    return matches(key) ? _.assign(outerProps, { [key]: props[key] }) : outerProps;
  }, {});
  return {
    outerProps: propsWithDataStart,
    innerProps: props.isInForm ? propsWithDataStart : _.omit(props, ['data-nodepath']),
  };
}

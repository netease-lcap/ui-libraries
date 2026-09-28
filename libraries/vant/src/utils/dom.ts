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
    outerProps: props.isInForm ? _.omit(props, []) : propsWithDataStart,
    innerProps: propsWithDataStart,
  };
}

export function addClass(
  className: string,
  addClass: string | string[] | Record<string, boolean> | undefined | null,
): string {
  if (!addClass) {
    return className;
  }

  const existingClasses = className ? className.split(' ').filter(Boolean) : [];
  const newClasses: string[] = [];

  // 处理字符串类型
  if (typeof addClass === 'string') {
    newClasses.push(...addClass.split(' ').filter(Boolean));
  } else if (Array.isArray(addClass)) {
    // 处理数组类型
    newClasses.push(...addClass.filter(Boolean));
  } else if (typeof addClass === 'object') {
    // 处理对象类型 { 'class-name': true/false }
    Object.entries(addClass).forEach(([key, value]) => {
      if (value) {
        newClasses.push(key);
      }
    });
  }

  // 合并现有类名和新类名，去重
  const allClasses = [...existingClasses, ...newClasses];
  const uniqueClasses = [...new Set(allClasses)];

  return uniqueClasses.join(' ');
}

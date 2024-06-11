import generate from '@babel/generator';
import { lowerFirst } from 'lodash';
import logger from './logger';

export const evalOptions = (object) => {
  const { code } = generate(object);
  // eslint-disable-next-line no-eval
  const result = eval(`(${code})`);
  if (result.if) {
    result.if = result.if.toString();
    result.tsIf = result.if;
  }

  if (result.disabledIf) {
    result.disabledIf = result.disabledIf.toString();
    result.tsDisabledIf = result.disabledIf;
  }

  if (result.onChange) {
    result.onChange.forEach((item) => {
      if (item.if) item.if = item.if.toString();
    });

    result.tsOnChange = JSON.stringify(result.onChange);
  }

  if (result.designerValue) {
    result.tsDesignerValue = JSON.stringify(result.designerValue);
  }

  return result;
};

export const getNodeCode = (node) => {
  try {
    const { code: text = '' } = generate(node);
    return text.replace(/\n/g, ' ');
  } catch (e) {
    logger.warn(`生成code 错误，${JSON.stringify(node)}`);
  }
  return '';
};

export const getJSXNameByNode = (node) => {
  if (!node || !node.name || node.name.type !== 'JSXIdentifier') {
    return '';
  }

  return node.name.name;
};

export const getSlotName = (slotName) => {
  if (!slotName) {
    return '';
  }

  const slotRegex = /^slot[A-Z].*/;
  if (slotRegex.test(slotName)) {
    return lowerFirst(slotName.substring(4));
  }

  const slotPrefix = 'slot-';
  if (slotName.startsWith(slotPrefix)) {
    return slotName.substring(slotPrefix.length);
  }

  return slotName;
};

import generate from '@babel/generator';
import logger from './logger';

export const evalOptions = (object) => {
  const { code } = generate(object);
  // eslint-disable-next-line no-eval
  const result = eval(`(${code})`);
  if (result.if) result.if = result.if.toString();
  if (result.disabledIf) result.disabledIf = result.disabledIf.toString();
  if (result.onChange) {
    result.onChange.forEach((item) => {
      if (item.if) item.if = item.if.toString();
    });
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

import babelGenerator from '@babel/generator';
import * as logger from './logger.mjs';

const generator = babelGenerator.default;

export const getNodeCode = (node) => {
  try {
    const { code: text = '' } = generator(node);
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

import generate from '@babel/generator';

export const getNodeCode = (node) => {
  try {
    const { code: text = '' } = generate(node);
    return text.replace(/\n/g, ' ');
  } catch (e) {
    throw new Error(`生成code 错误，${JSON.stringify(node)}`);
  }
};

export const normalizeArray = (arr) => {
  if (!arr) {
    return [];
  }

  return Array.isArray(arr) ? arr : [arr];
};

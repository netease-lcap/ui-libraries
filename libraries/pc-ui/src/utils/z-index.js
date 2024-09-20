let n = 7000;

export const zIndex = () => {
  if (typeof window !== 'undefined' && window.__TESTING__) {
    return '';
  }
  // eslint-disable-next-line no-plusplus
  return n++;
};

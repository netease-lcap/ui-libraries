
export const isEmptyVNodes = (vnodes) => {
  if (!vnodes || (Array.isArray(vnodes) && vnodes.length === 0)) {
    return true;
  }

  if (!Array.isArray(vnodes)) {
    return false;
  }

  const arr = vnodes.flat();

  return arr.filter((v) => !!v).length === 0;
}

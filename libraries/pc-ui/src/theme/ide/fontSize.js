export function getLineHeight(fontSize) {
  return (fontSize + 8) / fontSize;
}

export default function getFontSizes(base) {
  const fontSizes = [];
  let posValue;
  for(let i = 1; i < 10; i++) {
    if (i === 1) {
      posValue = base - 2;
    } else if (i === 9) {
      posValue += 8;
    } else if (i > 6) {
      posValue += 12;
    } else if (i > 5) {
      posValue += 4;
    } else {
      posValue += 2;
    }
    fontSizes.push(posValue);
  }


  return fontSizes.map((size) => ({
    size,
    lineHeight: getLineHeight(size),
  }));
}

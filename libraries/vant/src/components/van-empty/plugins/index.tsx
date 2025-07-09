export function handleEmptyStyle(props) {
  const imageWidth = props.get('imageWidth') ?? '160px';
  const imageHeight = props.get('imageHeight') ?? '160px';
  const descriptionColor = props.get('descriptionColor') ?? '#969799';
  const descriptionFontSize = props.get('descriptionFontSize') ?? '14px';
  const bottomMarginTop = props.get('bottomMarginTop') ?? '24px';

  return {
    style: {
      '--empty-image-width': imageWidth,
      '--empty-image-height': imageHeight,
      '--empty-description-color': descriptionColor,
      '--empty-description-font-size': descriptionFontSize,
      '--empty-bottom-margin-top': bottomMarginTop,
    },
  };
}

export function handleEmptyImage(props) {
  const image = props.get('image') ?? 'default';
  const customImage = props.get('customImage');

  if (customImage) {
    return { image: customImage };
  }

  return { image };
}

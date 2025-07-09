export function handleCircleStyle(props) {
  const size = props.get('size') ?? '100px';
  const textColor = props.get('textColor') ?? '#323233';
  const textSize = props.get('textSize') ?? '14px';
  const textPosition = props.get('textPosition') ?? 'center';

  return {
    style: {
      '--circle-size': size,
      '--circle-text-color': textColor,
      '--circle-text-size': textSize,
      '--circle-text-position': textPosition,
    },
  };
}

export function handleCircleProps(props) {
  const value = props.get('value') ?? 0;
  const rate = props.get('rate') ?? 100;
  const strokeWidth = props.get('strokeWidth') ?? 40;
  const color = props.get('color') ?? '#337eff';
  const layerColor = props.get('layerColor') ?? '#E5E5E5';
  const fill = props.get('fill') ?? '#ffffff';
  const text = props.get('text');
  const speed = props.get('speed') ?? 0;
  const clockwise = props.get('clockwise') ?? true;
  const strokeLinecap = props.get('strokeLinecap') ?? 'round';
  const showText = props.get('showText') ?? true;

  return {
    value,
    rate,
    strokeWidth,
    color,
    layerColor,
    fill,
    text,
    speed,
    clockwise,
    strokeLinecap,
    showText,
  };
}

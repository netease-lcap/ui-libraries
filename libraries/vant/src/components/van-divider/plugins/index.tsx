export function handleDividerStyle(props) {
  const color = props.get('color') ?? '#dcdee0';
  const fontSize = props.get('fontSize') ?? '14px';
  const borderStyle = props.get('borderStyle') ?? 'solid';
  const marginLeft = props.get('marginLeft') ?? '16px';
  const marginRight = props.get('marginRight') ?? '16px';

  return {
    style: {
      color,
      fontSize,
      borderStyle,
      marginLeft,
      marginRight,
    },
  };
}

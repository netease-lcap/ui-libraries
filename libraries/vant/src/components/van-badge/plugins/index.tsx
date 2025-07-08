export function handleLeftOffset(props) {
  const leftOffset = props.get('leftOffset') ?? 0;
  const topOffset = props.get('topOffset') ?? 0;
  return {
    offset: [leftOffset, topOffset],
  };
} 
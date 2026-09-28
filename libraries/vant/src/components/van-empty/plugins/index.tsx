export function handleCustomImage(props) {
  const customImage = props.get('customImage');
  const image = props.get('image');
  return {
    image: customImage || image,
  };
}

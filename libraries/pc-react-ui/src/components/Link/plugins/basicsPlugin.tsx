export function useHandleLink(props) {
  const destination = props.get('destination');
  return {
    href: destination,
  };
}

import { useMemo } from '@/plugins/hooks';

export * from './ide';

export function handleHeader(props) {
  const slots = props.get('slots');
  const header = slots.header().map((item) => {
    return {
      ...item,
      props: {
        ...item.props,
        style: {
          ...item.props.style,
          width: '100%',
          color: 'red',
        },
      },
    };
  });
  console.log(header, 'header');

  return {
    slots: {
      ...slots,
      header: () => header,
    },
  };
}

import _ from 'lodash';

export function useHandleNodePath(props) {
  const nodePath = props.get('data-nodepath');
  const onOpenChangeProps = props.get('onOpenChange');
  return {
    onOpenChange: _.wrap(onOpenChangeProps, (onOpenChange, ...args) => {
      setTimeout(() => {
        const element = document.querySelectorAll('.ant-popover');
        _.forEach(element, (item) => item.setAttribute('data-nodepath', nodePath));
      }, 1000);
      _.attempt(onOpenChangeProps, ...args);
    }),
  };
}

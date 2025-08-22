import _ from 'lodash';
import { useEffect } from '@/plugins/hooks';

export function handleDefaultSlot(props) {
  const slots = props.get('slots');
  return {
    render: slots?.default,
  };
}

export function handleStyle(props) {
  const contentClassName = props.get('contentClassName');
  const style = props.get('style');
  useEffect(() => {
    const nodes = document.querySelectorAll(`.${contentClassName}`);
    if (!nodes) return;
    _.forEach(_.keys(style), (key) => {
      _.forEach(nodes, (node) => {
        (node as HTMLElement).style[key] = style[key];
      });
    });
  }, [contentClassName, style]);
  return {};
}

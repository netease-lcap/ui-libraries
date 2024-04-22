import classnames from 'classnames';
import { $deletePropsList } from '@/plugins/constants';

export function useHandleLink(props) {
  const deletePropsList = props.get($deletePropsList).concat(['destination', 'link']);
  const destination = props.get('destination');
  const link = props.get('link');
  return {
    [$deletePropsList]: deletePropsList,
    href: destination ?? link,
  };
}

export function useHandleThemeStyle(props) {
  const className = props.get('className');
  return {
    className: classnames('cw-link cw-link-css-var', className),
  };
}

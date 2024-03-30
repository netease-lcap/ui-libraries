import React from 'react';
import _ from 'lodash';
// import { theme, Layout } from 'antd';
// import { useNavigate, Link } from 'react-router-dom';
import { MenuItem } from '@/index';

// const { Header, Content, Footer } = Layout;

function useHandleRouter(props) {
  const onClickPorps = props.get('onClick');

  return {
    onClick: _.wrap(onClickPorps, (fn, arg) => {
      _.attempt(fn, arg);
      if (_.isValidLink(arg.key)) {
        window.location.href = arg.key;
        return;
      }
      const event = new CustomEvent('pageNavigation', {
        detail: {
          url: arg.key,
        },
      });
      window.dispatchEvent(event);
    }),
  };
}

export function useHandleMenuSlot(props) {
  const fragment = props.get('menuSlot');
  const menuSlot = React.Children.toArray(_.get(fragment, 'props.children.props.children', []));
  function childToJson(children) {
    return _.map(children, (child) => {
      if (child?.type === MenuItem) {
        const selfChildren = _.isNil(child.props.children) ? {} : { children: childToJson(child.props.children) };
        const childrenProps = _.isEmpty(selfChildren.children) ? { children: undefined } : selfChildren;
        const onClickPorps = child.props.onClick;
        return {
          key: child.key,
          ...child.props,
          ...childrenProps,
          onClick: _.wrap(onClickPorps, (fn, arg) => {
            _.attempt(fn, arg);
            if (_.isValidLink(arg.key)) {
              window.location.href = arg.key;
              return;
            }
            const event = new CustomEvent('pageNavigation', {
              detail: {
                url: arg.key,
              },
            });
            window.dispatchEvent(event);
          }),
        };
      }
      return undefined;
    }).filter(Boolean);
  }
  const items = childToJson(menuSlot);

  console.log(menuSlot, items, 'menuSlot');
  return {
    menuProps: { items },

  };
}

export function useHandleAvatar(props) {
  const avatarSrcProps = props.get('avatarSrc');
  const avatarTitleProps = props.get('avatarTitle');
  const avatarSizeProps = props.get('avatarSize');
  const AvatarRenderProps = props.get('avatarRender');
  const avatarRender = React.isValidElement(AvatarRenderProps) ? undefined : (_props, dom) => React.cloneElement(AvatarRenderProps, { children: dom });
  return {
    avatarProps: _.filterUnderfinedValue({
      src: avatarSrcProps,
      size: avatarSizeProps,
      title: avatarTitleProps,
      render: avatarRender,
    }),
    menuDataRender: (menuData) => {
      return [{ name: 2, label: 1, path: '/a' }];
    },
  };
}

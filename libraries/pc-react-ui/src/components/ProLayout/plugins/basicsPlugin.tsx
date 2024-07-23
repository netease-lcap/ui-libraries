import React from 'react';
import _ from 'lodash';
import classnames from 'classnames';

// import { theme, Layout } from 'antd';
// import { useNavigate, Link } from 'react-router-dom';
import F from 'futil';

import { ConfigProvider } from 'antd';
import { useControllableValue } from 'ahooks';
import { useHandleLink } from '@/plugins/common/index';
import { Icon, MenuItem } from '@/index';
import { $deletePropsList } from '@/plugins/constants';
import style from '../index.module.less';
import { RouterContext } from '@/components/Router';

// const { Header, Content, Footer } = Layout;
export function useHandleStyle(props) {
  const className = props.get('className');
  return {
    className: classnames(style.proLayout, className),
  };
}

export function useHandleMenuOpenKey(props) {
  const menuProps = props.get('menuProps');
  const { useLocation } = React.useContext(RouterContext);
  const location = useLocation?.();
  const ref = props.get('ref');
  const openKeysProps = props.get('openKeys');
  const defaultOpenKeys = props.get('defaultOpenKeys');
  const onOpenChangeProps = props.get('onOpenChange');
  const [openKeys, setValue] = useControllableValue(_.filterUnderfinedValue({ value: openKeysProps, defaultValue: defaultOpenKeys, onChange: onOpenChangeProps }));
  React.useEffect(() => {
    const path = location?.pathname.split('/');
    setValue(path);
  }, [location?.pathname]);
  const selfRef = React.useMemo(() => ({
    ...ref,
    openKeys,
    setValue: (el) => {
      const value = F.toggleElement(el, React.Children.toArray(openKeys));
      setValue(value);
    },
  }), [setValue, openKeys, ref]);
  return {
    menuProps: {
      ...menuProps,
      autoClose: false,
      onOpenChange: (el) => {
        setValue(el);
      },
      className: 'cw-nasl',
    },
    openKeys: React.Children.toArray(openKeys),
    ref: selfRef,
    onCollapse: setValue,
  };
}
export function useHandleSelectKey(props) {
  const menuProps = props.get('menuProps');
  const { useLocation } = React.useContext(RouterContext);
  const location = useLocation?.();
  // const ref = props.get('ref');
  const selectedKeysProps = props.get('selectedKeys');
  const defaultOpenKeysProps = props.get('defaultSelectedKeys');
  const onSelectProps = props.get('onSelect');
  const [selectedKeys, setSelectedKeys] = useControllableValue(_.filterUnderfinedValue({ value: selectedKeysProps, defaultValue: defaultOpenKeysProps, onChange: onSelectProps }));
  React.useEffect(() => {
    const path = location?.pathname.split('/');
    setSelectedKeys(path);
  }, [location?.pathname]);
  return {
    menuProps: {
      ...menuProps,
      onSelect: setSelectedKeys,
    },
    selectedKeys: React.Children.toArray(selectedKeys),
  };
}
export function useHandleMenuSlot(props) {
  const { useNavigate, useLocation } = React.useContext(RouterContext);
  const location = useLocation?.();
  const fragment = props.get('menuSlot');
  const menuProps = props.get('menuProps');
  const menuSlot = React.Children.toArray(_.get(fragment, 'props.children', []));
  const handleLink = useHandleLink();
  let timeer = null;
  function childToJson(children) {
    return React.Children.map(children, (child) => {
      if (child?.type === MenuItem) {
        const selfChildren = _.isNil(child.props.children) ? {} : { children: childToJson(child.props.children) };
        const childrenProps = _.isEmpty(selfChildren.children) ? {} : selfChildren;
        const onClickPorps = child.props.onClick;
        const icon = _.isNil(child.props.icon) ? {} : { icon: <Icon name={child.props.icon} /> };
        const label = child.props.labelIsSlot ? child.props.labelSlot : child.props.label;
        console.log(child.props, 'props');
        const destination = child.props?.destination;
        return {
          key: destination ?? child.props?.path,
          ...child.props,
          ...childrenProps,
          ...icon,
          label,
          onClick: _.wrap(onClickPorps, (fn, arg) => {
            if (_.isFunction(fn)) {
              _.attempt(fn, arg);
              return;
            }
            if (timeer) {
              clearTimeout(timeer);
            }
            timeer = setTimeout(() => {
              // console.log(arg.key, '===', arg.item.props.path);
              if (arg.key !== arg.item.props.path) { // 唯一标识不跳转
                handleLink(arg.key, child.props?.target);
              }
            }, 150);
          }),
        };
      }
      return undefined;
    }).filter(Boolean);
  }
  const items = childToJson(menuSlot);

  return {
    menuProps: {
      ...menuProps,
      items,
    },
    location,
  };
}

export function useHandleAvatar(props) {
  const avatarSrcProps = props.get('avatarSrc');
  const logoProps = props.get('logo');
  const titleProps = props.get('title');
  const deletePropsList = props.get($deletePropsList).concat(['avatarSize', 'avatarRender', 'avatarTitle', 'avatarSrc']);
  const title = _.isNil(titleProps) ? '' : titleProps;
  const logo = _.isNil(logoProps) ? null : logoProps;
  const avatarTitleProps = props.get('avatarTitle');
  const avatarSizeProps = props.get('avatarSize');
  const AvatarRenderProps = props.get('avatarRender');
  // const avatarRender = React.isValidElement(AvatarRenderProps) ? (_props, dom) => React.cloneElement(AvatarRenderProps, { children: dom }) : undefined;
  return {
    [$deletePropsList]: deletePropsList,
    logo,
    title,
    // eslint-disable-next-line no-new-wrappers
    pageTitleRender: () => '',
    avatarProps: _.filterUnderfinedValue({
      src: avatarSrcProps,
      size: avatarSizeProps,
      title: avatarTitleProps,
      render: () => {
        return React.cloneElement(AvatarRenderProps);
      },
    }),
    menuDataRender: () => {
      return [{ name: 2, label: 1, path: '/a' }];
    },
  };
}

export function useHandleToken(props) {
  const colorBgHeader = props.get('colorBgHeader');
  const colorMenuBackground = props.get('colorMenuBackground');
  return {
    token: {
      header: {
        colorBgHeader,
      },
      sider: {
        colorMenuBackground,
      },
    },
  };
}

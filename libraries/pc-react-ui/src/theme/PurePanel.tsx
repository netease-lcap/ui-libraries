/* eslint-disable react/destructuring-assignment */
import * as React from 'react';
import useMergedState from 'rc-util/lib/hooks/useMergedState';
import { ConfigProvider } from 'antd';

const { ConfigContext } = ConfigProvider;

export type AnyObject = Record<PropertyKey, any>;

export function withPureRenderTheme<T extends AnyObject = AnyObject>(Component: React.FC<T>) {
  return (props: T) => {
    const { theme } = React.useContext(ConfigContext);

    return (
      <ConfigProvider theme={{ ...theme, token: { ...theme ? theme.token : {}, motion: false, zIndexPopupBase: 0 } }}>
        <Component {...props} />
      </ConfigProvider>
    );
  };
}

export interface BaseProps {
  prefixCls?: string;
  style?: React.CSSProperties;
}

/* istanbul ignore next */
const genPurePanel = <ComponentProps extends BaseProps = BaseProps>(
  Component: any,
  defaultPrefixCls?: string,
  getDropdownCls?: null | ((prefixCls: string) => string),
  postProps?: (props: ComponentProps) => ComponentProps,
) => {
  type WrapProps = ComponentProps & AnyObject;

  const PurePanel: React.FC<WrapProps> = (props) => {
    const { prefixCls: customizePrefixCls, style } = props;

    const holderRef = React.useRef<HTMLDivElement>(null);
    const [popupHeight, setPopupHeight] = React.useState(0);
    const [popupWidth, setPopupWidth] = React.useState(0);
    const [open, setOpen] = useMergedState(false, {
      value: props.open,
    });

    const { getPrefixCls } = React.useContext(ConfigContext);
    const prefixCls = getPrefixCls(defaultPrefixCls || 'select', customizePrefixCls);

    // eslint-disable-next-line consistent-return
    React.useEffect(() => {
      // We do not care about ssr
      setOpen(true);

      if (typeof ResizeObserver !== 'undefined') {
        const resizeObserver = new ResizeObserver((entries) => {
          const element: HTMLDivElement = entries[0].target as any;
          setPopupHeight(element.offsetHeight + 8);
          setPopupWidth(element.offsetWidth);
        });

        const interval = setInterval(() => {
          const dropdownCls = getDropdownCls
            ? `.${getDropdownCls(prefixCls)}`
            : `.${prefixCls}-dropdown`;
          const popup = holderRef.current?.querySelector(dropdownCls);

          if (popup) {
            clearInterval(interval);
            resizeObserver.observe(popup);
          }
        }, 10);

        return () => {
          clearInterval(interval);
          resizeObserver.disconnect();
        };
      }
    }, []);

    let mergedProps: WrapProps = {
      ...props,
      style: {
        ...style,
        margin: 0,
      },
      open,
      visible: open,
      getPopupContainer: () => holderRef.current!,
    };

    if (postProps) {
      mergedProps = postProps(mergedProps);
    }
    const mergedStyle: React.CSSProperties = {
      paddingBottom: popupHeight,
      position: 'relative',
      minWidth: popupWidth,
    };

    console.log('new PurlPanel');
    return (
      <div ref={holderRef} style={mergedStyle}>
        <Component {...mergedProps} />
      </div>
    );
  };

  return withPureRenderTheme<AnyObject>(PurePanel);
};

export default genPurePanel;

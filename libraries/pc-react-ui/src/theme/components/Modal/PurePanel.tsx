/* eslint-disable react/jsx-no-useless-fragment */

import * as React from 'react';
import classNames from 'classnames';
import { Panel } from 'rc-dialog';
import type { PanelProps } from 'rc-dialog/lib/Dialog/Content/Panel';
import { ConfigContext } from 'antd/es/config-provider';
import { ConfirmContent } from 'antd/es/modal/ConfirmDialog';
import type { ModalFuncProps } from 'antd/es/modal';
import { Footer, renderCloseIcon } from 'antd/es/modal/shared';
import useStyle from 'antd/es/modal/style';
import useCSSVarCls from 'antd/es/config-provider/hooks/useCSSVarCls';
import { withPureRenderTheme } from '../../PurePanel';

export interface PurePanelProps
  extends Omit<PanelProps, 'prefixCls' | 'footer'>,
    Pick<ModalFuncProps, 'type' | 'footer'> {
  prefixCls?: string;
  style?: React.CSSProperties;
}

const PurePanel: React.FC<PurePanelProps> = (props) => {
  const {
    prefixCls: customizePrefixCls,
    className,
    closeIcon,
    closable,
    type,
    title,
    children,
    footer,
    ...restProps
  } = props;
  const { getPrefixCls } = React.useContext(ConfigContext);

  const rootPrefixCls = getPrefixCls();
  const prefixCls = customizePrefixCls || getPrefixCls('modal');
  const rootCls = useCSSVarCls(rootPrefixCls);
  const [wrapCSSVar, hashId, cssVarCls] = useStyle(prefixCls, rootCls);

  const confirmPrefixCls = `${prefixCls}-confirm`;

  // Choose target props by confirm mark
  let additionalProps: Partial<PanelProps> = {};
  if (type) {
    additionalProps = {
      closable: closable ?? false,
      title: '',
      footer: '',
      children: (
        <ConfirmContent
          {...props}
          prefixCls={prefixCls}
          confirmPrefixCls={confirmPrefixCls}
          rootPrefixCls={rootPrefixCls}
          content={children}
        />
      ),
    };
  } else {
    additionalProps = {
      closable: closable ?? true,
      title,
      footer: footer !== null && <Footer {...props} />,
      children,
    };
  }

  return wrapCSSVar(
    <Panel
      prefixCls={prefixCls}
      className={classNames(
        hashId,
        `${prefixCls}-pure-panel`,
        type && confirmPrefixCls,
        type && `${confirmPrefixCls}-${type}`,
        className,
        cssVarCls,
        rootCls,
      )}
      {...restProps}
      closeIcon={renderCloseIcon(prefixCls, closeIcon)}
      closable={closable}
      {...additionalProps}
    />,
  );
};

export default withPureRenderTheme(PurePanel);

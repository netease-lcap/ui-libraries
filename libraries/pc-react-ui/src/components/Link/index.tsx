import { Typography as AntdTypography } from 'antd';
import React from 'react';
import { registerComponet } from '@/plugins/index';
import * as plugin from './plugins';
import type { pluginType } from '@/plugins/type';

import './index.module.less';

const {
  // Title: AntdTitle,
  // Text: AntdText,
  // Paragraph: AntdParagraph,
  Link: AntdLink,
} = AntdTypography;

// type TitleProps = React.ComponentProps<typeof AntdTitle>;
// type TextProps = React.ComponentProps<typeof AntdText>;
// type ParagraphProps = React.ComponentProps<typeof AntdParagraph>;
type LinkProps = React.ComponentProps<typeof AntdLink>;

const mapProps = {
  mySize: 'size',
};

export const Link = registerComponet<
  LinkProps,
  pluginType<LinkProps>
>(
  AntdLink,
  { plugin, displayName: AntdLink.displayName, mapProps },
);

// export default Link;
// export {
//   Title, Text, Paragraph, Link,
// };
